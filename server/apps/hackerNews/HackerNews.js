
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
    storyList = [];
    return new Promise(function(resolve, reject) {
        getTopStories().then(function(topStories) {
            getStory(topStories[0]).then(function(story) {
                storyList.push(story)
                return getStory(topStories[1])
            }).then(function(story) {
                storyList.push(story)
                return getStory(topStories[2])
            }).then(function(story) {
                storyList.push(story)
                return getStory(topStories[3])
            }).then(function(story) {
                storyList.push(story)
                return getStory(topStories[4])
            }).then(function(story) {
                storyList.push(story)
                return getStory(topStories[5])
            }).then(function(story) {
                storyList.push(story)
                resolve()
            })
        })
    })
}

var HackerNews = function(_io) {
    hackerNewsSocket = _io.to('hackerNews-updates');

    setInterval(function() {
        headlines = [];
        makeStoryList().then(function() {
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
    }, 5000)
}

module.exports = HackerNews;