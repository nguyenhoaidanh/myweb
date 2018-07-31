$(function(){

		$('#addToCart').click(function(event) {
		var toCart={quantity:$('#number').val(),
			itemId:$('#idItem').html(),
			itemName:$('#itemName').html(),
			price:$('#price').html(),
			oldPrice:$('#oldPrice').html(),
			imgSrc: $('#imgSrc').attr('src'),


		}
		
		
		$.ajax({
			url: '/toCart',
			type: 'POST',
			data: toCart,
		})
		.done(function(data) {
			console.log(data);
			if(data=='Thêm vô giỏ hàng thành công.')
			{	$('#alertToCart').html(data);
				$('#alertToCart').css('display', 'block');
				setTimeout(function(){ $('#alertToCart').fadeOut(); }, 3000);
				var ret= $('#cartLable').html();
				$('#cartLable').html(parseInt(ret)+1);
			}
			else if(data=='Not login')
			{	
				$('#alertToCart').css('display', 'block');
				setTimeout(function(){ $('#alertToCart').fadeOut(); }, 5000);
			}

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("ajax complete");
		});
		

	});


	$('.delFromCart').click(function(event) {
		var delFromCart={idInCart:$(this).attr('data-idIncart') //in table inCart then id is unique
		}
		var obj=$(this).parents('.row');
		$.ajax({
			url: '/delFromCart',
			type: 'POST',
			data: delFromCart,
		})
		.done(function(data) {
			console.log(data);
			if(data=='Xóa khỏi giỏ hàng thành công.')
			{	
				$('#delFromCart').css('display', 'block');
				setTimeout(function(){ $('#delFromCart').fadeOut(); }, 3000);
				var ret= $('#cartLable').html();
				var sum=parseInt(ret)-1;		//total item in cart
				$('#cartLable').html(sum);
				$('#sum').html(sum);
				//hidden item delete in cart
				obj.remove();
				
			}

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("ajax del from cart complete");
		});
	});


	 $('#changePass').submit(function(event) {
	 	var data={
	 		oldPass:$('#oldPass').val(),
	 		newPass:$('#newPass').val(),
	 		repNewPass:$('#repNewPass').val()
	 	};
	 	if(data.newPass!=data.repNewPass)
	 	{
	 		$('#messNewPass').html("Two password not match");
	 		return false;
	 	}

	 	event.preventDefault();
	 	$.ajax({
	 		data:data,
	 		method:'post',
	 		url: '/changePass',						
	 		success: function(data) {		 
	 			if(data=='Not login')
	 				$('#messStatus').html('Please login first'); //alert
	 			else
	 			{	
				 		$('#messStatus').html(data); //alert		
	 			}
	 		}
	 	});
	 });

	 $('#forgotPass').submit(function(event) {

	 	var data={
	 		emailF:$('#emailF').val(),
	 		OTP:$('#OTP').val(),
	 		newPassF:$('#newPassF').val(),
	 		repNewPassF:$('#repNewPassF').val()
	 	};
	 	if(data.newPassF!=data.repNewPassF)
	 	{
	 		$('#messNewPassF').html("Two password not match");
	 		return false;
	 	}
	 	event.preventDefault();
	 	$.ajax({
	 		data:data,
	 		method:'post',
	 		url: '/changePass',						
	 		success: function(data){		 
	 			
	 			{	
	 					$('#messStatusF').html(data); //alert
	 			}
	 		}
	 	});

	 });


	 // login submit
	 $('#login-nav').submit(function (e) { 	 

	 $('#messLogin').html('');	
	 	var data={email:$('#email').val(),
	 	pass:$('#pass').val()
	 }; 	
	 	e.preventDefault();
	 	$.ajax({
	 		data:data,
	 		method:'post',
	 		url: '/',						
	 		success: function(data) {		 
	 			if(data=='Email or password is not correct.')
	 				$('#messLogin').html(data); //alert
	 			else
	 			{	//redict home  
	 				window.location.href =data;
	 			}
	 		}
	 	});
	 });

	 //sign up submit
	 $('#signUp-form').submit(function (e) { 

	 	$('#messUsername,#messPass,#messEmail').html('');



	 		var pw=$("#signUp-form .form-group input[name=pass]").val();
	 		var rpw=$("#signUp-form .form-group input[name=reppass]").val();
	 	if(pw!=rpw)
	 	{	 $('#messPass').html('Two password not match, please try again.');
	 		return false;		
	 	}

	 	var data={
	 		username:$("#signUp-form .form-group input[type=text]").val(),
	 		email:$("#signUp-form .form-group input[type=email]").val(),
	 		pass:pw,
	 		reppass:rpw,
	 		gender:$("#signUp-form .form-group input[name=gender]:checked").val(),
	 		bDate:$("#signUp-form .form-group input[type=date]").val(),
	 	}; 
	 	
		 	e.preventDefault();
		 	$.ajax({
		 		data:data,
		 		method:'post',
		 		url: '/profile',						
		 		success: function(data) {
		 			if(data=='This email was used')
		 				$('#messEmail').html(data); //alert
		 			else {
			 				if(data=='This username was used')
			 				$('#messUsername').html(data); //alert
		 			else
		 				window.location.href=data;  			
		 			}
		 		} 
			 });  
	 });


});