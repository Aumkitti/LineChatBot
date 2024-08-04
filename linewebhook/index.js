const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");

const port = 4000;
const app = express();

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(req.body));

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function bodyMassIndex(agent) {
    let weight = agent.parameters.weight;
    let height = agent.parameters.height / 100;
    let bmi = (weight / (height * height)).toFixed(2);
    let result = "ขออภัย หนูไม่เข้าใจ";

    if (bmi < 18.5) {
      result = "คุณผอมไป กินข้าวบ้างนะ";
    } else if (bmi >= 18.5 && bmi <= 22.9) {
      result = "คุณหุ่นดีจุงเบย";
    } else if (bmi >= 23 && bmi <= 24.9) {
      result = "คุณเริ่มจะท้วมแล้วนะ";
    } else if (bmi >= 25.8 && bmi <= 29.9) {
      result = "คุณอ้วนละ ออกกำลังกายหน่อยนะ";
    } else if (bmi > 30) {
      result = "คุณอ้วนเกินไปละ หาหมอเหอะ";
    }
    //agent.add(result);
    const flexMessage = {
      type: "flex",
      altText: "this is a flex",
      Contents: {
        type: "bubble",
        header: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "BMI Calculator",
              align: "center",
              size: "xxl",
              margin: "none",
            },
          ],
        },
        hero: {
          type: "image",
          url: "https://lirp.cdn-website.com/69c0b277/dms3rep/multi/opt/BMI+levels-1920w.jpg",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "fit",
          action: {
            type: "uri",
            uri: "https://line.me/",
          },
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "ดัชนีมวลกายของคุณ ",
              weight: "bold",
              size: "xl",
              color: "#000000",
            },
            {
              type: "box",
              layout: "vertical",
              margin: "lg",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "ส่วนสูงของคุณคือ" + height * 100 + "cm",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 1,
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "นํ้าหนักของคุณคือ" + weight + "kg",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 1,
                    },
                  ],
                },
                {
                  type: "separator",
                  margin: "xl",
                  color: "#000000",
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "BMI:" + bmi,
                      margin: "xs",
                      size: "3xl",
                      align: "center",
                      color: "#000000",
                      style: "normal",
                    },
                  ],
                },
              ],
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: result,
                  align: "center",
                  color: "#aaaaaa",
                },
              ],
            },
          ],
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "link",
              height: "sm",
              action: {
                type: "uri",
                label: "ดูรายละเอียดเพิ่ม",
                uri: "https://www.lovefitt.com/%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B3%E0%B8%99%E0%B8%A7%E0%B8%93%E0%B8%AB%E0%B8%B2%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%94%E0%B8%B1%E0%B8%8A%E0%B8%99%E0%B8%B5%E0%B8%A1%E0%B8%A7%E0%B8%A5%E0%B8%81%E0%B8%B2%E0%B8%A2-bmi/",
              },
              color: "#f4f4f4",
            },
          ],
          flex: 0,
          backgroundColor: "#7ec376",
        },
      },
    };

    let payload = new Payload("LINE", flexMessage, { sendAsMessage: true });
    agent.add(payload, result);
  }

  function calculateRectangleArea(agent) {
    let width = agent.parameters.weight;
    let length = agent.parameters.length;
    let result = width * length;
    agent.add(
      "พื้นที่ของรูปสี่เหลี่ยมขนาด กว้าง" +
        width +
        "ซม. ยาว " +
        length +
        " = " +
        result +
        " ตร.ซม."
    );
  }

  function calculateRectangleArea(agent) {
    let base = agent.parameters.base;
    let height = agent.parameters.height;
    let result = (1 / 2) * base * height;
    agent.add(
      "พื้นที่ของรูปสามเหลี่ยมขนาด ฐาน" +
        base +
        "ซม. สูง " +
        height +
        " = " +
        result +
        " ตร.ซม."
    );
  }

  function calculateRectangleArea(agent) {
    let redius = agent.parameters.redius;
    let result = (22 / 7) * redius * redius;
    agent.add(
      "พื้นที่ของรูปวงกลมขนาด รัศมี" +
        redius +
        "ซม. " +
        " = " +
        result +
        " ตร.ซม."
    );
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("BMI - custom - yes", bodyMassIndex);
  intentMap.set("area - rectangle - custom - yes", calculateRectangleArea);
  intentMap.set("area - triangle - custom - yes", calculateRectangleArea);
  intentMap.set("area - circle - custom - yes", calculateRectangleArea);

  agent.handleRequest(intentMap);
});

app.get("/", (req, res) => {
  res.send("<h1> this is a webhook for linechatbot </h1>");
});

app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
});
