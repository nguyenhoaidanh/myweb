function sendMail(target,code)
{
	var txt='Your code: '+code;
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'nguyenhoaidanh2097@gmail.com',
			pass: process.argv[2]
		}
	});

	var mailOptions = {
		from: 'nguyenhoaidanh2097@gmail.com',
		to: target,
		subject: 'Sending Email using Danh"s web',
		text: txt
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

exports.login=function(req,res){
	var message='';	
	if (req.method == "POST") {	
		var email=req.body.email;
		var pass=sha1(req.body.pass);

		var sql = SqlString.format('CALL getUserInfo(?)', [email]);
		db.query(sql, function (err, results) {
			if (err) throw err;
			else { 
				
				if (results[0].length>0  && pass==results[0][0].pass)
					{	
						
						req.session.username=results[0][0].username;
						req.session.userId=results[0][0].id;
						req.session.imgSrc=results[0][0].imgSrc;
						req.session.role=results[0][0].role;
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
	
	if (req.method == "POST") {	
		var pass=sha1(req.body.pass);
		var username=req.body.username;
		var email=req.body.email;	
		var gender=req.body.gender;

		var bDate=req.body.bDate;
		
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
							sql = SqlString.format('CALL getUserInfo(?)', [email]);
							db.query(sql, function (err, results) {
								if (err) throw err;
								else { 
									if (results[0].length>0)
										{	req.session.username=results[0][0].username;
											req.session.userId=results[0][0].id;
											req.session.imgSrc='';
											req.session.role=results[0][0].role;
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
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
	};
	sql = SqlString.format('select * from users  where id=?', [req.session.userId]);
	db.query(sql, function (err, results) {
		if (err) throw err;
		else { 
			
			data.userInfo=results[0];
			res.render('profile.ejs',{data:data});

		}
	});
}
exports.editProfile=function(req,res){
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
	};
	var message = "";
	if (req.method == "POST") {
		var post = req.body;
		var imgSrc;
		try {
		
			var fileUpload=req.files.avatar;
			imgSrc='/fileUpload/'+req.files.avatar.name;
			req.session.imgSrc=imgSrc;
			fileUpload.mv( './fileUpload/'+fileUpload.name, function(err) {
				if (err)
					console.log(err);
				else  console.log('File uploaded!');
			});
		}
		catch(err) {
			imgSrc=req.session.imgSrc;
		}

		var username = req.session.username;
		var bDate = post.bDate;
		var phone = post.phone;

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
    	
    		data.userInfo=results[0][0];
    		
    		res.render('edit_profile.ejs', {data:data  });
    	});
    }

}
exports.logout=function(req,res){
	req.session.destroy(function (err) {
		res.redirect("/");
	})
}
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
var Code='-1';
exports.changePass=function(req,res){
	var data={
		username:req.session.username,
		userId:req.session.userId,
		numberInCart:req.session.numberInCart,
		imgSrc:req.session.imgSrc,
		role:req.session.role
	};
	
	if(req.method=="POST")
	{	
		

		 if(Object.keys(req.body).length==4) //forgot pass
		{	
			console.log('begin get from forgot pass');
			if(req.body.OTP!=Code)
			res.send('Mã OTP không đúng, thử lại hoặc click vào nút gửi lại mã');
			else
			{
				
				var hp=sha1(req.body.newPassF);
				
				var sql= SqlString.format('UPDATE users SET pass=? WHERE email=? ;', [hp,req.body.emailF]);
				db.query(sql, (err, results) => {
					if (err) console.log(err);
					else
					{
						res.send('Mật khẩu mới đã được cập nhật');
					}
				});
			}

		}
		else if(req.body.data!=''&&Object.keys(req.body).length==1)   //request send otp
		{
			
			var sql = SqlString.format('SELECT emailIsAvailable(?) as emailIsAvailable', [req.body.data]);
			db.query(sql, function (err, results) {
				if (err) throw err;
				else { 
					// get message username is available or email 

					message =results[0].emailIsAvailable;
					console.log('Check email : '+message);

					if (message=='')
					{	
						Code=Math.floor(Math.random()*8000000).toString();
						sendMail(req.body.data,Code);
						res.send('Mã đã được gửi lại');
						
					} 
					else { // email not exist
						res.send(message);
					}
				}
			});

		}
		else if( Object.keys(req.body).length==3) //not login  and want to change pass
		{	console.log('begin change pass');
			
			if(req.session.userId==null)
			res.send('Not login');
			else  // login already and changepass
			{	
				//check old pass
				var sql = SqlString.format('CALL getUserInfoById(?)', [req.session.userId]);
		    	db.query(sql, function (err, results) {
		    		
		    		if(results[0][0].pass==sha1(req.body.oldPass))
		    		{
		    				sql= SqlString.format('UPDATE users SET pass=? WHERE id=? ;', [sha1(req.body.newPass),req.session.userId]);
							db.query(sql, (err, results) => {
								if (err) console.log(err);
								else
								{
									res.send('Mật khẩu mới đã được cập nhật');
								}
							});



		    		}
		    		else res.send('Password hiện tại không đúng.');
		    	});
				
			}
			
		}
		
	}
	else res.render('change_pass.ejs',{data:data});
}

