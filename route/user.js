exports.login=function(req,res){
	var message='';	console.log(req.session);
	if (req.method == "POST") {	
		var email=req.body.email;
		var pass=req.body.pass;
		var sql = SqlString.format('CALL getUserInfo(?,?)', [email, pass]);
		db.query(sql, function (err, results) {
			if (err) throw err;
			else { 
				if (results[0].length>0)
				 {	req.session.username=results[0][0].username;
					req.session.userId=results[0][0].id;


					sql = SqlString.format('select count(*) as numberInCart from inCart where userId=?', [req.session.userId]);
					db.query(sql, function (err, results) {
						if (err) throw err;
						else { 
							req.session.numberInCart=results[0].numberInCart;
							
							res.send('/');
							

						}
					});







					
           		} 
           		else { 
		         	  	message = 'Email or password is not correct.';
 			 			res.send(message);
				}

			}
		});








	}
	else {
		res.render('index.ejs',{data:''});
	}
}

exports.signUp=function(req,res){
	var message='';
		console.log(req.session);
	if (req.method == "POST") {	
		var pass=req.body.pass;
		var username=req.body.username;
		var email=req.body.email;	
		var gender=req.body.gender;

		var bDate=req.body.bDate;
		console.log(bDate);
		var phone='',imgSrc='';
		var sql = SqlString.format('SELECT isAvailable(?,?) as isAvailable', [email, username]);
		db.query(sql, function (err, results) {
			if (err) throw err;
			else { 
				// get message username is available or email 
	
					message =results[0].isAvailable;
					console.log('Check sign up: '+message);

				if (message=='')
				{	
					sql= SqlString.format('insert into users(username,phone,email,pass,dateDK,gender,bDate,imgSrc) values(?,?,?,?,Now(),?,?,?);', [username,phone,email,pass,gender,bDate,imgSrc]);
					db.query(sql, function (err, results) {
						if (err) throw err;
						else{
							sql = SqlString.format('CALL getUserInfo(?,?)', [email, pass]);
							db.query(sql, function (err, results) {
								if (err) throw err;
								else { 
									if (results[0].length>0)
									{	req.session.username=results[0][0].username;
										req.session.userId=results[0][0].id;

										sql = SqlString.format('select count(*) as numberInCart from inCart where userId=?', [req.session.userId]);
										db.query(sql, function (err, results) {
											if (err) throw err;
											else { 
												req.session.numberInCart=results[0].numberInCart;
												res.send('/profile');
												

											}
										});



										
					           		} 
					           		else { 
							         	  	console.log("some error");
									}

								}
							});
							
						}
					});
					
					
				} 
				else { //username or email exist
					res.send(message);
				}

			}
		});
	}
	else {
		res.send("get upp neeeee");
	}
}
exports.profile=function(req,res){
	var data={username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart
		
	};
	sql = SqlString.format('select * from users  where id=?', [req.session.userId]);
	db.query(sql, function (err, results) {
		if (err) throw err;
		else { 
			console.log(results);
			
			

			data.userInfo=results[0];
			res.render('profile.ejs',{data:data});

		}
	});







}
exports.editProfile=function(req,res){
	var data={username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart
		
	};

		
	 var message = "";
    if (req.method == "POST") {
        var post = req.body;
        console.log('yyyyyyyy');
 		
 		console.log(post);
 		 console.log(req.files.avatar); // the uploaded file object
 		
 		 if (!req.files)
 		 	console.log('No files were uploaded.');	
 		 else {	
 		 	var fileUpload=req.files.avatar;
 		 	console.log(__dirname);
 		 	console.log(__filename);
 		 	fileUpload.mv( './fileUpload/'+fileUpload.name, function(err) {
 		 		if (err)
 		 			console.log(err);
 		 		else  console.log('File uploaded!');
 		 	});
 		 }
  
 
    
        var username = req.session.username;
        var bDate = post.bDate;
        var phone = post.phone;
        var imgSrc='/fileUpload/'+req.files.avatar.name;
       
        if (bDate.length == 0) bDate = null;
        var sql = SqlString.format('CALL updateUserInfo(?,?,?,?,?)', [data.userId, username,bDate, phone,imgSrc]);
        db.query(sql, (err, results) => {
            if (err) console.log(JSON.stringify(err, undefined, 2));
            else
            {
            	res.redirect('/profile');
    		}
        });
    } else { //GET method
        var sql = SqlString.format('CALL getUserInfoById(?)', [data.userId]);
        db.query(sql, function (err, results) {
        	console.log(data.userId)
        	data.userInfo=results[0][0];
        	console.log(results[0][0]);
        	console.log(1111111);
        	console.log(data.userInfo.username);
            res.render('edit_profile.ejs', {data:data  });
        });
    }




	
}
exports.logout=function(req,res){
	req.session.destroy(function (err) {
        res.redirect("/");
    })
}
exports.cart=function(req,res){
	var data={username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart
		
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