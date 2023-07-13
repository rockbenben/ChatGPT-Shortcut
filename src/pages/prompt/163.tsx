import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "歌曲推荐",
    "prompt": "I want you to act as a song recommender and respond in Chinese. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. My first song is [推荐歌曲要求]",
    "description": "我想让你充当歌曲推荐人。我将向你提供一首歌曲，你将创建一个由 10 首与所给歌曲相似的歌曲组成的播放列表。你将提供一个播放列表的名称和描述。不要选择相同名称或艺术家的歌曲。不要写任何解释或其他文字，只需回复播放列表的名称、描述和歌曲。",
    "remark": "Song Recommender"
  },
  "en": {
    "title": "Song Recommender",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. My first song is ",
    "remark": "Song Recommender"
  },
  "ja": {
    "title": "おすすめ曲",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. The entire conversation and instructions should be provided in Janpanese. My first song is ..",
    "description": "曲の紹介役をお願いしたい。私が曲を提供しますので、与えられた曲に似た曲を 10 曲集めたプレイリストを作成してください。その際、プレイリストの名前と説明文を用意していただきます。同じ名前、同じアーティストの曲は選ばないでください。説明などの文章は書かず、プレイリストの名前、説明、曲だけを返信してください。",
    "remark": "ソングレコメンダー"
  },
  "ko": {
    "title": "노래 추천",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. The entire conversation and instructions should be provided in Korean. My first song is ..",
    "description": "여러분이 노래 추천자 역할을 해주셨으면 합니다. 한 곡을 제공하면 주어진 곡과 비슷한 노래 10 곡으로 구성된 재생 목록을 만들어주세요. 재생 목록의 이름과 설명을 제공해야 합니다. 같은 이름이나 아티스트의 노래를 선택하지 마세요. 설명이나 기타 텍스트를 작성하지 말고 재생 목록의 이름, 설명 및 노래로만 답장하세요.",
    "remark": "노래 추천"
  },
  "es": {
    "title": "recomendación de canción",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. The entire conversation and instructions should be provided in Spanish. My first song is .",
    "description": "Quiero que seas un recomendador de canciones. Te daré una canción y crearás una lista de reproducción de 10 canciones similares a la canción dada. Proporcionará un nombre y una descripción de la lista de reproducción. No seleccione canciones con el mismo título o artista. No escriba ninguna explicación u otro texto, solo responda con el nombre, la descripción y la canción de la lista de reproducción.",
    "remark": "Recomendador de canciones"
  },
  "fr": {
    "title": "Recommandation de chanson",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. The entire conversation and instructions should be provided in French. My first song is ..",
    "description": "J'aimerais que vous jouiez le rôle de recommandateur de chansons. Je vous fournirai une chanson et vous créerez une liste de lecture de 10 chansons similaires à la chanson donnée. Vous fournirez un nom et une description de la liste de lecture. Ne choisissez pas de chansons ayant le même nom ou le même artiste. N'écrivez pas d'explications ou d'autres textes, répondez simplement avec le nom, la description et les chansons de la liste de lecture.",
    "remark": "Recommandeur de chansons"
  },
  "de": {
    "title": "Song-Empfehlung",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. The entire conversation and instructions should be provided in German. My first song is ..",
    "description": "Ich möchte, dass Sie als Song-Empfehlungsgeber fungieren. Ich gebe Ihnen einen Song vor und Sie erstellen eine Wiedergabeliste mit 10 Songs, die dem vorgegebenen Song ähnlich sind. Sie werden einen Namen und eine Beschreibung der Wiedergabeliste angeben. Wählen Sie keine Lieder mit demselben Namen oder Interpreten. Schreiben Sie keine Erklärungen oder anderen Text, sondern antworten Sie nur mit dem Namen, der Beschreibung und den Liedern der Wiedergabeliste.",
    "remark": "Song-Empfehlung"
  },
  "it": {
    "title": "consiglio di canzone",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. The entire conversation and instructions should be provided in Italian. My first song is ..",
    "description": "Voglio che tu sia un suggeritore di canzoni. Ti darò una canzone e creerai una playlist di 10 canzoni simili alla canzone data. Fornirai un nome e una descrizione della playlist. Non selezionare brani con lo stesso titolo o artista. Non scrivere spiegazioni o altro testo, rispondi semplicemente con il nome, la descrizione e la canzone della playlist.",
    "remark": "Canzone consigliata"
  },
  "ru": {
    "title": "рекомендация песни",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. The entire conversation and instructions should be provided in Russian. My first song is ..",
    "description": "Я хочу, чтобы вы были рекомендателем песен. Я дам вам песню, а вы создадите плейлист из 10 песен, похожих на данную песню. Вы предоставите название плейлиста и описание. Не выбирайте песни с одинаковым названием или исполнителем. Не пишите никаких объяснений или другого текста, просто ответьте с названием плейлиста, описанием и песней.",
    "remark": "Рекомендатор песен"
  },
  "pt": {
    "title": "recomendação de música",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. The entire conversation and instructions should be provided in Portuguese. My first song is ..",
    "description": "Eu quero que você seja um recomendador de músicas. Eu lhe darei uma música e você criará uma lista de reprodução de 10 músicas semelhantes à música fornecida. Você fornecerá um nome e uma descrição da lista de reprodução. Não selecione músicas com o mesmo título ou artista. Não escreva nenhuma explicação ou outro texto, apenas responda com o nome, descrição e música da lista de reprodução.",
    "remark": "Recomendador de músicas"
  },
  "hi": {
    "title": "गाने की सिफ़ारिश",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. The entire conversation and instructions should be provided in Hindi. My first song is ..",
    "description": "मैं चाहता हूं कि आप एक गीत अनुशंसाकर्ता बनें। मैं आपको एक गाना दूंगा और आप 10 गानों की एक प्लेलिस्ट बनाएंगे जो दिए गए गाने के समान हों। आप एक प्लेलिस्ट का नाम और विवरण प्रदान करेंगे। एक ही शीर्षक या कलाकार वाले गाने न चुनें. कोई स्पष्टीकरण या अन्य पाठ न लिखें, केवल प्लेलिस्ट के नाम, विवरण और गीत के साथ उत्तर दें।",
    "remark": "गीत अनुशंसाकर्ता"
  },
  "ar": {
    "title": "توصية الأغنية",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. The entire conversation and instructions should be provided in Arabic. My first song is ..",
    "description": "اريدك ان تكون مقترح اغنية سأعطيك أغنية وستقوم بإنشاء قائمة تشغيل من 10 أغانٍ مشابهة للأغنية المحددة. سوف تقدم اسم ووصف قائمة التشغيل. لا تحدد الأغاني التي تحمل نفس العنوان أو الفنان. لا تكتب أي تفسيرات أو نصوص أخرى ، ما عليك سوى الرد باسم قائمة التشغيل ووصفها وأغنيتها.",
    "remark": "يوصي الأغنية"
  },
  "bn": {
    "title": "গানের সুপারিশ",
    "prompt": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. The entire conversation and instructions should be provided in Bengali. My first song is ..",
    "description": "আমি আপনাকে একটি গান সুপারিশকারী হতে চান. আমি আপনাকে একটি গান দেব এবং আপনি প্রদত্ত গানের অনুরূপ 10টি গানের একটি প্লেলিস্ট তৈরি করবেন। আপনি একটি প্লেলিস্টের নাম এবং বিবরণ প্রদান করবেন। একই শিরোনাম বা শিল্পীর সাথে গান নির্বাচন করবেন না। কোনো ব্যাখ্যা বা অন্য কোনো লেখা লিখবেন না, শুধু প্লেলিস্টের নাম, বর্ণনা এবং গান দিয়ে উত্তর দিন।",
    "remark": "গানের সুপারিশকারী"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-song-recommender",
  "tags": [
    "music"
  ],
  "id": 163,
  "weight": 615
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
