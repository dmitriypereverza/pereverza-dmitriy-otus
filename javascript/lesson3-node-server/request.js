// Реализовать скрипт request для тестирования веб сервера
// Создать локальный веб сервер `server`, отвечающий на запросы каждые 100ms
// Создать скрипт `request`, принимающий на вход
//
// - количество запросов `N`
// - тип запросов - параллельный или последовательный
// Скрипт `request` должен отправлять `N` последовательных или параллельных `HTTP` запросов к локальному серверу `server`


let http = require('http');

const PARALLEL_TYPE = '--parallel';
const SEQUENTIAL_TYPE = '--sequential';
let availableTypes = [PARALLEL_TYPE, SEQUENTIAL_TYPE];
let scriptParams = process.argv.slice(2);

// Нет нужного кол-ва параметров
if (scriptParams.length < 2) {
    process.exit(1);
}
// Неверно задан тип
if (!availableTypes.includes(scriptParams[1])) {
    process.exit(1);
}

let countReqParam = Number(scriptParams[0]);
let typeParam = scriptParams[1];

let sendRequest = (url, port) => new Promise((resolve, reject) => {
        http.get(`${url}:${port || 80}`, (resp) => {
            let data = '';
            resp.on('data', (chunk) => data += chunk);
            resp.on('end', () => resolve(data));
        }).on("error", (err) => reject(err.message));
    });

let execSequent = async countRequest => {
    for (let i = 0; i < countRequest; i++) {
        await sendRequest('http://localhost', 8080)
            .then(response => console.log(response + i));
    }
};
let execParallel = countRequest => {
    for (let i = 0; i < countRequest; i++) {
        sendRequest('http://localhost', 8080)
            .then(response => console.log(response + i));
    }
};

if (typeParam === PARALLEL_TYPE) execParallel(countReqParam)
else if (typeParam === SEQUENTIAL_TYPE) execSequent(countReqParam);

