exports.index=function(req,res){
		var data={username:req.session.username};
		res.render('index',{data:data});
}