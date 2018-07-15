$(function(){	
	 //iit wow.js
	 new WOW().init();
	

	 $('#sendOTP').click(function(event) {	
	 	var data=$('#emailF').val(); 
	 	if(data=='')
	 	{
	 		$('#messEmailF').html('Vui lòng điền email').fadeIn();
	 		setTimeout(function()
	 		{
	 			$('#messEmailF').fadeOut();
	 		},7000);
	 	}
	 	else
	 	{	
	 		$.post('/changePass', {data: data}, function (data) {
	 			if(data=='')
	 				$('#messOTP').html('Một mã code đã được gửi về email bạn. Nếu không nhận được mã vui lòng kiểm tra Email đã đúng chưa. Hoặc bấm gửi mã để gửi lại. Thanks.').fadeIn();
	 			else if(data=='Mã đã được gửi lại');
	 			else $('#messOTP').html(data).fadeIn();
	 				//$('#messEmailF').html(data).fadeIn();
	 		});
	 		setTimeout(function()
	 		{
	 			$('#messOTP').fadeOut();
	 		},7000);	
	 	}	
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
    


















	 //set ava title
	 if($('#username').html()=='')
	 {
	 	$('#username').html('Login'); 
	 	$('.caret').css('display','none');
	 	$('#cart').attr('href', '#modal-login');
	}
	 else {
	 	$("a[href='#modal-login']").parent().addClass('dropdown');
	 	$("a[href='#modal-login']").attr('data-toggle', 'dropdown');
	 	$("a[href='#modal-login']").addClass('dropdown-toggle');
	 	$("a[href='#modal-login']").attr('href','#');
	 	$('#cart').attr('href', '/cart');
	}

	//set ava
	if($('img#ava').attr('src')=='')
		$('img#ava').attr('src','/image/ava.png');

	//control quick search
	var url      = window.location.href;  
	if(url[url.length-1]!="/") //not in home page
	{	
			$('div#quickSearch').find('a').each(function(index, el) {
				var oldhref=$(this).attr('href');
			$(this).attr('href', '/'+oldhref);
		});
	}



	//add remove active nav item
	 $('ul.nav li').click(function(){ 
	 		$('ul.nav li').removeClass('active');
			$(this).addClass('active');			
	});

	 // switch login form and signup and nguoc lai
	  $("#toModalLogin").click(function(event) {
	 	
	 	$('#modal-signup').modal('hide');
	 	$('#modal-login').modal('show');

	 });

	  function readURL(input) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function (e) {
					$('#imgSrc').attr('src', e.target.result);
				}

				reader.readAsDataURL(input.files[0]);
			}
		}

		$("#avatar").change(function(){
			readURL(this);
		});		




	 $("#toModalSignUp").click(function(event) {
	 	
	 	$('#modal-login').modal('hide');
	 	$('#modal-signup').modal('show');
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
				
		

	 //mysql định dạng Sun May 06 2018 00:00:00 GMT+0700 (SE Asia Standard Time)	
								function convert(str) {
									var mnths = { 
									Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
									Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12"
									},
									date = str.split(" ");
									return [date[3] , mnths[date[1]],  date[2]].join("-");
								}	

			
	 //add nav wow animation
	 $('nav').addClass('slideInDown');
	 $('nav').attr('data-wow-duration','0.8s');
	 
	 // add animation nav header
	 //not at home page 
	 if($('#carousel-id').height()-100<0)
	 {
	 		$('#nav-form').addClass('scale');
	 		$('#danhmuc').addClass('scale');  
	 		$('.nav.navbar-nav').addClass('scale');  
	 		$('nav').addClass('scale');    
	 		$('.navbar-brand img').addClass('scale'); 
	 }
	 //at home page
	 $(window).scroll(function(){

	 	$('nav').removeClass('bounceInDown');

	 	var top=$(window).scrollTop();
	 	var position=$('#carousel-id').height()-100;

	 	if(top>position)
	 	{	
	 		$('#nav-form').addClass('scale');  
	 		$('.nav.navbar-nav').addClass('scale');  
	 		$('nav').addClass('scale');    
	 		$('.navbar-brand img').addClass('scale');   
	 		$('#danhmuc').addClass('scale');                                                                           		
	 	}
	 	else{	

	 		$('#nav-form').removeClass('scale');  
	 		$('.nav.navbar-nav').removeClass('scale');
	 		$('nav').removeClass('scale');
	 		$('.navbar-brand img').removeClass('scale');  
	 		$('#danhmuc').removeClass('scale');        
	 	}
	 });
	
});



	
