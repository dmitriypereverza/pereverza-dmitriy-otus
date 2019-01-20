const parserService = require('node-xml-stream');
const FetchStream = require("fetch").FetchStream;

const parse = (url, saveParam, successHandler, errorHandler) => {
    const parser = new parserService();

    let { channelId, model } = saveParam;
    let item = null, tagName, cdataLast;

    parser.on('opentag', name => { tagName = name; if (name === "item") item = { channelId }});

    parser.on('cdata', cdata => cdataLast = cdata);

    parser.on('closetag', name => {
        if (name === "item" && item !== null) {
            ({ guid, channelId } = item);
            model.findOneAndUpdate({ guid, channelId }, item, {upsert:true}, (err, data) => {
                if (err) {
                    errorHandler("save Error:" + err);
                } else {
                    console.log("saved item");
                }
            });
            item = null;
        }
    });

    parser.on('text', text => {
        if (item === null) {
            return;
        }
        item[tagName] = cdataLast ? cdataLast : text;
        cdataLast = cdataLast ? null : cdataLast;
    });

    parser.on('error', err => errorHandler("error:" + err));
    parser.on('finish', () => successHandler("Channel saved"));

    const fetch = new FetchStream(url);
    fetch.pipe(parser);
};

module.exports = {
    parse: parse
};