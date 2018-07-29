exports.cart=function(req,res){
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
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
	var data={
		username:req.session.username,
		userId:req.session.userId,
		itemId:req.params.itemId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
	};
	console.log(data);
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
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
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

exports.retrieve=function(req,res){
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
	};
	if (req.method == "GET") {
		
		var low;var hight;
		if(req.query.type=='byAll')	
			var sql = "Select *from item";	
		else if(req.query.type=='byId')
			var sql = "Select *from item where id= "+req.query.DATA;
		else if(req.query.type=='byName')
			var sql = "Select *from item where name= "+"'"+req.query.DATA+"'";	
		else if(req.query.type=='byPrice')
			{	console.log(typeof req.query.DATA);
				console.log( req.query.DATA);
				switch(req.query.DATA)
				{	
				case '0':
					low=0;hight=50000;
					break;
				case '1':
					low=50000;hight=100000;
					break;
				case '2':
					low=100000;hight=300000;
					break;
				case '3':
					low=300000;hight=500000;
					break;
				case '4':
					low=500000;hight=1000000;
					break;
				case '5':
					low=1000000;hight=300000000;
					break;
				}
			var sql = "Select *from item where price>="+low +" and"+ " price <="+ hight;
		}
	}
	db.query(sql, function (err, result) {
		if (err) throw err;
		else {


			console.log('done query');


			res.send(result);
		}
	});
}
exports.removeItem=function(req,res){
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
	};
	if (req.method == "POST") {
		
		var sql="delete from item where id="+req.body.id;
		console.log(sql);
		console.log(req.body);
		db.query(sql, function (err, result) {
			if (err) throw err;
			else {
				console.log('done query');
				res.send('Remove done');
			}
		});
	}
}
exports.addItem=function(req,res){
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
	};
	var imgSrc;

	if (req.method == "POST") {
			var data=req.body;
			var fileUpload=req.files.imageItem;
			imgSrc='/fileUpload/'+req.files.imageItem.name;
			req.session.imgSrc=imgSrc;
			fileUpload.mv( './fileUpload/'+fileUpload.name, function(err) {
				if (err)
					console.log(err);
				else  console.log('File uploaded!');
			});

		var sql=SqlString.format("insert into item (name,price,oldPrice,quantity,type,imgSrc) values(?,?,?,?,?,?)",[data.name,data.price,data.oldPrice,data.quantity,data.type,imgSrc]);
		console.log(sql);
		
		db.query(sql, function (err, result) {
			if (err) throw err;
			else {
				console.log('done query');
				res.send('addItem done');
			}
		});
		
		
		
	}
}
exports.updateItem=function(req,res){
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
	};
	if (req.method == "POST") {
		
		var data=req.body;
		console.log(data);
		 var sql=SqlString.format("call updateItem(?,?,?,?,?,?,?)",[data.id,data.name,data.price,data.oldPrice,data.quantity,data.type,data.imgSrc]);
		db.query(sql, function (err, result) {
			if (err) throw err;
			else {
				console.log('done query');
				res.send('updateItem done');
			}
		});
	}
}
exports.toCart=function(req,res){
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
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
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
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
exports.chat=function(req,res){
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
	};
	if (req.method == "POST"){
		var mess=req.body.mess;	
		console.log(mess);

		request('http://tanglike.ml/simsimi/api.php?key=sibendz&text='+mess, function (error, response, body) {  
			  if(error)res.send('Có lỗi gì đó rồi');
			  else{
			  	try{
			  		  var msg=JSON.parse(body).messages[0].text;
						res.send(msg);
			  	}
			  	catch(e)
			  	{
			  		res.send('Có lỗi gì đó rồi');
			  	}

			
			  }
		});





		
	}
	

}