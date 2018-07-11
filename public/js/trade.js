$(function(){
	var delay=0;	//animation of items
	$("div .itemProduct").each(function(){
			$(this).addClass("fadeInUp");
           $(this).attr('data-wow-delay',delay.toString()+'s');
		   delay+=0.001;
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


	$('.delFromCart').click(function(event) {
		var delFromCart={idInCart:$(this).attr('data-idIncart') //in table inCart then id is unique
		}
		var obj=$(this);
		$.ajax({
			url: '/delFromCart',
			type: 'POST',
			data: delFromCart,
		})
		.done(function(data) {
			console.log(data);
			if(data=='Xóa khỏi giỏ hàng thành công.')
			{
				var ret= $('#cartLable').html();
				$('#cartLable').html(parseInt(ret)-1);
				//hidden item delete in cart
				obj.css('display','none');
				
			}

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("ajax del from cart complete");
		});
		

	});
	
    
});