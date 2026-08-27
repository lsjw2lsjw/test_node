/*
 * @Author: linziyi linziyi_nanjin@sina.com
 * @Date: 2026-08-27 11:01:32
 * @LastEditors: linziyi linziyi_nanjin@sina.com
 * @LastEditTime: 2026-08-27 11:48:12
 * @FilePath: \node.js\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const btn = document.getElementById("btn");
btn.addEventListener("click", test);

const input =document.getElementById("message");

const output=document.getElementById("output");

async function test(e){
    e.preventDefault();
    const message=input.value.trim();
    try{
        const response=await fetch("http://localhost:3000",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({message})
        });
        const result=await response.json();
        if(!response.ok){
            throw new Error(result.error ?? "情求失败")
        }
        output.textContent=result.answer;

    }catch(err){
        err instanceof Error ? err.message : "发生未知错误";
    }
}