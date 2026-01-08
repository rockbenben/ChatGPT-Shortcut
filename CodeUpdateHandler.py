import json
import os
import shutil
from pathlib import Path

# Try to import opencc for Traditional Chinese conversion
try:
    import opencc
    converter = opencc.OpenCC('s2t')
    print("OpenCC loaded successfully.")
except ImportError:
    converter = None
    print("Warning: opencc-python-reimplemented not found. Traditional Chinese conversion will be skipped (content will remain Simplified).")

# 将 prompt.json 按语言分割成多个文件
# 获取当前目录的路径
current_dir = os.path.join(os.getcwd(), 'src', 'data')

# 指定输入文件的路径
input_path = os.path.join(current_dir, 'prompt.json')
meta_cards_path = os.path.join(current_dir, 'meta_cards.json')

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
        output_file_path = f'{output_dir_path}\\{file_prefix}_{lang}.json'
        with open(output_file_path, 'w', encoding='utf-8') as file:
            json.dump(processed_data_sorted, file, ensure_ascii=False, separators=(',', ':'))

# 处理和保存 favor_ids 和 other_ids 数据
process_and_save_data(favor_data, 'favor', favor_ids)
process_and_save_data(other_data, 'other', other_ids)

os.makedirs(output_dir_path_cards, exist_ok=True)
# 处理并保存每个 ID 和语言的数据
def save_data_by_id_and_language(data):
    for item in data:
        for lang in allLanguages:
            content = get_lang_content(item, lang)
            if content:
                # 提取当前语言的数据
                lang_data = {
                    "id": item["id"],
                    lang: content,
                    "tags": item.get("tags", []),
                    "website": item.get("website", ""),
                    "count": item.get("weight", 0),
                    # 合并 meta title（如果存在）
                    "metaTitle": get_meta_content(item["id"], 'title', lang),
                    # 合并 meta description（如果存在）
                    "metaDescription": get_meta_content(item["id"], 'description', lang),
                }
                # 定义输出文件路径
                output_file_path = os.path.join(output_dir_path_cards, f'{item["id"]}_{lang}.json')
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

# 在 # 更新 Prompt Page 页面的 prompt 内容 的步骤前，将 os.path.join(current_dir, 'users.zh.tsx') 复制到同路径的 'users.{lang}.tsx'
# 遍历每个语言
# Skip the first one? Previous logic was skipping 'zh' which was first.
# Now 'zh-Hans' is first. We should generate users.zh-Hans.tsx too?
# Since existing users.zh.tsx is just a template, we can treat it as such.
# But if users.zh.tsx is NOT used by anything, then it doesn't matter?
# However, for safety, let's generate for ALL languages including zh-Hans.
for lang in languages:
    # 指定原始文件路径
    original_file_path = os.path.join(current_dir, 'users.template.tsx')
    # 指定新文件路径
    new_file_path = os.path.join(current_dir, f'users.{lang}.tsx')
    # 如果新文件已存在，则先删除它
    if os.path.exists(new_file_path):
        os.remove(new_file_path)
    # 复制并修改文件内容
    with open(original_file_path, 'r', encoding='utf-8') as original_file:
        with open(new_file_path, 'w', encoding='utf-8') as new_file:
            # 读取原始文件内容
            original_content = original_file.read()
            # 将内容中的 'prompt_zh.json' 替换为 'prompt_{lang}.json'
            new_content = original_content.replace('prompt_zh.json', f'prompt_{lang}.json')
            # 写入新的内容到新文件中
            new_file.write(new_content)

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
