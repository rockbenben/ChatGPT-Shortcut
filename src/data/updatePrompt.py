import json
import os
from pathlib import Path

# 获取当前目录的路径
current_dir = os.getcwd()

# 指定输入文件的路径
input_path = os.path.join(current_dir, 'prompt.json')

# 指定输出文件的目录
output_dir = current_dir

# 先将 json 数据读取出来
with open(input_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# 这是我们要提取的语言列表
languages = ['zh', 'en', 'ja', 'ko']

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


# Convert JSON to React JSX files (like the PowerShell script)

# Define the path to the output directory
react_jsx_dir = Path('../pages/prompt')

# Ensure the output directory exists
react_jsx_dir.mkdir(parents=True, exist_ok=True)

# Loop through each prompt
for prompt in data:
    # Convert the prompt to a JSON string, then load it back into a dict
    prompt_json = json.dumps(prompt, ensure_ascii=False, indent=2)

    # Prepare the content for the React JSX file
    content = f'''import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {prompt_json};

function PromptDetail() {{
  return <PromptPage prompt={{prompt}} />;
}}

export default PromptDetail;
'''

    # Write the content to a new file
    with open(react_jsx_dir / f"{prompt['id']}.tsx", 'w', encoding='utf-8') as file:
        file.write(content)

