var router = require('express').Router();
var Model = require('../model');
var AdminCheck = require('../helper/admin_check');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

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

router.post('/site/:id/', function(req, res) {
    AdminCheck(res,req,function(){
        Model.Content.create({
            name: req.body.name,
            content: req.body.content
        }).then(function(content) {
            Model.Site.findOne({
                attributes: ['name', 'url', 'id'],
                where: {
                    id: req.params.id
                }
            }).then(function(site) {
                site.addContent(content).then(function(){
                    res.send(content);                
                });
            });
        }).catch(function(err){
            res.status(404).send("failed");
        })
    });
});

router.post('/site/:id/edit', function(req, res) {
    AdminCheck(res,req,function(){
        Model.Site.findOne({
            attributes: ['name', 'url', 'id'],
            where: {
                id: req.params.id
            }
        }).then(function(site) {
            site.name = req.body.name;
            site.url = req.body.url;
            site.save();
            // add users
            site.setUsers(req.body.users);
            site.addUser(user);
            res.send("done");
        }).catch(function(err){
            res.status(404).send("failed");
        });
    });
});

router.delete('/site/:id/:contentid', function(req, res) {
    AdminCheck(res,req,function(){
        Model.Content.destroy({
            where: {
                id:req.params.contentid
            }
        }).then(function(content) {
            res.send("done");
        }).catch(function(err){
            res.status(404).send("failed");
        });
    });
});

router.post('/site/:id/:contentid', function(req, res) {
    AdminCheck(res,req,function(user){
        Model.Content.findOne({
            where: {
                id:req.params.contentid
            }
        }).then(function(content) {
            content.content = req.body.content;
            content.save();
            res.send("success")
        }).catch(function(err){
            res.status(404).send("failed");
        })
    },
    function(user){
        user.getSites({include: [Model.Content], where: {id:req.params.id}}).then(function(sites){
            var site = sites[0];
            var found = false;
            site.contents.forEach(function(content){
                if(content.id == req.params.contentid){
                    content.content = req.body.content;
                    content.save();
                    res.send("Success");
                    found=true;
                    return;
                }
            });
            if(!found){
                res.status(404).send("Cannot find Sites");
            }
            return;
        }).catch(function(){
            res.status(404).send("Cannot find Site");
        })
    });
});

// All the sites
router.get('/site', function(req, res) {
    AdminCheck(res,req,function(){
        Model.Site.findAll({
            attributes: ['name', 'url', 'id'],
            include: [Model.Content, Model.User]
        }).then(function(sites) {
            res.send(sites);
        });
    },function(user){
        user.getSites({include: [Model.Content]}).then(function(sites){
            res.send(sites);
        })
    });
});

router.post('/site', function(req, res) {
    AdminCheck(res,req,function(user){
        Model.Site.create({
            name: req.body.name,
            url: req.body.url,
        }).then(function(done) {
            done.addUsers(req.body.users);
            done.addUser(user);
            res.send("done");
        })
    });
});

router.get('/user/', function(req, res) {
    AdminCheck(res,req,function(){
        Model.User.findAll({
            attributes: ['email', 'username', 'id'],
            include: Model.Site
        }).then(function(users){
            res.send(users);
        })
    });
});
router.get('/me/', function(req, res) {
    Model.User.findOne({
        attributes: ['email', 'username', 'id', 'type'],
        where:{
            email:req.user.email
        },
        include: Model.Site
    }).then(function(user){
        res.send(user);
    })
});

module.exports = router;
