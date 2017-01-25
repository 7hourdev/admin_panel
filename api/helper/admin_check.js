var Model = require('../model');
module.exports = function(res,req,callback,error){
	var default_err = function(){
		res.status(401).send("Unauthorized");
	}
    if(!req.user){
        return default_err();
    }
    Model.User.findOne({
        attributes: ['type', 'email', 'id'],
        where: {email: req.user.email},
    }).then(function(user) {
        if(user.type == 1){
        	callback(user);
        }else{
            (error!=undefined&&error!=null)?error(user):default_err();
        }
    });

}