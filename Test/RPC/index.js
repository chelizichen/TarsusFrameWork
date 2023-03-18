const { readFileSync } = require('fs');

var TarsusStream = function (url) {

  TarsusStream.struct_map = new Map()
  TarsusStream.base_struct = ["int", "string"]
  TarsusStream.object_struct = ["List","Map"]

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
    this._read_struct_(el)
  })
}

TarsusStream.prototype._read_struct_ = function(struct){
  let struct_name_reg = new RegExp(/(.*){/)
  let struct_name  = struct_name_reg.exec(struct)[1].split(":")[0].trim()
  let types_reg = new RegExp(/{(.*)}/)
  let types = types_reg.exec(struct)[1].split(';').filter(v => v.trim().length).map(v => v.trim())

  let regex = /^(\d+)\s+([\w\s]+)\s+:\s/;
  let type_regx = /\:(.*)/
  let struct_type = types.map(item => {
    const matchs = regex.exec(item)
    const [, index, param] = matchs;
    const type = type_regx.exec(item)[1]
    return {
      index:index.trim(),
      param:param.trim(),
      type:type.trim()
      }
  })
  struct_type = struct_type.sort((a, b) => a.index - b.index);


  TarsusStream.struct_map.set(struct_name,struct_type)
}

TarsusStream.prototype.__test__ = function (body) {
  let { req, data } = body;
  let struct = TarsusStream.struct_map.get(req);
  let _data = {}
  struct.forEach(item => {
    // 先比较数据结构
    _data[item.param] = data[item.param]
  })
  return _data
}

let stream_test = new TarsusStream("./test.tsu")

let data = {
  id: 1,
  message : "测试"
}

let body = {
  req: "GetGoodReq",
  data
}

const _data = stream_test.__test__(body)
console.log(_data);
