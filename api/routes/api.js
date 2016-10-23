var router = require('express').Router();

router.get('/sample',function(req,res){
    res.send({hello:"world"});
});

module.exports = router;