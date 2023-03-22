let size = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "-",
    "=",
    "/",
    ".",
    ",",
].map((item) => {
    return "#" + item + "#";
});

function ToRequestArray(args) {
    if (typeof args == "string") {
        return args;
    }

    if (args instanceof Array) {
        return JSON.stringify(args);
    }

    if (typeof args == "object") {
        let init = 0;
        let _args = "";
        // 装配参数
        for (let v in args) {
            let _ret = ToRequestArray(args[v]);
            _args += size[init++] + _ret;
        }
        _args += size[size.length - 1];
        // 尾部添加参数
        return _args;
    }
}

// let _a1 = ToRequestArray(ak)
// console.log(_a1);
// let _a11 = Buffer.from(_a1)

function unpackage(buf) {
    let args = [];
    let init = 0;
    let start = buf.indexOf(size[init]);

    while (true) {
        let end_str = buf.subarray(start, start + 3).toString();
        let isEnd = end_str == size[size.length - 1];
        if (isEnd) {
            break;
        }
        let next = buf.indexOf(size[init + 1], start);
        if (next == -1) {
            let sub_pkg = buf.subarray(start, start + 6).toString();
            let is_un_pkg = sub_pkg == size[init] + size[0];
            // 判断是否为未分割的参数
            if (is_un_pkg) {
                let un_pkg = buf.subarray(start + 3, buf.length - 3);
                let getargs = unpackage(un_pkg);
                args[init] = getargs;
            } else {
                let un_pkg = buf.subarray(start + 3, buf.length - 3).toString();
                args[init] = un_pkg;
            }
            break;
        } else {
            let isObject =
                buf.subarray(start, start + 6).toString() == size[init] + size[0];
            if (isObject) {

                let end = buf.indexOf(size[size.length - 1] + size[init + 1]);
                if( end -1){
                    // 判断是否需要分割
                }
                let un_pkg = buf.subarray(start + 3, end + 3);
                let getargs = unpackage(un_pkg);
                args[init] = getargs;
                start = end + 3;
            } else {
                let getargs = buf.subarray(start + 3, next).toString();
                args[init] = getargs;
                start = next;
            }
        }
        init++;
    }
    return args;
}


let a = {
    GetUserByIdReq: {
        id: "GetUserByIdReq---1",
        asd:"asd",
        basic: {
            TOKEN: "ASDASDASDSADSA",
            set:{
                asd:"12412312",
            },
            bbb:{
                "asdsa12":"asda1",
                "asbb":"11",
            },
            "asdasd":[1,2,3,4,5],
            sasd:[{a:"1",b:"2"},{a:"1",b:"2"},{a:"1",b:"2"}]
        },
        asd:""
    },
    "asd":"123"
    // GetUserByIdRes: {
    //     code: "1",
    //     data: {
    //         id: "1",
    //         name: "name",
    //         age: "1",
    //         fullName: "CES",
    //         address: "测试地址",
    //     },
    //     message: "ok",
    // },
}

// let _c = ToRequestArray(a)

const buf = Buffer.from("1231231")



function getArgs(obj){
    let arr = Object.values(obj).map(el=>{
        if(typeof el == "object" && el != null){
            return getArgs(el)
        }else{
            return el
        }
    })
    return arr
}

const data = getArgs(a.GetUserByIdReq)
console.log(JSON.stringify(data));
// console.log(data);
// console.log(_c);
// let _c_1 = Buffer.from(_c)

// let _d = Buffer.from("#a#GetUserByIdReq---1#b##a#ASDASDASDSADSA#,##,#")
// console.log(unpackage(_c_1));
