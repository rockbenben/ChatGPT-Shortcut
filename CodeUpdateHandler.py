import json
import os
from datetime import datetime, timezone
from pathlib import Path

# Try to import opencc for Traditional Chinese conversion
try:
    import opencc
    converter = opencc.OpenCC('s2t')
    print("OpenCC loaded successfully.")
except ImportError:
    converter = None
    print("Warning: opencc-python-reimplemented not found. Traditional Chinese conversion will be skipped (content will remain Simplified).")

# 给每张卡片注入 (id, lang) 维度的 datePublished / dateModified。
# Card 本身充当 manifest：脚本读旧 card 内容 → 与新内容（去掉 date 字段）比对
#   - 内容相同：保留旧 dates（哪怕跨多次重建也稳定）
#   - 内容改了：dateModified 更新为本次 build 时间，datePublished 保留（首发日不变）
#   - 卡片不存在：两个 date 都用 build 时间
# 不走「git log of cards」路线，因为 cards 是批量生成 + 批量提交，
# 同一 commit 会把 5000 张卡同时打上相同 timestamp，反而稀释 freshness 信号。
BUILD_DATE_ISO = datetime.now(timezone.utc).isoformat(timespec='seconds')


def compute_card_dates(card_abs_path, new_lang_data):
    old_data = None
    if os.path.exists(card_abs_path):
        try:
            with open(card_abs_path, 'r', encoding='utf-8') as f:
                old_data = json.load(f)
        except Exception:
            old_data = None

    if old_data is None:
        return (BUILD_DATE_ISO, BUILD_DATE_ISO)

    old_no_dates = {k: v for k, v in old_data.items() if k not in ('datePublished', 'dateModified')}
    if old_no_dates == new_lang_data:
        return (
            old_data.get('datePublished') or BUILD_DATE_ISO,
            old_data.get('dateModified') or BUILD_DATE_ISO,
        )
    return (
        old_data.get('datePublished') or BUILD_DATE_ISO,
        BUILD_DATE_ISO,
    )


# 将 prompt.json 按语言分割成多个文件
# 获取当前目录的路径
current_dir = os.path.join(os.getcwd(), 'src', 'data')

# 指定输入文件的路径
input_path = os.path.join(current_dir, 'prompt.json')
meta_cards_path = os.path.join(current_dir, 'meta_cards.json')
meta_faqs_path = os.path.join(current_dir, 'meta_faqs.json')

output_dir_path = os.path.join(current_dir, 'default')
output_dir_path_cards = os.path.join(current_dir, 'cards')

# 提供的语言列表 - 默认第一个为主语言
allLanguages = ["zh-Hans", "en", "zh-Hant", "ja", "ko", "es", "pt", "hi", "ind", "vi", "th", "fr", "de", "it", "ru", "ar", "tr", "bn"]

# 读取 JSON 数据
with open(input_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# 载入 meta description 映射（id -> {lang: description}）
meta_map = {}
if os.path.exists(meta_cards_path):
    try:
        with open(meta_cards_path, 'r', encoding='utf-8') as meta_file:
            meta_data = json.load(meta_file)
            # 期望结构：[{"id": number, "description": { lang: text }, "title": { lang: text }}]
            for item in meta_data:
                if isinstance(item, dict) and 'id' in item:
                    meta_map[item['id']] = {
                        'description': item.get('description', {}),
                        'title': item.get('title', {})
                    }
    except Exception as e:
        # 如果 meta 文件格式异常，不中断主流程
        print(f"Warn: failed to load meta_description.json: {e}")

# 载入 per-prompt FAQ 映射（id -> {lang: [{q,a},...]}）
# meta_faqs.json 是 master 编辑源；build 时按 (id, lang) 嵌入到对应 card 文件，
# 让 PromptPage 直接从已加载的 prompt.faq 取，避免全量 ship meta_faqs.json (~1MB gzipped 砍掉 common.js)
faq_map = {}
if os.path.exists(meta_faqs_path):
    try:
        with open(meta_faqs_path, 'r', encoding='utf-8') as faq_file:
            faq_data = json.load(faq_file)
            # 结构：{ "<id>": { "zh-Hans": [{q,a},...], "en": [...], ... } }
            for id_key, locales in faq_data.items():
                if not isinstance(locales, dict):
                    continue
                try:
                    item_id = int(id_key)
                except (ValueError, TypeError):
                    # 跳过 _schema 等非数字 key
                    continue
                faq_map[item_id] = locales
    except Exception as e:
        print(f"Warn: failed to load meta_faqs.json: {e}")

# 初始化最大 ID 值
max_id = -1

# 遍历每个元素提取 ID
for item in data:
    if item['id'] > max_id:
        max_id = item['id']

# ID 数组
favor_ids = [2, 209, 251]
other_ids = [185, 197, 109, 20, 1]

# 过滤出指定 ID 的数据项
favor_data = [item for item in data if item['id'] in favor_ids]
other_data = [item for item in data if item['id'] in other_ids]

# Helper function to get content for a language, handling zh mapping
def get_lang_content(item, target_lang):
    if target_lang == 'zh-Hans':
        return item.get('zh')
    elif target_lang == 'zh-Hant':
        content = item.get('zh')
        if content:
            if converter:
                # Deep copy and convert strings
                converted = {}
                for k, v in content.items():
                    if isinstance(v, str):
                        converted[k] = converter.convert(v)
                    else:
                        converted[k] = v
                return converted
            return content # Fallback if no converter
        return None
    return item.get(target_lang)

# Helper for meta content
def get_meta_content(item_id, field, target_lang):
    # meta_map[id][field] is a dict of {lang: text}
    meta_dict = meta_map.get(item_id, {}).get(field, {})
    if target_lang == 'zh-Hans':
        return meta_dict.get('zh', "")
    elif target_lang == 'zh-Hant':
        content = meta_dict.get('zh', "")
        if content and converter:
            return converter.convert(content)
        return content
    return meta_dict.get(target_lang, "")

# Helper for FAQ content
# 直接按 locale key 取（meta_faqs.json 的 zh-Hant 已经是原生繁体，不需 OpenCC 转换）。
# 缺失返回空列表 → PromptPage 自动 fallback 到通用模板。
def get_faq_content(item_id, target_lang):
    locales = faq_map.get(item_id, {})
    faq = locales.get(target_lang)
    return faq if isinstance(faq, list) else []


# 处理和保存数据的函数
def process_and_save_data(filtered_data, file_prefix, ids_order):
    for lang in allLanguages:
        # 按当前语言过滤并处理数据
        processed_data = []
        for item in filtered_data:
            content = get_lang_content(item, lang)
            if content:
                # 先提取 weight 并重命名为 count
                count = item['weight']
                
                # 处理剩余的数据
                # Construct new item with target language key
                new_item = {
                    lang: content,
                    'id': item['id'],
                    'tags': item.get('tags'),
                    'website': item.get('website'),
                    'count': count
                }
                
                processed_data.append(new_item)
        # 按 ids_order 排列 processed_data
        processed_data_sorted = sorted(processed_data, key=lambda x: ids_order.index(x['id']))
        # 保存为新的 JSON 文件
        output_file_path = os.path.join(output_dir_path, f'{file_prefix}_{lang}.json')
        with open(output_file_path, 'w', encoding='utf-8') as file:
            json.dump(processed_data_sorted, file, ensure_ascii=False, separators=(',', ':'))

# 处理和保存 favor_ids 和 other_ids 数据
os.makedirs(output_dir_path, exist_ok=True)
process_and_save_data(favor_data, 'favor', favor_ids)
process_and_save_data(other_data, 'other', other_ids)

os.makedirs(output_dir_path_cards, exist_ok=True)


def compute_related_map(all_data, top_n=3):
    """计算每条 prompt 的 top-N 相关 prompt IDs。

    算法：overlap_tag_count × 100000 + weight，降序取前 top_n
    tag 重叠度优先，同重叠度按热度
    返回 { prompt_id: [related_id_1, ...] }
    """
    related = {}
    for cur in all_data:
        cur_id = cur.get('id')
        cur_tags = set(cur.get('tags') or [])
        if cur_id is None:
            continue
        if not cur_tags:
            related[cur_id] = []
            continue
        candidates = []
        for other in all_data:
            oid = other.get('id')
            if oid == cur_id or oid is None:
                continue
            other_tags = set(other.get('tags') or [])
            overlap = len(cur_tags & other_tags)
            if overlap == 0:
                continue
            score = overlap * 100_000 + int(other.get('weight') or 0)
            candidates.append((score, oid))
        candidates.sort(key=lambda x: -x[0])
        related[cur_id] = [cid for _, cid in candidates[:top_n]]
    return related


# 处理并保存每个 ID 和语言的数据
def save_data_by_id_and_language(data):
    # 预计算全量 related 映射（tag 重叠度 + weight）
    related_map = compute_related_map(data)
    # 索引：{id: full_item} 用来在写卡片时反查 related 的 title/remark
    by_id = {item.get('id'): item for item in data if item.get('id') is not None}

    for item in data:
        for lang in allLanguages:
            content = get_lang_content(item, lang)
            if content:
                # 把 related 从 [id, id, id] 展开成 [{id, title, remark}, ...]
                # SSR HTML 里就能直接渲染 H2 + 3 个 <a> 卡片，AI 引擎不执行 JS 也能抓到
                related_full = []
                for rid in related_map.get(item["id"], []):
                    related_item = by_id.get(rid)
                    if related_item is None:
                        continue
                    rcontent = get_lang_content(related_item, lang)
                    if not rcontent:
                        continue
                    related_full.append({
                        "id": rid,
                        "title": rcontent.get("title", ""),
                        "remark": rcontent.get("remark", ""),
                    })

                # 提取当前语言的数据
                lang_data = {
                    "id": item["id"],
                    lang: content,
                    "tags": item.get("tags", []),
                    "website": item.get("website", ""),
                    "count": item.get("weight", 0),
                    # build-time 预计算的相关 prompt 完整显示数据（同 tag 按热度 top 3）
                    "related": related_full,
                    # 合并 meta title（如果存在）
                    "metaTitle": get_meta_content(item["id"], 'title', lang),
                    # 合并 meta description（如果存在）
                    "metaDescription": get_meta_content(item["id"], 'description', lang),
                    # 嵌入该 (id, lang) 的 FAQ —— PromptPage 直接读 prompt.faq，
                    # 避免运行时再 import 全量 meta_faqs.json
                    "faq": get_faq_content(item["id"], lang),
                }
                # 定义输出文件路径
                output_file_path = os.path.join(output_dir_path_cards, f'{item["id"]}_{lang}.json')
                # 注入 datePublished / dateModified（内容未变就保留旧值）
                date_pub, date_mod = compute_card_dates(output_file_path, lang_data)
                lang_data["datePublished"] = date_pub
                lang_data["dateModified"] = date_mod
                # 保存为 JSON 文件
                with open(output_file_path, 'w', encoding='utf-8') as file:
                    json.dump(lang_data, file, ensure_ascii=False, separators=(',', ':'))

# 调用函数处理并保存数据
save_data_by_id_and_language(data)

## 处理和保存 favor_ids、other_ids 和独立提示词数据

# 指定输出文件的目录
output_dir = current_dir

# Reuse loaded data
# languages = ['zh', 'en', ...] -> use allLanguages
languages = allLanguages

# 对于每种语言，我们创建一个新的列表来保存该语言的元素
output_data = {lang: [] for lang in languages}

# 我们遍历列表中的每个元素，即每个 json 对象
for element in data:

    # 对于列表中的每个 json 对象，我们遍历其中的所有语言
    for lang in languages:

        # 我们尝试提取该语言的数据
        lang_data = get_lang_content(element, lang)

        # 如果该语言的数据存在
        if lang_data:

            # 我们生成一个新的 json 对象，它包含该语言的数据和共享数据
            new_element = {
                lang: lang_data,
                'website': element['website'],
                'tags': element['tags'],
                'id': element['id'],
                'weight': element['weight']
            }

            # 我们将这个新的 json 对象添加到该语言的列表中
            output_data[lang].append(new_element)

# 对于每种语言，我们将其数据写入到一个新的 json 文件中
for lang in languages:

    # 生成输出文件的路径
    output_path = os.path.join(output_dir, f'prompt_{lang}.json')

    # 如果文件已经存在，那么就先删除它
    if os.path.exists(output_path):
        os.remove(output_path)

    # 写入数据
    with open(output_path, 'w', encoding='utf-8') as file:
        json.dump(output_data[lang], file, ensure_ascii=False, separators=(',', ':'))

# 更新 Prompt Page 页面的 prompt 内容
react_jsx_dir = Path(os.path.join(os.getcwd(), 'src', 'pages', 'prompt'))
react_jsx_dir.mkdir(parents=True, exist_ok=True)

# Loop from 1 to 278 for each prompt ID
for prompt_id in range(1, max_id+1):
    # Loop through each language
    for lang in allLanguages:
        # 如果是中文(zh-Hans)，则直接在 base_react_jsx_dir 下创建文件
        # Use zh-Hans as the default logic
        if lang == "zh-Hans":
            output_path = react_jsx_dir / f"{prompt_id}.tsx"
        # 对于其他语言，创建或使用指定的 i18n 目录
        else:
            prompt_i18n_dir = Path(os.path.join(os.getcwd(), 'i18n', lang, 'docusaurus-plugin-content-pages', 'prompt'))
            prompt_i18n_dir.mkdir(parents=True, exist_ok=True)
            # 设置输出文件的路径
            output_path = prompt_i18n_dir / f"{prompt_id}.tsx"

        content = f'''import PromptPage from "@site/src/components/PromptPage";
import prompt from "@site/src/data/cards/{prompt_id}_{lang}.json";

export default function PromptDetail() {{
  return <PromptPage prompt={{prompt}} currentLanguage="{lang}" />;
}}
'''

        # Write the content to a new file named {prompt_id}.tsx
        with open(output_path, 'w', encoding='utf-8') as file:
            file.write(content)

# 将./src/pages/index.tsx 文档复制到 ./i18n/{lang}/docusaurus-plugin-content-pages/index.tsx，并进行变量替换
def replace_and_write(source_file, destination_file, replacements):
    with open(source_file, 'r', encoding='utf-8') as file:
        file_data = file.read()
        
    for original_text, replacement_text in replacements:
        file_data = file_data.replace(original_text, replacement_text)
    
    with open(destination_file, 'w', encoding='utf-8') as file:
        file.write(file_data)

# This is the file we want to copy
source_file = os.path.join(os.getcwd(), 'src', 'pages', 'index.tsx')

# Loop languages starting from index 1. 0 is default (zh-Hans).
for lang in languages[1:]:
    # Specify the path to the target file
    target_file = os.path.join(os.getcwd(), 'i18n', lang, 'docusaurus-plugin-content-pages', 'index.tsx')
    os.makedirs(os.path.dirname(target_file), exist_ok=True)
    
    # If the target file exists, remove it
    if os.path.exists(target_file):
        os.remove(target_file)
    
    # Prepare the replacements
    # Since src/pages/index.tsx now uses favor_zh-Hans.json, we replace that.
    replacements = [
        ('favor_zh-Hans', f'favor_{lang}'),
        ('other_zh-Hans', f'other_{lang}'),
    ]

    # Replace and write to the target file
    replace_and_write(source_file, target_file, replacements)
