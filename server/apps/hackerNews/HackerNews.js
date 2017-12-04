
var requestPromise = require('request-promise');
var Promise = require('bluebird');

var storyList = [];

var headlines = []


var getStory = function(story) {
    var reqOptions = {
        method: 'GET',
        uri: 'https://hacker-news.firebaseio.com/v0/item/' + story + '.json?print=pretty',
        json: true
    };
    return new Promise(function(resolve, reject) {
        requestPromise(reqOptions)
            .then(function(jsonRes) {
                resolve(jsonRes)
            }).catch(function(err) { 
                console.log(err)
                resolve(err)
            })
    })
}

var getTopStories = function() {
    var reqOptions = {
        method: 'GET',
        uri: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
        json: true
    };
    return new Promise(function(resolve, reject) {
        requestPromise(reqOptions)
            .then(function(jsonRes) {
                resolve(jsonRes)
            }).catch(function(err) { 
                console.log(err)
                resolve(err)
            })
    })    
}

var makeStoryList = function() {
    var storyList = [];
    var storiesToSend = [];
    return new Promise(function(resolve, reject) {
        getTopStories().then(function(topStories) {
            storiesToSend = topStories.slice(0,5);
            storiesToSend.map(function(story, idx){
                getStory(story).then(function(data){
                    storyList.push(data);
                    if(storyList.length == 5){
                        resolve(storyList);
                    }
                });
            })
        })
    })
}

var HackerNews = function(_io) {
    hackerNewsSocket = _io.to('hackerNews-updates');

    headlines = [];
    makeStoryList().then(function(storyList) {
        for (var story in storyList) {
            headlines.push({
                title: storyList[story].title,
                score: storyList[story].score,
                totalComments: storyList[story].descendants,
                url: storyList[story].url,
                time: storyList[story].time
            })
        }
        hackerNewsSocket.emit('hackerNews-headlines', headlines);
    })
}

module.exports = HackerNews;