/**
 * DataView Test 
 */
const BASE_TYPE = {
    STRING:1,
    INT8:2,
    UINT8:3,
    INT16:4,
    UINT16:5,
    INT32:6,
    UINT32:7,
    INT64:8,
    UINT64:9,
    F32:10,
    F64:11
}

const COMPLEX_TYPE = {
    LIST:50,
    MAP:51,
    DATETIME:52,
}

const ALL_TYPE = Object.assign({},BASE_TYPE,COMPLEX_TYPE)

function SerializeObj(obj,lenRef) {
    let arr = Object.values(obj).map((el) => {
      if (typeof el == "object" && el != null) {
        const positionObj = {
            position: lenRef.value,
        }
        if(el instanceof Array){
            positionObj.type = ALL_TYPE.LIST
        }else{
            positionObj.type = ALL_TYPE.MAP
        }
        return SerializeObj(el,lenRef);
      } else {
        const positionObj = {
            position : lenRef.value,
        }
        if(typeof el == "string"){
            positionObj.type = ALL_TYPE.STRING
            const textEncoder = new TextEncoder();
            const encodedData = textEncoder.encode(el);
            const byteLength = encodedData.byteLength;
            el = encodedData;
            lenRef.value += byteLength;
        }else{
            lenRef.value += 32;
            positionObj.type = ALL_TYPE.INT32
        }
        lenRef.positions.push(positionObj)
        return el;
      }
    });
    return arr;
}

const data = {
    id:1,
    name:'chen',
    age:23,
    testIds:[1,2,3,4,5],
    phone:"13476973442",
}

class ST_DataView{
    /**
     * @head lenRef 
     * @body dataView
     */
    static serialize(obj){
        const lenRef = { value : 0, positions:[] }
        const serializeObj2Array = SerializeObj(obj,lenRef);
        const ab = new ArrayBuffer(lenRef.value)
        const dataView = new DataView(ab)
        const positions = lenRef.positions;
        for (const index in positions) {
            const iterator = positions[index];
            const position = iterator.position
            const type = iterator.type
            if(type === ALL_TYPE.STRING){
                serializeObj2Array[index].forEach((value, index) => {
                    const currPosition = position + index
                    dataView.setUint8(currPosition, value);
                });
                console.log(` logger set potision[${position}] value[${serializeObj2Array[index]}]`);
            }
            if(type === ALL_TYPE.INT32){
                console.log(` logger set potision[${position}] value[${serializeObj2Array[index]}]`);
                dataView.setInt32(position, Number(serializeObj2Array[index]))
            }
            if(type === ALL_TYPE.LIST){
                
            }
        }
        return {
            dataView,
            lenRef
        }
    }


    static deserialize(obj){    
        const { dataView, lenRef } = obj;
        for(let index in lenRef.positions){
            const iterator = lenRef.positions[index];
            const position = iterator.position
            const type = iterator.type
            if (type === ALL_TYPE.STRING) {
                index = Number(index)
                const strBytes = [];
                const nextPosition = lenRef.positions[index + 1]
                let strLen = 0;
                if(nextPosition){
                    strLen = nextPosition.position - position
                }else{
                    strLen = dataView.byteLength - position;
                }
                for (let i = 0; i < strLen; i++) {
                    const byteValue = dataView.getUint8(position + i);
                    strBytes.push(byteValue);
                }
                const textDecoder = new TextDecoder();
                const decodedString = textDecoder.decode(new Uint8Array(strBytes));
                console.log(` loggeer get position [${position}] value[${decodedString}]`);
            }
            if(type === ALL_TYPE.INT32){
                const i32_val = dataView.getInt32(position)
                console.log(` loggeer get position [${position}] value[${i32_val}]`);
            }
        }
    }
}

const dataView = ST_DataView.serialize(data)
// ST_DataView.deserialize(dataView)