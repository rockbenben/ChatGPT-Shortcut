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
  <a href="https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj">
  <img src="https://user-images.githubusercontent.com/3750161/214147732-c75e96a4-48a4-4b64-b407-c2402e899a75.PNG" height="40" alt="Chrome" valign="middle"></a>
  <a href="https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin">
  <img src="https://user-images.githubusercontent.com/3750161/233201810-d1026855-0482-44c8-b1ec-c7247134473e.png" height="40" alt="Edge" valign="middle"></a>

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

## Synchronized Updates

If you have deployed your own project on Vercel with a single click, you might encounter an issue where updates are consistently indicated. This arises from Vercel's default behavior of creating a new project for you instead of forking the current project, thereby impeding proper update detection. It is recommended to follow the subsequent steps for re-deployment:

1. Remove the previous repository.
2. Utilize the "fork" button located in the upper right corner of the page to fork the current project.
3. On the [Vercel New Project page](https://vercel.com/new), select the recently forked project from the Import Git Repository section and proceed with deployment.

### Automatic Updates

> In the event of encountering an error during the execution of Upstream Sync, manually perform a single Sync Fork.

Once you have forked the project, due to GitHub restrictions, it is necessary to manually enable Workflows on the Actions page of your forked project and activate the Upstream Sync Action. Upon activation, updates will be automatically executed on a daily basis.

![Automatic Updates](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Enabling Automatic Updates](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Manual Updates

If you wish to manually update immediately, you can refer to [GitHub's documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) to learn how to synchronize the forked project with the upstream code.

Feel free to show support for this project by giving it a star/follow, or by following the author, to stay informed about timely notifications regarding new feature updates.
