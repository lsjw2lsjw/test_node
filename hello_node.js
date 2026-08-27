const btn = document.getElementById("btn");
btn.addEventListener("click", test);
function test() {
    console.log("hello node");
    console.log("node版本：", process.version);
    console.log("当前工作目录：", process.cwd());
    console.log("操作系统：", process.platform);
}
