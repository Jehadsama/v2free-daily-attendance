const http = require('http');

const PORT = 9000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.statusCode = 200;
  res.end('hello world');
});

server.listen(PORT, () => {
  console.log(`server is listening at port: ${PORT}`);
});
