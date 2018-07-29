$(function(){
	var delay=0;	//animation of items
	$("div .itemProduct").each(function(){
			$(this).addClass("fadeInUp");
           $(this).attr('data-wow-delay',delay.toString()+'s');
		   delay+=0.04;
    });

	
	
    
});