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



	
