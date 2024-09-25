import axios from "axios";
import fs from 'node:fs'


const output = './config/wx-code.svg'; // 替换为您希望保存图片的路径


// 获取微信登录二维码并保存为图片
export function downloadWechatLoginCode(url) {
    axios({
        url,
        method: 'GET',
        responseType: 'stream',
    })
        .then((response) => {
            response.data.pipe(fs.createWriteStream(output));
            console.log(`Downloading image from ${url}...`);

            response.data.on('end', () => {
                console.log(`Successfully downloaded image to ${output}`);
            });
        })
        .catch((error) => {
            console.error(`Error downloading image: ${error}`);
        });

}

