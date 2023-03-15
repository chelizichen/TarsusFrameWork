const { nextTick } = require('process')
new Promise((resolve) => {
  console.log(1);
  resolve(11)
}).then(data => {
  console.log(data);
})
new Promise((resolve) => {
  console.log(2);
  resolve(22)
}).then(data => {
  console.log(data);
})


setImmediate(() => {
  console.log(3);
})