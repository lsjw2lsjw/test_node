/*
 * @Author: linziyi linziyi_nanjin@sina.com
 * @Date: 2026-08-27 10:20:35
 * @LastEditors: linziyi linziyi_nanjin@sina.com
 * @LastEditTime: 2026-08-27 17:01:13
 * @FilePath: \node.js\hello_node.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import express from "express";
import fs from "node:fs/promises";

const post = 3000;
const app = express();
app.use(express.json());
app.use(express.static("./public"));

console.log("hello node");
//async函数会返回Promise，函数内部:  return sever相当于resove(server),  throw error相当于reject(error) 
async function server() {

    const [data_1, data_2] = await Promise.all([//readFile中定义了编码方式为utf8,所所以readFile返回的是字符串
        fs.readFile("./input_1.txt","utf8"),
        fs.readFile("./input_2.txt","utf8")//同时开始，全部结束后才会进行下一步
    ])

    const server = app.post("/", function (request, response) {
        const message = request.body.message.trim();
        if (!data_1 || !data_2) {
            throw new Error("data空了");
        }
        response.status(200).json({
            "answer": `你好${message}======>${data_1}`,
            "add": `${data_2}`
        });
    });
    return server;
}

const result = server();
result.then(
    (resolve) => {
        resolve.listen(post, () => {
            console.log(`server正在监听:http://localhost:${post}`);
            // console.log(resolve);
        })
    }
).catch((reject) => {
    reject instanceof Error ? console.log("出错了：" + reject.message) : console.log("未知错误");
})