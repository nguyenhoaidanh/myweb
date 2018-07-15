exports.cart=function(req,res){
	var data={username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc
		
	};
	if(data.userId!=null)
	{
		var sql = SqlString.format('select * from  inCart where userId=?', [req.session.userId]);
		db.query(sql, function (err, results) {
			if (err) throw err;
			else { 
				
				data.arrayItem=results;
				console.log(results);

				console.log(data.arrayItem.length);
				res.render('cart.ejs',{data:data});

			}
		});

	}
	else
		res.send('Please Login to See your cart');
	
}
exports.detail_item=function(req,res){
	var data={username:req.session.username,
		userId:req.session.userId,
		itemId:req.params.itemId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc
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
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc
	};
	if (req.method == "POST") {
		var post = req.body;
		var keyword = post.search;	
		data.keyword=keyword;	
		var sql = "call search('"+keyword+"')";	
		db.query(sql, function (err, result) {
			if (err) throw err;
			else {
				
				data.arrayItem=result[0];	
				res.render("search.ejs",{data:data});
			}
		});
	}
}

exports.toCart=function(req,res){
	var data={username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc
	};
	
	var username=req.session.username;
	var itemId=req.body.itemId;
	var itemName=req.body.itemName;
	var userId=req.session.userId;
	var quantity=req.body.quantity;
	var price=req.body.price;
	var oldPrice=req.body.oldPrice;
	var imgSrc=req.body.imgSrc;
	
	if(username==null){
		res.send('Not login');	
	}
	else
	{	
		var sql=SqlString.format("insert into inCart(userId,itemId,itemName,price,oldPrice,quantity,imgSrc) values(?,?,?,?,?,?,?)",[userId,itemId,itemName,price,oldPrice,quantity,imgSrc]);
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
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc
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