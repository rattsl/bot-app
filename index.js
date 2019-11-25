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
            if (event.message.text == "江端"){
                // replyMessage()で返信し、そのプロミスをevents_processedに追加。
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "はよ出てこい"
                }));
            }　else if (event.message.text == "わかまる"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "はよ出てこい"
                }));
            }　else if (event.message.text == "ゆうすけ"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "新幹線代ちょうだい"
                }));
            }　else if (event.message.text == "かきうちくん"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "尊敬するわ〜"
                }));
            } else if (event.message.text == "目の前に爆弾がある！"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "5秒後に爆発します。"
                }));
            } else if (event.message.text == "ただいま"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "おかえり"
                }));
            }　else if (event.message.text == "メガネの種類は？"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: ""
                }));
            }　else if (event.message.text == ""){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "絶対にいや"
                }));
            }　else if (event.message.text == ""){
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