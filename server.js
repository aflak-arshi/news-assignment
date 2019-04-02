const http = require('http');
const app = require('./server/express-app');

const server = http.createServer(app);

server.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
