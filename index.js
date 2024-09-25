import { WechatyBuilder } from "wechaty";

console.log("初始化机器人...");
// 初始化机器人
const bot = WechatyBuilder.build({
    name: "alioth-wxrobot",
});

// 第一次使用需要手动扫码登录
bot.on("scan", (qrcode, status) =>
    console.log(
        `请点击链接扫码登录微信: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(
            qrcode
        )}`
    )
);
bot.on("login", (user) => console.log(`微信用户: ${user} 登录成功!`));

// 处理消息
bot.on("message", async function (msg) {
    // 获取消息发送人
    const contact = msg.talker();
    // 获取消息内容
    const text = msg.text();
    // 获取群聊信息
    const room = msg.room();

    // 不处理自己的消息
    if (msg.self()) {
        return;

    }

    // 群聊还是私聊
    if (room) {
        // const topic = await room.topic()
        // console.log(`#群聊消息: ${topic} #群友: ${contact.name()} #说: ${text}`)
        if (topic === "高山流水") {
            msg.say("[自动回复]这是一条自动回复的消息", contact);
            bot.stop().then(() => console.log("退出机器人"));
        } else return;
    } else {
        // 是私聊
        if (contact && text) {
            // 接入讯飞AI进行聊天
            const friendName = contact.name();
            console.log(`#私聊消息: ${friendName} #说: ${text}`)

            let timer = null;
            // 可能重名需要判断ID
            if (friendName === "alioth" && msg.id === 11111) {
                timer = setTimeout(() => {
                    msg.say("欧", contact);
                }, 2 * 1000 * 60);
                clearTimeout(timer);
                timer = null;
            }

            msg.say(text, contact)
        }
    }

});

// 运行
bot.start();

// bot.on('logout', user => console.log(`微信用户: ${user} 登出成功!`))
