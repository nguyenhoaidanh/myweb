$(function(){
	var delay=0;	//animation of items
	$("div .itemProduct").each(function(){
			$(this).addClass("fadeInUp");console.log(delay);
           $(this).attr('data-wow-delay',delay.toString()+'s');
		   delay+=0.04;
    });

	
	
    
});