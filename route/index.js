exports.index=function(req,res){
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc
	};
	var sql= SqlString.format("select*from item where type='Điện tử'");
	db.query(sql, function (err, results) {
		if (err) throw err;
		else{
			data.dientu=results;

			sql="select*from item where type='Quần áo'";
			db.query(sql, function (err, results) {
				if (err) throw err;
				else{
					data.quanao=results;
					
					sql="select*from item where type='Mỹ phẩm'";
					db.query(sql, function (err, results) {
						if (err) throw err;
						else{
							data.mypham=results;
							
							sql="select*from item where type='Sách vở'";
							db.query(sql, function (err, results) {
								if (err) throw err;
								else{
									data.sachvo=results;
									res.render('index',{data:data});
									console.log(data);
								}
							});

							
						}
					});
					
				}
			});
			
		}
	});






}