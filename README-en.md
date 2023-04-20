<h1 align="center">
⚡️ChatGPT Shortcut
</h1>
<p align="center">
    English | <a href="./README.md">中文</a>
</p>
<p align="center">
    <em>Maximize your Efficiency and Productivity</em>
</p>

## Why use ChatGPT Shortcut?

- 🚀 **Simplified process**: ChatGPT Shortcut provides a quick command table that can quickly filter and search for prompts suitable for different scenarios, helping users simplify the usage process.
- 💻 **Amplify productivity**: By using optimized prompts, users can get more accurate and useful replies, thereby improving productivity.
- 🎓 **Beginner-friendly**: Even beginners only need to copy the prompt, make slight modifications and send it to ChatGPT to obtain the specified output.
- 🆕 **Regular updates**: The prompts of ChatGPT Shortcut come from network selection, submissions and [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts). They are regularly updated to provide users with new prompts and ideas.
- 📦 **Ready-to-use**: <https://aishort.top/en/>

## Instructions

The ChatGPT Shortcut page displays all the prompts by default, and is divided into label area, search area, and prompt display area.

![image](https://user-images.githubusercontent.com/28252913/228847638-3437d24d-72b0-4acc-a5ea-9dc3ac89c421.png)

### 🏷︎ Label Filtering

The label area is divided according to the field and function of the prompts. You can choose different labels according to different scenarios and needs. When used in conjunction with the "Label Filtering Rule Switch" button on the upper right corner of the label area, multiple label filtering can be performed. The default state is OR, which selects all prompts under the selected label. After switching to AND, it will filter out prompts that have multiple selected labels.

### 🔍 Keyword Search

The keyword search scope includes the title, summary, content and Chinese translation of the prompts. After entering a keyword, the prompt display area will immediately show filtered content. If a label has been selected, then keyword searches are limited to within that labeled range only.

![image](https://user-images.githubusercontent.com/28252913/228542795-08086a37-3c75-485f-adc1-ccee84982501.png)

### 🔬 Copy from Display Area

Through tag filtering and keyword searching, clicking on "Copy" button at top right corner of each card allows you to get prompts which can be pasted into ChatGPT for generating replies specific to your desired domain or topic. If there's any ambiguity regarding notes in prompts, you may click on green title of prompt for source webpage reference.

![image](https://user-images.githubusercontent.com/28252913/228576490-3dd3c807-869f-4a49-95c5-72424d3af356.png)

### 🔥 Popular Sorting

The page now displays the usage count of each prompt, with those that have been used more frequently being marked as "favorite". Additionally, prompt labels will be sorted based on their "heat value". The heat value will be periodically updated.

## 🤔 FAQs

### Do I have to input "Promot" every time?

In the API, the prompt can be set as "system prompt", so there's no need to input the prompt each time. ChatGPT will execute actions based on the system prompt.

For the web version of ChatGPT, if the main prompt hasn't been changed, you can simply enclose subsequent response content with quotation marks, which eliminates the need to input the prompt every time. If the response content doesn't meet the prompt requirements, it indicates that ChatGPT has forgotten the prompt and it needs to be input again to awaken it.

### Outputting False Information

Although ChatGPT is very powerful, it is not omnipotent. Sometimes it may output false information. For example, when I need to enter hundreds of pieces of information into ChatGPT Shortcut in a specified format, I let ChatGPT convert the data according to the specified format. However, during the conversion process, I found that some of the information was mistakenly written by ChatGPT. For example, in a text message, one label is "movie critic", but ChatGPT changed it to "film critic". Although this will not cause any impact on the text itself, it can lead to errors when used in code.Therefore, when using ChatGPT , be sure to check its output content.

### Function of prompt

All prompts are from the Internet and will be updated regularly. Although I have tested every prompt, the actual effect may deviate due to different needs.If you find any errors or have creative ideas or good prompts, welcome [feedback and submission](https://github.com/rockbenben/ChatGPT-Shortcut/discussions/11).

In addition, prompts can not only be used for work production, but more importantly help you develop your thinking skills,broaden your mind,and consider problems from multiple perspectives,and solve problems that people tend to overlook while thinking.

## Deploy

### Deploy With Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

### Installation

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build
```
