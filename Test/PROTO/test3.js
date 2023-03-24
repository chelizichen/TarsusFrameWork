function getArgs(obj) {
  let arr = Object.values(obj).map((el) => {
    if (typeof el == "object" && el != null) {
      return getArgs(el);
    } else {
      return el;
    }
  });
  return arr;
}

const obj = {
  code: "0",
  message: "ok",
  data: {
    id: "1",
    name: "name",
    age: "11",
    fullName: "fullName",
    address:"address"
  },
  users: [
    {
    id: "1",
    name: "name",
    age: "11",
    fullName: "fullName",
    address:"address"
    },
    {
    id: "1",
    name: "name",
    age: "11",
    fullName: "fullName",
    address:"address"
  },
  {
    id: "1",
    name: "name",
    age: "11",
    fullName: "fullName",
    address:"address"
  },
  {
    id: "1",
    name: "name",
    age: "11",
    fullName: "fullName",
    address:"address"
  },
  {
    id: "1",
    name: "name",
    age: "11",
    fullName: "fullName",
    address:"address"
  },
  ]
}

let str = "[ '0', 'ok', [ '1', 'name', '11', 'fullName', 'address' ] ]"
const data = JSON.stringify(getArgs(obj))
let parse = JSON.parse(data)
console.log(data);
console.log(parse);