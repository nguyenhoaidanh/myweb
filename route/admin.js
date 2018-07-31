exports.admin=function(req,res){
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
	};
	if(data.role!='admin')
	res.send('Đùa à, bạn không được phép');
	else 
		res.render('admin.ejs',{data:data});
}