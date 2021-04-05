const fs = require('fs');

const f = fs.createReadStream('./dev-data/test.txt');


f.on('data', (data) => {
    
});