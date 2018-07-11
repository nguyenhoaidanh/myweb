exports.detail_item=function(req,res){
	var data={username:req.session.username,
		userId:req.session.userId,
		itemId:req.params.itemId,
		numberInCart:req.session.numberInCart
	};
	var sql="select *from item where id= "+data.itemId+";";
	db.query(sql, function (err, results) {
		if (err) throw err;
		else { 
			
					data.itemInfo=results[0];
					res.render("detail_item.ejs",{data:data});
	}

			
	});							
	
		
}
exports.search=function(req,res){
	var data={username:req.session.username,
		userId:req.session.userId,
		keyword:req.query.search,
		numberInCart:req.session.numberInCart
	};
	
	res.render("search.ejs",{data:data});
		
}
exports.toCart=function(req,res){
	var data={username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart
	};
	
	var username=req.session.username;
	var itemId=req.body.itemId;
	var itemName=req.body.itemName;
	var userId=req.session.userId;
	var quantity=req.body.quantity;
	
	if(username==null||quantity==''||itemName==''){
		res.send('a field is empty');
		
	}
		else
		{	
			var sql=SqlString.format("insert into inCart(userId,itemId,itemName,quantity) values(?,?,?,?)",[userId,itemId,itemName,quantity]);
			db.query(sql, function (err, results) {
				if (err) throw err;
				else { 
					
						
							
							req.session.numberInCart++;
							res.send('Thêm vô giỏ hàng thành công.')
				}

					
			});	
			
		}
		
}
exports.delFromCart=function(req,res){
	var data={username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart
	};
	
	
	var idInCart=req.body.idInCart;
	
	
	if(data.username==null||idInCart==''){
		res.send('a field is empty');
		
	}
		else
		{	
			var sql=SqlString.format("delete from inCart where id=?;",[idInCart]);
			db.query(sql, function (err, results) {
				if (err) throw err;
				else { 
					
							
							req.session.numberInCart--;
							res.send('Xóa khỏi giỏ hàng thành công.')
				}

					
			});	
			
		}
		
}