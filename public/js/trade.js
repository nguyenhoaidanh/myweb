$(function(){
	var delay=0;	//animation of items
	$("div .itemProduct").each(function(){
			$(this).addClass("fadeInUp");
           $(this).attr('data-wow-delay',delay.toString()+'s');
		   delay+=0.01;
    });

	$('#addToCart').click(function(event) {
		var toCart={quantity:$('#number').val(),
			itemId:$('#idItem').html(),
			itemName:$('#itemName').html()

		}
		$.ajax({
			url: '/toCart',
			type: 'POST',
			data: toCart,
		})
		.done(function(data) {
			console.log(data);
			if(data=='Thêm vô giỏ hàng thành công.')
			{
				var ret= $('#cartLable').html();
				$('#cartLable').html(parseInt(ret)+1);
			}

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("ajax complete");
		});
		

	});


    
});