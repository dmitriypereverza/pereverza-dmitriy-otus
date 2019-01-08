const saveChannel = (rssChannel, channelId, url, successHandler, errorHandler) => {
    const query = { channelId };
    const itemForSave = { channelId, url };

    rssChannel.findOneAndUpdate(query, itemForSave, {upsert:true}, (err, data) => {
        if (err) {
            errorHandler("save Error:" + err);
        } else {
            successHandler("saved item");
        }
    });
};

const getChannelList = (rssChannel, cb) => {
    rssChannel.find({}).lean()
        .then(channels => {
            cb(channels.map(channel => ({channelId: channel.channelId, url: channel.url })));
        })
        .catch(err => {console.error(err)});
};

const getRssItems = (rssItem, channelId, cb, errorHandler) => {
    rssItem.find({channelId : channelId}).lean()
        .then(items => {
            cb(items.map(item => ({
                channelId: item.channelId,
                category: item.category,
                link: item.link,
                pubDate: item.pubDate,
                title: item.title
            })));
        })
        .catch(err => errorHandler(err));
};


module.exports = {
    saveChannel: saveChannel,
    getChannelList: getChannelList,
    getRssItems: getRssItems
};