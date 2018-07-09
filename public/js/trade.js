$(function(){
	var delay=0;	
	$("div .itemProduct").each(function(){
			$(this).addClass("fadeInUp");
           $(this).attr('data-wow-delay',delay.toString()+'s');
		   delay+=0.2;
    });
});