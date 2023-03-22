const crypto = require('crypto');

function serialize(obj) {
  const sortedObj = sortObject(obj);
  console.log(sortedObj);
  const str = JSON.stringify(sortedObj);
  const hash = crypto.createHash('sha256').update(str).digest('hex');
  return hash;
}

function deserialize(hash) {
    console.log(hash);
  // TODO: Implement deserialization logic
}

function sortObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObject);
  }

  const keys = Object.keys(obj).sort();
  const result = {};
  for (const key of keys) {
    result[key] = sortObject(obj[key]);
  }
  return result;
}

const a = {
  GetUserByIdReq: {
    id: "GetUserByIdReq---1",
    basic: {
      TOKEN: "ASDASDASDSADSA",
      set:{
        "jwt":"jwtToken"
      },
      bok:{
        "sasd1":"based12"
      },
      "asdasd":"asdas"
    },
    asd:"123"
  },
  "asd":"123",
};

const hash = serialize(a);
console.log(hash); // "b7f8b6c7e4a0d1f9f9c4e4dab4a6eeb1e10c1d5b8d7c3906e4a6f9c9cfa5f5c1"

const deserialized = deserialize(hash);
console.log(deserialized); 

// { GetUserByIdReq: { id: 'GetUserByIdReq---1', basic: { TOKEN: 'ASDASDASDSADSA', set: { jwt: 'jwtToken' }, bok: { sasd1: 'based12' }, asdasd: 'asdas' }, asd: '123' }, asd: '123' }