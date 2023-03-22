function serialize(obj) {
    const hash = {};
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // 如果值是对象，则递归调用 serialize 函数，并将结果存入哈希表中
        const subHash = serialize(obj[key]);
        for (const subKey in subHash) {
          hash[`${key}__${subKey}`] = subHash[subKey];
        }
      } else {
        // 如果值不是对象，则直接存入哈希表中
        hash[key] = obj[key];
      }
    }
    return hash;
  }

  function deserialize(hash) {
    const obj = {};
    for (const key in hash) {
      const segments = key.split("__");
      let currentObj = obj;
      for (let i = 0; i < segments.length - 1; i++) {
        const segment = segments[i];
        if (!currentObj[segment]) {
          currentObj[segment] = {};
        }
        currentObj = currentObj[segment];
      }
      currentObj[segments[segments.length - 1]] = hash[key];
    }
    return obj;
  }


  const a = {
    GetUserByIdReq: {
      id: "GetUserByIdReq---1",
      basic: {
        TOKEN: "ASDASDASDSADSA",
        set: {
          jwt: "jwtToken",
        },
        bok: {
          sasd1: "based12",
        },
        asdasd: [
            {aa:"111","1BBAS":"123","le":[1,2,3,4]},
            {aa:"222","1BBAS":"ASD","le":[1,4]},
            {aa:"333","1BBAS":"ZXC","le":[3,4]},
            {aa:"444","1BBAS":"FGDS","le":[2,3,4]}
        ],
        "asbq123":[1,2,3,4,5]
      },
      asd: "123",
    },
    asd: "123",
    basdbasd21:""
  };
  
  // 将对象序列化为哈希表
  const hash = serialize(a);
  
  // 输出序列化后的哈希表
  console.log(hash);
  
  // 将哈希表反序列化为对象
  const obj = deserialize(hash);
  
  // 输出反序列化后的对象
  console.log(obj);