var net = require('net')

let server = net.createConnection({
  'host': "127.0.0.1",
  "port": "7099",
})


// [#1]HelloInterFace
// [#2]say
// [#3]3000
// [#4]36
// [##]
// #a#1#b#2#c#3#z#
// [#ENDL#]\n

// [#1]HelloInterFace
// [#2]TestRet
// [#3]3000
// [#4]36
// [##]
// #a##a#tom#b#jump#c#12#d#1#z##b##a#测试#z##c#1#z#
// [#ENDL#]\n

// server.write(`0001[#1]HelloInterFace[#2]TestRet[#3]3000[#4]36[##]#a##a#tom#b#jump#c#12#d#1#z##b##a#测试#z##c#結束的東西#z#[#ENDL#]\n
// `, function (err) {
//   if (err) {
//     throw err
//   }
// })
server.write(`0001[#1]HelloInterFace[#2]TestRet[#3]3000[#4]36[##]
["START"]
tom
jump
12
测试
結束的東西
[#ENDL#]\n
`, function (err) {
  if (err) {
    throw err
  }
})
    
// // 测试TestRet方法的字符串    
// `
// [#1]HelloInterFace
// [#2]TestRet
// [#3]3000
// [#4]36
// [##]
// #a##a#tom#b#jump#c#12#d#1#z##b##a#测试#z##c#1#z#
// [#ENDL#]\n
// `



// Java
//  this.Test(stf);
//  bw.write(stf.toString());
//  bw.flush();
//  stf.delete(0,stf.length());