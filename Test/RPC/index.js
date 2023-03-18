const { readFileSync } = require("fs");

var TarsusStream = function (url) {
  TarsusStream.struct_map = new Map();
  TarsusStream.base_struct = ["int", "string"];
  TarsusStream.object_struct = ["List"];

  this._stream = readFileSync(url, "utf-8").trim().replace(/\n|\r/g, ""); // 拿到并去除换行

  let body = new RegExp(/struct(.*)};/g); // 正则1 拿到 结构体数据
  let match = body.exec(this._stream);

  let struct = new RegExp(/struct (.*?){ /s); // 正则2 拿到 结构体名称

  this._struct_name = struct.exec(match)[1]; // 没有做trim

  let struct_match_body = match[1].split(this._struct_name + "{")[1];

  this._data = struct_match_body
    .split("};")
    .filter((v) => v)
    .map((e) => e + "}")
    .map((e) => e.trim());

  this.readStruct();
};

TarsusStream.prototype.readStruct = function () {
  this._data.forEach((el) => {
    this._read_struct_(el);
  });
};

TarsusStream.prototype._read_struct_ = function (struct) {
  let struct_name_reg = new RegExp(/(.*){/);
  let struct_name = struct_name_reg.exec(struct)[1].split(":")[0].trim();
  let types_reg = new RegExp(/{(.*)}/);
  let types = types_reg
    .exec(struct)[1]
    .split(";")
    .filter((v) => v.trim().length)
    .map((v) => v.trim());

  let regex = /^(\d+)\s+([\w\s]+)\s+:\s/;
  let type_regx = /\:(.*)/;
  let struct_type = types.map((item) => {
    const matchs = regex.exec(item);
    const [, index, param] = matchs;
    const type = type_regx.exec(item)[1];
    return {
      index: index.trim(),
      param: param.trim(),
      type: type.trim(),
    };
  });
  struct_type = struct_type.sort((a, b) => a.index - b.index);

  TarsusStream.struct_map.set(struct_name, struct_type);
};

TarsusStream.parse = function (body) {
  let { req, data } = body;
  let struct = TarsusStream.struct_map.get(req);
  let _data = {};
  struct.forEach((item) => {
    const isObject = TarsusStream.check_object_type(
      data[item.param],
      item.type
    );
    // 是否为复杂类型
    if (isObject) {
      _data[item.param] = isObject;
    } else {
      // 为基础类型
      let check_type = TarsusStream.check_type(data[item.param], item.type);
      if (check_type) {
        _data[item.param] = data[item.param];
      } else {
        throw new TypeError(`${data[item.param]} is not typeof ${item.type}`);
      }
    }
  });
  return _data;
};

TarsusStream.check_type = function (value, type) {
  if (value == undefined) {
    return true;
  }

  let is_base_type = TarsusStream.base_struct.indexOf(type) > -1;
  if (is_base_type) {
    switch (type) {
      case "int": {
        if (typeof value == "number") return true;
        return false;
      }
      case "string": {
        if (typeof value == "string") return true;
        return false;
      }
      default: {
        return false;
      }
    }
  }
  return false;
};

TarsusStream.check_object_type = function (data, type) {
  let req = "";
  let match_reg = /<(.*)>/;

  // 是否为复杂类型
  let is_object_type = TarsusStream.base_struct.indexOf(type) == -1;
  if (is_object_type) {
    // 是否为List 之类的
    let is_object_type = TarsusStream.object_struct.some((item) =>
      type.startsWith(item)
    );
    if (is_object_type) {
    } else {
      let body = {
        req: type,
        data,
      };
      let _data = TarsusStream.parse(body);
      return _data;
    }
  }
  return null;
};

let stream_test = new TarsusStream("./test.taro");

let taro = {
  GetGoodReq: {
    req: "GetGoodReq",
    data: {
      id: 1,
      message: "测试",
    },
  },
  GetGoodRes: {
    req: "GetGoodRes",
    data: {
      data: {
        id: 1,
        name: "测试商品",
        price: 1123,
      },
      message: "测试",
      code: 1,
    },
  },
};

const _data1 = TarsusStream.parse(taro.GetGoodReq);
const _data2 = TarsusStream.parse(taro.GetGoodRes);

console.log(_data1);
console.log(_data2);

