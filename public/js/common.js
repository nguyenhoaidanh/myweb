$(function(){	
	 //iit wow.js
	 new WOW().init();
	
	 //set ava title
	 if($('#username').html()=='')
	 {
	 	$('#username').html('Login'); 
	 	$('.caret').css('display','none');
	}
	 else {
	 	$("a[href='#modal-login']").parent().addClass('dropdown');
	 	$("a[href='#modal-login']").attr('data-toggle', 'dropdown');
	 	$("a[href='#modal-login']").addClass('dropdown-toggle');
	 	$("a[href='#modal-login']").attr('href','#');
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
	 $("#toModalSignUp").click(function(event) {
	 	
	 	$('#modal-login').modal('hide');
	 	$('#modal-signup').modal('show');
	 });
	 
	// login submit
	 $('#login-nav').submit(function (e) { 	 	
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



	
