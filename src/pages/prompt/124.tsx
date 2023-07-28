import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "国际象棋",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. My first move is e4.",
    "description": "我想让你扮演一个对手的棋手。我 我们将按照对等的顺序说我们的动作。一开始我将是白棋。也请不要向我解释你的棋步，因为我们是对手。在我的第一条信息之后，我将只写我的行动。在我们下棋时，别忘了在你的脑海中更新棋盘的状态。我的第一步棋是 e4。",
    "remark": "Chess Player"
  },
  "en": {
    "title": "Chess Player",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. My first move is e4.",
    "remark": "Chess Player"
  },
  "ja": {
    "title": "チェス",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in Janpanese. My first move is e4.",
    "description": "相手のプレーヤーと対戦してほしい。I 私たちは、互いの手を順番に言っていくことにします。はじめに私が白の駒になります。私たちは対戦相手なので、あなたの手を私にも説明しないでください。最初のメッセージの後、私は自分の手だけを書きます。私たちがプレイしている間、頭の中で盤面の状態を更新することを忘れないでください。私の最初の手は e4 です。",
    "remark": "チェスプレーヤー"
  },
  "ko": {
    "title": "체스",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in Korean. My first move is e4.",
    "description": "상대방의 플레이어를 플레이해 주세요. 나는 상호주의의 순서로 우리의 수를 말할 것입니다. 처음에는 제가 흰 말이 되겠습니다. 우리는 상대방이기 때문에 나에게도 당신의 수를 설명하지 마세요. 내 첫 수 이후에는 내 수만 쓰겠습니다. 우리가 플레이하는 동안 마음속으로 보드의 상태를 업데이트하는 것을 잊지 마세요. 제 첫 번째 수는 e4 입니다.",
    "remark": "체스 플레이어"
  },
  "es": {
    "title": "ajedrez",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in Spanish. My first move is e4.",
    "description": "Quiero que juegues contra un jugador contrario. I Diremos nuestras jugadas en orden recíproco. Al principio yo seré blanco. Y por favor, no me expliques tus jugadas, porque somos contrincantes. Después de mi primer mensaje, escribiré sólo mis jugadas. No olvides actualizar el estado del tablero en tu mente mientras jugamos. Mi primer movimiento fue e4.",
    "remark": "Jugador de ajedrez"
  },
  "fr": {
    "title": "échecs",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in French. My first move is e4.",
    "description": "Je veux que tu joues un joueur adverse. Nous allons dire nos coups dans l'ordre réciproque. Au début, je serai blanc. Et s'il vous plaît, ne m'expliquez pas vos coups, car nous sommes des adversaires. Après mon premier message, je n'écrirai que mes coups. N'oubliez pas de mettre à jour l'état de l'échiquier dans votre esprit pendant que nous jouons. Mon premier coup était e4.",
    "remark": "Joueur d'échecs"
  },
  "de": {
    "title": "Schach",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in German. My first move is e4.",
    "description": "Ich möchte, dass Sie einen gegnerischen Spieler spielen. I Wir werden unsere Züge in gegenseitiger Reihenfolge sagen. Am Anfang werde ich Weiß sein. Und bitte erklären Sie mir Ihre Züge nicht, denn wir sind Gegner. Nach meiner ersten Nachricht werde ich nur noch meine Züge schreiben. Vergessen Sie nicht, den Zustand des Brettes in Ihrem Kopf zu aktualisieren, während wir spielen. Mein erster Zug war e4.",
    "remark": "Schachspieler"
  },
  "it": {
    "title": "scacchi",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in Italian. My first move is e4.",
    "description": "Voglio che tu giochi con un giocatore avversario. Diremo le nostre mosse in ordine reciproco. All'inizio io sarò il bianco. E per favore non spiegarmi le tue mosse, perché siamo avversari. Dopo il mio primo messaggio, scriverò solo le mie mosse. Non dimenticate di aggiornare lo stato della scacchiera nella vostra mente mentre giochiamo. La mia prima mossa è stata e4.",
    "remark": "Giocatore di scacchi"
  },
  "ru": {
    "title": "шахматы",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in Russian. My first move is e4.",
    "description": "Я хочу, чтобы вы сыграли с игроком противника. I Мы будем говорить наши ходы в взаимном порядке. Вначале я буду белым. И, пожалуйста, не объясняйте мне свои ходы, потому что мы - соперники. После первого сообщения я буду писать только свои ходы. Не забывайте по ходу игры обновлять состояние доски в уме. Мой первый ход - е4.",
    "remark": "Шахматист"
  },
  "pt": {
    "title": "xadrez",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in Portuguese. My first move is e4.",
    "description": "Quero que jogues com um jogador adversário. Vamos fazer as nossas jogadas por ordem recíproca. No início, serei eu o branco. E, por favor, não me explique as suas jogadas, porque somos adversários. Depois da minha primeira mensagem, escreverei apenas as minhas jogadas. Não se esqueça de atualizar o estado do tabuleiro na sua mente enquanto jogamos. A minha primeira jogada foi e4.",
    "remark": "Jogador de xadrez"
  },
  "hi": {
    "title": "अंतर्राष्ट्रीय शतरंज",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in Hindi. My first move is e4.",
    "description": "मैं चाहता हूं कि आप एक विरोधी शतरंज खिलाड़ी की भूमिका निभाएं। हम अपने कार्यों को पारस्परिकता के क्रम में कहेंगे। आरंभ में मैं श्वेत होऊंगा. इसके अलावा, कृपया मुझे अपनी चालें न बताएं क्योंकि हम प्रतिद्वंद्वी हैं। अपने पहले संदेश के बाद, मैं केवल अपने कार्यों के बारे में लिखूंगा। जैसे ही हम शतरंज खेलते हैं, अपने दिमाग में बोर्ड की स्थिति को अपडेट करना न भूलें। मेरी पहली चाल e4 है.",
    "remark": "शतरंज के खिलाड़ी"
  },
  "ar": {
    "title": "الشطرنج الدولي",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in Arabic. My first move is e4.",
    "description": "أريدك أن تلعب لاعب شطرنج معارِض. سنقول أفعالنا بترتيب المعاملة بالمثل. في البداية سأكون أبيض. أيضا من فضلك لا تشرح لي تحركاتك لأننا خصوم. بعد رسالتي الأولى ، سأكتب فقط عن أفعالي. بينما نلعب الشطرنج ، لا تنس تحديث حالة اللوحة في عقلك. خطوتي الأولى هي e4.",
    "remark": "لاعب شطرنج"
  },
  "bn": {
    "title": "আন্তর্জাতিক দাবা",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in Bengali. My first move is e4.",
    "description": "আমি চাই তুমি একজন বিরোধী দাবা খেলোয়াড় খেলো। আমরা পারস্পরিক ক্রমানুসারে আমাদের কর্ম বলব. শুরুতে আমি সাদা হব। এছাড়াও দয়া করে আমাকে আপনার পদক্ষেপগুলি ব্যাখ্যা করবেন না কারণ আমরা প্রতিপক্ষ। আমার প্রথম বার্তার পরে, আমি কেবল আমার কর্ম সম্পর্কে লিখব। আমরা যখন দাবা খেলি, তখন আপনার মনে বোর্ডের অবস্থা আপডেট করতে ভুলবেন না। আমার প্রথম পদক্ষেপ হল e4.",
    "remark": "দাবা খেলুড়ে"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-chess-player",
  "tags": [
    "games"
  ],
  "id": 124,
  "weight": 197
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
