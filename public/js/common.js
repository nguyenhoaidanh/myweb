$(function(){	
	 //iit wow.js
	 new WOW().init();
	
	 //set ava title
	 if($('#username').html()=='')$('#username').html('Login');

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
	 
	 //account popover
	$('[data-toggle="popover"]').popover({html:true,
				    content: function() {
	return $('#popover-content').html();
				        }
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
	 			{	//render with user info
	 				document.write(data); 

	 				
	 			  	
	 			  
	 			}
	 		}
	 	});
	 });

	

	 //sign up submit
	 $('#signUp-form').submit(function (e) { 

	 	var data={
	 		username:$("#signUp-form .form-group input[type=text]").val(),
	 		email:$("#signUp-form .form-group input[type=email]").val(),
	 		pass:$("#signUp-form .form-group input[name=pass]").val(),
	 		reppass:$("#signUp-form .form-group input[name=reppass]").val(),
	 		gender:$("#signUp-form .form-group input[name=gender]:checked").val(),
	 		bDate:$("#signUp-form .form-group input[type=date]").val(),
	 	}; 
	 	if(data.pass!=data.reppass){
	 		$('#messPass').html('Two password not match, please try again.');
	 		return;
	 	}

	 	e.preventDefault();

	 	$.ajax({
	 		data:data,
	 		method:'post',
	 		url: '/profile',						
	 		success: function(data) {
	 			if(data=='This email was used')
	 				$('#messEmail').html(data); //alert
	 			if(data=='This username was used')
	 				$('#messUsername').html(data); //alert
	 			else{
	 			 document.write(data); 
	 			
	 			  	
	 			  
	 		}
	 	} 
	 	}); 
	 });
				
			
	 //add nav wow animation
	 $('nav').addClass('slideInDown');
	 $('nav').attr('data-wow-duration','0.8s');
	 
	 // add animation nav header
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
	 	}
	 	else{	

	 		$('#nav-form').removeClass('scale');  
	 		$('.nav.navbar-nav').removeClass('scale');
	 		$('nav').removeClass('scale');
	 		$('.navbar-brand img').removeClass('scale');         
	 	}
	 });
	

   	
    
	
	



});



	
