/* Работа с потоками в NodeJS
Написать приложение, демонстрирующее работу с потоками в `NodeJS`:
- Readable, генерирующий случайные числа,
- Transformable, добавляющий случайное число к первому и
- Writable, выводящий данные в консоль.

Данные должны “течь” readable -> transformable -> writable
Используйте highWaterMark для ограничения внутреннего буффера. */

const { Readable, Transform, Writable } = require('stream');

let getRandomNumber = () => {
    return Math.round(Math.random() * 10);
};

let read = Readable({objectMode: false, highWaterMark: 16 });
read._read = () => {
    for (let _ in new Array(10).fill('')) {
        console.log(read.push('start -> ' + getRandomNumber().toString()));
    }
    read.push(null);
};

let transform = Transform({objectMode: false, highWaterMark: 16 });
transform._transform = (chunk, encoding, done) => {
    done(null, chunk.toString() + ' add Transform -> ' + getRandomNumber().toString());
};

let write = Writable({objectMode: false, highWaterMark: 16 });
write._write = (chunk, enc, next) => {
    console.log(chunk.toString() + ' -> finish');
    next();
};

read.pipe(transform).pipe(write);
