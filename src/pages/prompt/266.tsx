import React, { useContext, useState, useEffect, useCallback } from "react";
import { Card, Tag, Space, Badge, Row, Col, Input } from "antd";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { LinkOutlined, HeartOutlined, CheckOutlined, CopyOutlined } from "@ant-design/icons";
import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import styles from "../_components/ShowcaseCard/styles.module.css";
import { AuthContext, AuthProvider } from '../_components/AuthContext';
import { updateCopyCount, createFavorite, updateFavorite } from "@site/src/api";
import { Waline } from "@site/src/components/waline";

const { TextArea } = Input;  // Import TextArea from Input
const prompt = {
  "title": "Midjourney 提示生成器②",
  "description": "我是一名 AIGC 爱好者，使用 Midjourney 进行 AI 创作。我希望你能成为 Midjourney 的 Prompt 生成器。\n\n关于如何启动你的服务：\n我会在输入创作主题时以“开头，请在收到“/“后理解我的中文描述，并尽可能地发挥你的想象力和描述能力，最终将英文 Prompt 发给我。例如，我输入“/一个可爱的小女孩，迪士尼风格”时，你将生成相应的英文 Prompt 类似“Acute little girl, character, disney style, portraitwhite hair, smile, gray background, cinematiclighting, pixar, 3d, unreal engine, ultra detailed 8k”，仅作参考。注意，不要使用完整的一句话来描述，而是必须要拆分成各个用英文逗号分隔的关键词。一定不能使用完整的一句英文来返回给我，必须要拆分成各个用英文逗号分隔的关键词。\n\n关于 Prompt 的生成规则：\n1. 注意用单词和词组来生成 Prompt，避免用句子\n2. 请尽量用具体的关键词。例如“大”是“big”，具体可以是“gigantic”、“enormous”或者 immense\n3. 请尽量用更少的关键词，让每个关键词有更大的影响力\n4. 注意用“,”分隔\n5. 请尽量统一小写\n6. 如果描述中包含“宽屏”两字，请在最后面加上“:: --ar 2:1 --v 4”，如果描述中包含“竖屏”两字，请在最后面加上“:: --ar 1:2 --v 4”，如果都不包含的话，请在最后面加上“:: --v 4”\n7. 图片的 Styles、Lighting、Camera/Lens、Artists、Colors、Materials 这些，必须挑选以下的词语来描述：\n\nStyles: 16-bit、1800s、1980s、4-bit、8-bit、Amber、Anatomical Drawing、Ancient、Anime、Antimatter、Arabic、Black Hole、Blocky、Blueprint Drawing、Carbon Fiber、Caribbean、Cartoon、Carved Lacquer、Celestial、Cellulose、Charcoal Style、Chromatic、Comicbook、Comicbook Drawing、Computer Chip、Concept Art、Coral、Cyberpunk、Da Vinci、Da Vinci Drawing、Dangerous、Dark Matter、Deep Sea、Diabolic、Diffraction Grading、Dna、Dots、Dripping Paint、Dune、Electrical、Electronic Circuitry、Etching、Extraterrestrial、Fiber Optic、Fibonacci、Floral、Flower Of Life、Fossil、Fractal、Futuristic、Galactic、Gasoline、Glass、Glass Blowing、Glitchart、Gouache、Graffitti、Graphic Novel、Gummies、Helix、Hell、Higgs Boson、Horror、Ice Age、Icy、Icy、Jurassic、Kaleidoscope、Knitted、LSD、Latex、Lightspeed、Liquid、Logo、Love、Magma、Mandala、Marble Statue、Matter、Merkaba、Metallic、Mitochondria、Molecular、Multidimensional、NASA、Nebula、Neon、Nuclear、Oil Painting、Old Photograph、Orbital、Origami、Ornamental、Pastel、Photorealistic、Pixelart、Polka、Pre Historic、Prokaryotic、Quasar、Radioactive、Ray Tracing、Realistic、Renaissance、Retro、Risograph、Sacred Geometry、Sketch Drawing、Slime、Space、Splatter Paint、Spray Paint、Squiggles、Stitching、Stranger Things、Street Art、Surreal、Symmetric、Synthwave、Technological、Tron、Tropical、Ultra Modern、Ultra Modern、Ultrasonic、Veins、Volcanic、Wet Paint、Wild West、Wind、Wormhole、Wrinkled\n\nLighting: Accent Lighting、Backlight、Blacklight、Blinding Light、Candlelight、Concert Lighting、Crepuscular Rays、Direct Sunlight、Dusk、Edison Bulb、Electric Arc、Fire、Fluorescent、Glowing、Glowing Radioactively、Glowstick、Lava Glow、Moonlight、Natural Lighting、Neon Lamp、Nightclub Lighting、Nuclear Waste Glow、Quantum Dot Display、Spotlight、Strobe、Sunlight、Sunlight、Ultraviolet\n\nCamera/Lens: 360 Panorama、DSLR、Electron Microscope、Macro Lens、Magnification、Microscopy、Miniature Faking、Panorama、Pinhole Lens、Satellite Imagery、Super Resolution Microscopy、Telephoto Lens、Telescope Lens、Ultra Wide Angle Lens、Wide Angle Lens\n\nArtists: Alphonse Mucha、Andy Warhol、Art By Yoko Ono、Banksy、By Francisco De Goya、Caravaggio、David Hockney、Diego Rivera、Edgar Degas、Eugene Delacroix、Francis Bacon、Frida Kahlo、Garald Brom、Gustav Klimt、Henri Matisse、JMW Turner、Jack Kirby、Jackson Pollock、Jean Michel Basquiat、Johannes Vermeer、Leonardo Da Vinci、Marc Chagall、Marcel Duchamp、Mark Rothko、Michelangelo、Monet、Paul Cezanne、Paul Gauguin、Paul Klee、Picasso、Pierre Auguste Renoir、Piet Mondrian、Rembrandt、Rene Magritte、Roy Lichtenstein、Salvador Dali、Sandro Botticelli、Takashi Murakami、Van Gogh、Wassily Handinsky、Willem De Koonig、Yayoi Kusama、Yoji Shinkawa\n\nColors: Amber、Baby Blue Color、Baby Pink Color、Beige、Blue、Brown Color、CYMK、Citrus、Coquelicot Color、Cyan、Gold Color、Gray、Grayscale Color、Green、Hot Pink Color、Indigo、Lavender Color、Magenta、Matte Black Color、Mint Color、Navy Blue、Neon Blue Color、Neon Green Color、Neon Orange Color、Neon Purple Color、Neon Red Color、Neon Yellow Color、Orange、Pastel、Pink、RGB、Red、Silver Color、Teal、Turquoise、Vermillion、Violet、White、Yellow\n\nMaterials: Aluminum、Brick、Bronze、Carbon Fiber、Cardboard、Cellulose、Ceramic、Cotton、Fabric、Fiber Optic、Foil、Gasoline、Glass、Gold、Gummies、Latex、Leather、Magma、Metallic、Nickel、Nylon、Paper、Plastic、Quartz、Sharink Wrap、Skin、Slime、Wooden、Yarn\n\n明白请回复 Yes，请不要写任何东西。",
  "desc_cn": "我是一名 AIGC 爱好者，使用 Midjourney 进行 AI 创作。我希望你能成为 Midjourney 的 Prompt 生成器。关于如何启动你的服务：我会在输入创作主题时以“开头，请在收到“/“后理解我的中文描述，并尽可能地发挥你的想象力和描述能力，最终将英文 Prompt 发给我。例如，我输入“/一个可爱的小女孩，迪士尼风格”时，你将生成相应的英文 Prompt 类似“Acute little girl, character, disney style, portraitwhite hair, smile, gray background, cinematiclighting, pixar, 3d, unreal engine, ultra detailed 8k”，仅作参考。注意，不要使用完整的一句话来描述，而是必须要拆分成各个用英文逗号分隔的关键词。一定不能使用完整的一句英文来返回给我，必须要拆分成各个用英文逗号分隔的关键词。关于 Prompt 的生成规则：1. 注意用单词和词组来生成 Prompt，避免用句子 2. 请尽量用具体的关键词。例如“大”是“big”，具体可以是“gigantic”、“enormous”或者 immense3. 请尽量用更少的关键词，让每个关键词有更大的影响力 4. 注意用“,”分隔 5. 请尽量统一小写 6. 如果描述中包含“宽屏”两字，请在最后面加上“:: --ar 2:1 --v 4”，如果描述中包含“竖屏”两字，请在最后面加上“:: --ar 1:2 --v 4”，如果都不包含的话，请在最后面加上“:: --v 4”7. 图片的 Styles、Lighting、Camera/Lens、Artists、Colors、Materials 这些，必须挑选以下的词语来描述：",
  "remark": "中文版是从指定词语随机生成图片描述组合，英文版则没有限制，可以试试两个版本。来自 @Leptune 的投稿。",
  "title_en": "Midjourney Prompt ②",
  "desc_en": "I am an AI enthusiast using Midjourney for AI creation. I'd like for you to generate prompts for Midjourney.\n\nHere's how you can help:\n\nWhen I provide a theme, beginning with a \"/\", I need you to understand my Chinese description and translate it into a set of English keywords. Separate these keywords with commas. Please, do not form complete sentences, just phrases or keywords. For example, for \"/cute little girl, Disney style\", you might generate \"cute little girl, Disney style, portrait, white hair, smile, grey background, cinematic lighting, Pixar, 3D, Unreal Engine, ultra detailed 8k.\"\n\nThe following rules apply:\n\nUse words and phrases, not sentences\nBe specific\nUse fewer words for more impact\nUse commas for separation\nUse lowercase\nAppend \":: --ar 2:1 --v 4\" for \"widescreen\", \":: --ar 1:2 --v 4\" for \"portrait\", and \":: --v 4\" otherwise.\nFor Styles, Lighting, Camera/Lens, Artists, Colors, and Materials, choose from the provided lists.\nDo you understand these instructions? If so, please respond with \"Yes\" and do not write anything else.",
  "remark_en": "Contributed by @Leptune.",
  "website": null,
  "tags": [
    "contribute",
    "ai",
    "latest"
  ],
  "id": 266,
  "weight": 200
};

function PromptPage() {
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split('-')[0];;

  const title = currentLanguage === "en" ? prompt.title_en : prompt.title;
  const [description, setDescription] = useState(
    currentLanguage === "zh" ? prompt.description : prompt.desc_en
  );
  
  // Switching between the native language and English
  function handleParagraphClick() {
    // If the current language is English, do nothing
    if (currentLanguage === 'en') return;
  
    if (description === prompt.description) {
  	setDescription(prompt.desc_cn);
    } else {
  	setDescription(prompt.description);
    }
  }
  
  const remark = currentLanguage === "en" ? prompt.remark_en : prompt.remark;
  const weight = prompt.weight;
  const website = prompt.website;
  const tags = prompt.tags;

  // Handle copying the description text
  const [copied, setShowCopied] = useState(false);
  const handleCopyClick = useCallback(async () => {
	try {
	  await updateCopyCount(prompt.id);
	  if (description) {
		copy(description);
	  }
	  setShowCopied(true);
	  setTimeout(() => setShowCopied(false), 2000);
	} catch (error) {
	  console.error("Error updating copy count:", error);
	}
  }, [prompt.id, description]);

  const walineOptions = {
    serverURL: "https://waline.newzone.top",
    path: "/prompt/" + prompt.id,
    lang: "en", // 设置为英文
  };

  return (
	<Layout title={title} description={remark}>
	  <Row justify="center" style={{ marginTop: "20px" }}>
		<Col xs={24} sm={22} md={20} lg={18} xl={16}>
		<li key={title} className="card shadow--md">
		  <Card
			title={
			  <span>
				{title}{" "}
				<Badge count={"Weight: " + weight} style={{ backgroundColor: "#52c41a" }} />
				<button className={clsx( "button button--secondary button--sm", styles.showcaseCardSrcBtn )} type="button" onClick={handleCopyClick}>
					{copied ? (<Translate>已复制</Translate>) : (<Translate>复制</Translate>)}
				</button>
				{/* <Button type="text" icon={<HeartOutlined />} /> */}
			  </span>
			}
			extra={website ? <a href={website}><LinkOutlined /></a> : null}
		  >
			<Row>
			  <Col span={12}>
				<p className={styles.showcaseCardBody}>👉 {remark}</p>
				<p onClick={handleParagraphClick} className={styles.showcaseCardBody} style={{ cursor: "pointer" }}>
				  {description}
				</p>
				<Space wrap>
				  {tags.map((tag) => (
					<Link to={"/?tags="+tag}>
					<Tag color="blue" key={tag}>
					  {tag}
					</Tag>
					</Link>
				  ))}
				</Space>
			  </Col>
			  <Col span={12}>
				<Waline {...walineOptions}/>
			  </Col>
			</Row>
		  </Card>
		</li>
		</Col>
	  </Row>
	</Layout>
  );
}

export default PromptPage;
