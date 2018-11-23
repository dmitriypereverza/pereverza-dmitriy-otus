// Реализовать скрипт request для тестирования веб сервера
// Создать локальный веб сервер `server`, отвечающий на запросы каждые 100ms
// Создать скрипт `request`, принимающий на вход
//
// - количество запросов `N`
// - тип запросов - параллельный или последовательный
// Скрипт `request` должен отправлять `N` последовательных или параллельных `HTTP` запросов к локальному серверу `server`


let http = require('http');
let s = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    setInterval(function() {
        res.end('Ok');
    }, 100);
    console.log("Send");
});
s.listen(8080);
