var router = require('express').Router();
var Model = require('../model');

// Specific site with content join
router.get('/site/:id', function(req, res) {
    Model.Site.findOne({
        attributes: ['name', 'url'],
        where: {id: req.params.id},
        include: Model.Content
    }).then(function(site) {
        res.send(site);
    });
});

// All the sites
router.get('/site', function(req, res) {
    Model.Site.findAll({
        attributes: ['name', 'url', 'id']
    }).then(function(sites) {
        res.send(sites);
    });
});

router.post('/site', function(req, res) {
    Model.Site.create({
        name: req.body.name,
        url: req.body.url
    }).then(function(done) {
        res.send(done)
    })
})

module.exports = router;
