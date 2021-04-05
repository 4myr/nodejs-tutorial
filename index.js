const http = require('http');
const fs = require('fs');

const apiResponse = require('./modules/apiResponse');

const server = http.createServer((req, res) => {
    let response;
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}/`);
    res.writeHead(200, {'Content-Type': 'application/json'});
    if (pathname == '/') {
        res.end(apiResponse({status: true}));
    }
    else if (pathname == '/product') {
        res.end(apiResponse({id: searchParams.get('id')}));
    }
    else if (pathname == '/read') {
        fs.createReadStream('./dev-data/test.txt').pipe(res);
    }
    else {
        res.writeHead(404, 'not found').end();
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening port 8000...');
})