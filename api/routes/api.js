var router = require('express').Router();
var Model = require('../model');

router.get('/content', function(req, res){
    Model.Content.findAll({
        attributes: ['name', 'content'],
    }).then(function(content) {
        res.send(content);
    });
});

router.post('/content', function(req, res) {
    Model.Content.create({
        name: req.body.name,
        content: req.body.content
    }).then(function(done) {
        console.log(done)
        res.send(done)
    })
})

router.get('/site', function(req, res) {
    Model.Site.findAll({
        attributes: ['name', 'url', 'contents']
    }).then(function(sites) {
        res.send(sites);
    });
});

router.post('/site', function(req, res) {
    Model.Site.create({
        name: req.body.name,
        url: req.body.url
    }).then(function(done) {
        console.log(done)
        res.send(done)
    })
})

module.exports = router;
