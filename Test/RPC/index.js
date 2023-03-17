const { readFileSync } = require('fs');

var TarsusStream = function (url) {
  this._stream = readFileSync(url, "utf-8").trim().replace(/\n|\r/g, "") // 拿到并去除换行

  let body = new RegExp(/struct(.*)};/g,)   // 正则1 拿到 结构体数据
  let match = body.exec(this._stream)

  let struct = new RegExp(/struct (.*?){ /s)   // 正则2 拿到 结构体名称

  this._struct_name = struct.exec(match)[1] // 没有做trim 

  let struct_match_body = match[1].split(this._struct_name + "{")[1]

  this._data = struct_match_body.split("};").filter(v => v).map(e => e + "}").map(e => e.trim())

  this.readStruct()

}

TarsusStream.prototype.readStruct = function () {
  this._data.forEach(el => {
    console.log(el);
  })
}

new TarsusStream("./test.tsu")