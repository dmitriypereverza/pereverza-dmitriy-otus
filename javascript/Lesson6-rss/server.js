const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const RssItem    = require('./models/RssItem');
const RssChannel = require('./models/RssChannel');
const parserRss  = require('./parserRss');
const utilRss    = require('./utilRss');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true });

//- Создание рассылки по `URL`
app.post('/channel', function(req, res) {
    if (!req.query.channelId) {
        res.status(400).send("error: channelId is not specified");
    }

    utilRss.saveChannel(RssChannel.model, req.query.channelId, req.query.url,
        () => {
            parserRss.parse(req.query.url, RssItem.model, req.query.channelId,
                (result) => res.status(200).send(result),
                (error) => res.status(500).send(error));
        },
        (error) => res.status(500).send(error)
    );
});

//- Показ списка всех добавленных `URL` рассылок.
app.get('/channel', function(req, res) {
    utilRss.getChannelList(RssChannel.model, (result) => {res.status(200).send(result)});
});

//- Показ всех сохраненных из `RSS` документов.
app.get('/rssItems/:channelId', function(req, res) {
    utilRss.getRssItems(RssItem.model, req.params.channelId,
        (result) => res.status(200).send(result),
        (error) => res.status(500).send(error)
    );
});


app.listen(3000);