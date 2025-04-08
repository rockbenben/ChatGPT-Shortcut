import json
import os
import shutil
from pathlib import Path

# 将 prompt.json 按语言分割成多个文件
# 获取当前目录的路径
current_dir = os.path.join(os.getcwd(), 'src', 'data')

# 指定输入文件的路径
input_path = os.path.join(current_dir, 'prompt.json')

output_dir_path = os.path.join(current_dir, 'default')

# 提供的语言列表
allLanguages = ["zh", "en", "ja", "ko", 'es', 'fr', 'de', 'it', 'ru', 'pt', 'hi', 'ar', 'bn']

# 读取 JSON 数据
with open(input_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# 初始化最大 ID 值
max_id = -1

# 遍历每个元素提取 ID
for item in data:
    if item['id'] > max_id:
        max_id = item['id']

# ID 数组
favor_ids = [2, 209, 197, 109, 20, 1, 251]
other_ids = [185, 199, 90, 180, 232, 4, 204, 218, 41, 11, 234]

# 过滤出指定 ID 的数据项
favor_data = [item for item in data if item['id'] in favor_ids]
other_data = [item for item in data if item['id'] in other_ids]

# 处理和保存数据的函数
def process_and_save_data(filtered_data, file_prefix, ids_order):
    for lang in allLanguages:
        # 按当前语言过滤并处理数据
        processed_data = []
        for item in filtered_data:
            if lang in item:
                # 先提取 weight 并重命名为 count
                count = item['weight']
                
                # 处理剩余的数据
                new_item = {key: value for key, value in item.items() if key in [lang, 'id', 'tags', 'website']}
                new_item['count'] = count  # 设置 count
                
                processed_data.append(new_item)
        # 按 ids_order 排列 processed_data
        processed_data_sorted = sorted(processed_data, key=lambda x: ids_order.index(x['id']))
        # 保存为新的 JSON 文件
        output_file_path = f'{output_dir_path}\\{file_prefix}_{lang}.json'
        with open(output_file_path, 'w', encoding='utf-8') as file:
            json.dump(processed_data_sorted, file, ensure_ascii=False, indent=4)

# 处理和保存 favor_ids 和 other_ids 数据
process_and_save_data(favor_data, 'favor', favor_ids)
process_and_save_data(other_data, 'other', other_ids)

## 处理和保存 favor_ids、other_ids 和独立提示词数据
# 指定输出文件的目录
output_dir = current_dir

# 先将 json 数据读取出来
with open(input_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# 这是我们要提取的语言列表
languages = ['zh', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'it', 'ru', 'pt', 'hi', 'ar', 'bn']

# 对于每种语言，我们创建一个新的列表来保存该语言的元素
output_data = {lang: [] for lang in languages}

# 我们遍历列表中的每个元素，即每个 json 对象
for element in data:

    # 对于列表中的每个 json 对象，我们遍历其中的所有语言
    for lang in languages:

        # 我们尝试提取该语言的数据
        lang_data = element.get(lang)

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
        json.dump(output_data[lang], file, ensure_ascii=False, indent=2)

# 在 # 更新 Prompt Page 页面的 prompt 内容 的步骤前，将 os.path.join(current_dir, 'users.zh.tsx') 复制到同路径的 'users.{lang}.tsx'
# 遍历每个语言
for lang in languages[1:]:
    # 指定原始文件路径
    original_file_path = os.path.join(current_dir, 'users.zh.tsx')
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

# Loop through each prompt
for prompt in data:
    # Convert the prompt to a JSON string, then load it back into a dict
    prompt_json = json.dumps(prompt, ensure_ascii=False, indent=2)

    # Prepare the content for the React JSX file
    content = f'''import React from "react";
import PromptPage from "../_components/PromptPage";
import {{ AuthProvider }} from "@site/src/pages/_components/AuthContext";

const prompt = {prompt_json};

function PromptDetail() {{
  return <AuthProvider><PromptPage prompt={{prompt}} /></AuthProvider>;
}}

export default PromptDetail;
'''

    # Write the content to a new file
    with open(react_jsx_dir / f"{prompt['id']}.tsx", 'w', encoding='utf-8') as file:
        file.write(content)

# 将./src/pages/index.tsx 文档复制到 ./i18n/{lang}/docusaurus-plugin-content-pages/index.tsx，并进行变量替换
def replace_and_write(source_file, destination_file, original_text, replacement_text):
    with open(source_file, 'r', encoding='utf-8') as file:
        file_data = file.read()
        
    file_data = file_data.replace(original_text, replacement_text)
    
    with open(destination_file, 'w', encoding='utf-8') as file:
        file.write(file_data)

# This is the file we want to copy
source_file = os.path.join(os.getcwd(), 'src', 'pages', 'index.tsx')

for lang in languages[1:]:
    # Specify the path to the target file
    target_file = os.path.join(os.getcwd(), 'i18n', lang, 'docusaurus-plugin-content-pages', 'index.tsx')
    
    # If the target file exists, remove it
    if os.path.exists(target_file):
        os.remove(target_file)
    
    # Replace 'users.zh' with 'users.{lang}' and write to the target file
    replace_and_write(source_file, target_file, 'users.zh', f'users.{lang}')
