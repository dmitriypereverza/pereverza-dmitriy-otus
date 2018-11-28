const fileHelper =  require('./filesHelper');
const assert =  require('assert');
const mock = require('mock-fs');

mock({
    'test': {
        'foo': {
            'bar': {
                'baz': {},
                'bar1.txt': 'test',
                'bar2.txt': 'test',
            },
            'f1.txt': 'test',
            'f2.txt': 'test',
        }},
});

const successResult = {
    "files": [
        "test/foo/f1.txt",
        "test/foo/f2.txt",
        "test/foo/bar/bar1.txt",
        "test/foo/bar/bar2.txt"
    ],
    "dirs": [
        "test/foo",
        "test/foo/bar",
        "test/foo/bar/baz"
    ]
};
let absolute = __dirname + '/' + 'test';

describe('getFiles()', () => {

    test('function should exist', () => {
        assert.equal(typeof fileHelper.getFiles, 'function');
    });

    test('function must return Promise', (done) => {
        let mustBePromise = fileHelper.getFiles(absolute);
        assert(mustBePromise instanceof Promise);
        done();
    });

    test('function must work right', (done) => {
        fileHelper.getFiles(absolute).then(result => {
            assert.deepEqual(result[0], successResult);
            done();
        });
    });

});
