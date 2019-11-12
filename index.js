//モジュールのインストール
const server = require("express")();
const line = require("@line/bot-sdk");

// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// Webサーバー設定
server.listen(process.env.PORT || 3000);

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type == "message" && event.message.type == "text"){
            // ユーザーからのテキストメッセージが「こんにちは」だった場合のみ反応。
            if (event.message.text == "就活"){
                // replyMessage()で返信し、そのプロミスをevents_processedに追加。
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "しても無駄です"
                }));
            }　else if (event.message.text == "わかまる"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "最近永田とどう？"
                }));
            }　else if (event.message.text == "ゆうすけ"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "ウイイレざこ"
                }));
            }　else if (event.message.text == "江端"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "頭おかしいやん"
                }));
            } else if (event.message.text == "かきうちくんやな〜"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "ありがと"
                }));
            } else if (event.message.text == "お酒"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "お前らすぐ吐くやん。俺だけやで、吐かんの。"
                }));
            }　else if (event.message.text == "ビール"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "ゆうすけ飲もや"
                }));
            }　else if (event.message.text == "のもや"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "絶対にいや"
                }));
            }　else if (event.message.text == "飲もや"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "死んでもいや"
                }));
            } else if (event.message.text == "ともき"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "いけめん"
                }));
            }


        }
    });

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});