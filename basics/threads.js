const fs = require('fs');

setTimeout(() => console.log('Timer 1'), 0);
setImmediate(() => console.log('Immediate 1'));

fs.readFile('./dev-data/test.txt', 'utf-8', (err, data) => {
    console.log(data);
    setTimeout(() => console.log('Timer 2'), 1000);
    setImmediate(() => console.log('Immediate 2'));
    process.nextTick(() => console.log('process.nextTick()'));
    console.log('Last of readFile');
})