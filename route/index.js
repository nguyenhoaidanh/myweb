exports.index=function(req,res){
		var data={
			username:req.session.username,
			userId:req.session.userId,
		numberInCart:req.session.numberInCart
	};
		var sql= SqlString.format('Select * from item ;');
					db.query(sql, function (err, results) {
						if (err) throw err;
						else{
							data.arrayItem=results;
							res.render('index',{data:data});
			
						}
					});
		
}