/*
 * @Author: linziyi linziyi_nanjin@sina.com
 * @Date: 2026-08-27 10:20:35
 * @LastEditors: linziyi linziyi_nanjin@sina.com
 * @LastEditTime: 2026-08-27 15:51:46
 * @FilePath: \node.js\hello_node.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import express from "express";
import fs from "fs";

const post = 3000;
const app = express();
app.use(express.json());
app.use(express.static("./public"));

console.log("hello node");

async function server() {
    try {
        const data = await fs.readFileSync("./input.txt", "utf8");
        const tell = data.toString();;

        const server = await app.post("/", function (request, response) {
            const message = request.body.message.trim();
            if (!tell) {
                throw new Error("tell空了");
            }
            response.status(200).json({ "answer": `你好${message}     ${tell}` });
        });
        return new Promise((resolve, reject) => {
            resolve(server);
        });
    } catch (err) {
        return new Promise((resolve, reject) => {
            reject("出错了:" + err);
        });
    }

};

const result = server();
result.then(
    (resolve) => {
        resolve.listen(post, () => {
            console.log(`server正在监听:http://localhost:${post}`);
            // console.log(resolve);
        })
    }
).catch((reject)=>{
    console.log(reject);
})