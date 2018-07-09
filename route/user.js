exports.login=function(req,res){
	var message='';
	if (req.method == "POST") {	
		var email=req.body.email;
		var pass=req.body.pass;
		var sql = SqlString.format('CALL getUserInfo(?,?)', [email, pass]);
		db.query(sql, function (err, results) {
			if (err) throw err;
			else { 
				if (results[0].length>0)
				 {
					res.render('index.ejs',{data:results[0][0]});
					
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
		var pass=req.body.pass;
		var username=req.body.username;
		var email=req.body.email;	
		var gender=req.body.gender;
		var bDate=req.body.bDate;
		console.log(bDate);
		var phone='',imgSrc='';
		var sql = SqlString.format('SELECT isAvailable(?,?)', [email, username]);
		db.query(sql, function (err, results) {
			if (err) throw err;
			else { 
				// get message username is available or email 
					var tem=JSON.stringify(results[0]);
					var tem1=tem.split('"');
					message=tem1[tem1.length-2];

				if (message=='')
				{	
					sql= SqlString.format('insert into users(username,phone,email,pass,dateDK,gender,bDate,imgSrc) values(?,?,?,?,Now(),?,?,?);', [username,phone,email,pass,gender,bDate,imgSrc]);
					db.query(sql, function (err, results) {
					if (err) throw err;
					else{
						
						res.render('index.ejs',{data:req.body});
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