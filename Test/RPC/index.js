// const code = `struct testparams{
//   helloReq  : {
//     1 optional message : string;
//     2 optional id : int;
//   };
//   helloRes  : {
//     1 optional data : string;
//     2 optional code : int;
//     3 optional message : string;
//   };
//   sayReq  : {
//     1 optional message : string;
//     2 optional id : int;
//   };
//   sayRes  : {
//     1 optional data : string;
//     2 optional code : int;
//     3 optional message : string;
//   };
// };`;

const { readFileSync } = require('fs');

let file = readFileSync("./test.tsu","utf-8").trim().replace("\\n","")
const map = new Map();
// let _to_str_ = code.trimStart().trimEnd()
let reg = new RegExp(/struct(.*)/g,)
let match = reg.exec(file)
console.log(match);