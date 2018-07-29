

	 //mysql định dạng Sun May 06 2018 00:00:00 GMT+0700 (SE Asia Standard Time)	
	 function convert(str) {
	 	var mnths = { 
	 		Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
	 		Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12"
	 	},
	 	date = str.split(" ");
	 	return [date[3] , mnths[date[1]],  date[2]].join("-");
	 }	

	 function showChat()
	 {	
	 	if($('#chatContent').height()!=0)
	 	{
	 		$('#chatContent').height(0);
	 		$('#chatContent').width(100);
	 		$('#chatBtn').width(100);
	 		$('.chat').css('bottom', '0');		
	 		$('#yourMess').css('display','none');

	 	}
	 	else 
	 	{	
	 		$('#chatContent').height(300);
	 		$('#chatContent').width(300);
	 		$('#chatBtn').width(274);
	 		$('.chat').css('bottom', '25px');
	 		$('#yourMess').css('display','block');
	 		$("#yourMess").focus();
		 }
	 }

	 var newItem=0;

	 function row()
	 {	var html='';
	 		
	 		html+='<tr id="row'+newItem+'" style="border:solid lightblue 2px;"><td style="width:150px" contenteditable="true"></td>';
	 		html+='<td class="text-right" style="width:90px" contenteditable="true" class="price"></td>';
	 		html+='<td class="text-right" style="width:120px" contenteditable="true" class="oldPrice"></td>';
	 		html+='<td contenteditable="true" style="width:50px"></td>';
	 		html+='<td contenteditable="true" style="width:80px" class="Type"><select class="type"  >'+
			  '<option value="Điện tử">Điện tử</option>'+
			  '<option value="Quần áo">Quần áo</option>'+
			  '<option value="Mỹ Phẩm">Mỹ Phẩm</option>'+
			  '<option value="Sách vở">Sách vở</option>'+
				'</select></td>';
			
	 		html+='<td contenteditable="true" style="width:150px" class="img'+newItem+'"><input class="form-control" type="file" name="imageItem" id="imageItem'+newItem+'" accept=".jpg, .jpeg, .png"></td>';
	 		html+='<td style="width:100px"><input type="button" onClick="addItem('+newItem+')"  id="add'+newItem+'" class="btn btn-info btn-xs edit" value="Add"><span id="mess'+newItem+'" class="label label-success" style="display:none">Đã lưu </span></td>';
	 		html+=' </tr>';
	 		newItem++;
	 		return html;
	 }

	 function addItem(index)
	 {			
	 		 var files = $('#imageItem'+index).get(0).files;	
	 		var name,price,quantity,type,imgSrc,oldPrice;
			var i=index;
			$('#row'+index).children().each(function(index, el) {
		 		
		 		switch(index)
		 		{					
		 			case 0:
		 			 name=$(this).html();
		 			break;
		 			case 1:
		 			price =$(this).html();		 			
		 			break;
		 			case 2:	
		 				oldPrice =$(this).html();
		 			break;
		 			case 3:
		 			 quantity=$(this).html();
		 			break;
		 			case 4:
		 			var This=$(this);
		 			 type=This.find('.type option:selected').val();
		 			break;
		 			case 5:		
		 			break;
		 		}
		 	});
		 	var data={name:name,price:price,oldPrice:oldPrice,quantity:quantity,type:type};	
		 	if(isNaN(data.price)||isNaN(data.quantity))
		 	{
		 		$('#messAmin').html('Kiểu dữ liệu không đúng').removeClass('alert-success').addClass('alert-danger').fadeIn().css('margin', '20px 20px 0 0');;
		 		$('#mess'+index).html('Not save').removeClass('label-success').addClass('label-danger').show();
		 		setTimeout(function(){ $('#messAmin').fadeOut(); }, 7000);
		 		return 0;
		 	}
		 	else if(data.name==''||data.price==''||data.oldPrice==''||data.quantity==''||files.length == 0)
		 	{
		 		$('#messAmin').html('Không được để trống cột nào').removeClass('alert-success').addClass('alert-danger').fadeIn().css('margin', '20px 20px 0 0');;
		 		$('#mess'+index).html('Not save').removeClass('label-success').addClass('label-danger').show();
		 		setTimeout(function(){ $('#messAmin').fadeOut(); }, 7000);
		 		return 0;
		 	}
 			else
			 {
			    // One or more files selected, process the file upload
			    // create a FormData object which will be sent as the data payload in the
			    // AJAX request
			    var formData = new FormData();

			    // loop through all the selected files
			    for (var i = 0; i < files.length; i++) {
			      var file = files[i];

			      // add the files to formData object for the data payload
			      formData.append('imageItem', file, file.name);
			      formData.append('name',name);
			      formData.append('price',price);
			      formData.append('oldPrice',oldPrice);
			      formData.append('quantity',quantity);
			      formData.append('type',type);
			    }
			    	
			     $.ajax({
				  url: '/addItem',
				  type: 'POST',
				  data: formData,
				  processData: false,
				  contentType: false,
				  success: function(data){
				  	$('#messAmin').hide();
				     $('#mess'+index).html('Saved').removeClass('label-danger').addClass('label-success').show();
	 				$('#add'+index).hide();
	 				$('#row'+index).find('td').attr('contenteditable', 'false');
	 				$('#row'+index).find('td.Type').html(type);
	 				$('#row'+index).find('td.img'+index).html($('#imageItem'+index).val());
				  }
				});
		  } 		 		
	 }

	 function createTableAddItem()
	 {
	 	var html='<div id="tableAdd" class="table-responsive">'+
	 	'<table class="table table-bordered">'+
	 	'  <thead>'+
	 	'<tr>'+
	 	
	 	'  <th>Name</th>'+
	 	'  <th>Price (đ)</th>'+
	 	'   <th>Old Price (đ)</th>'+
	 	'   <th>Quantity</th>'+
	 	'   <th>Type</th>'+
	 	'   <th>Url image</th>'+
	 	'   <th>Add</th>'+
	 	' </tr>'+
	 	' </thead>'+

	 	'<tbody>'; 		
	 		html+=row();
	 	html+= '</tbody>'+
	 	'</table>'+
	 	'</div>';
	 	return html;
	 }

	 function addRow()
	 {	
	 	$('tbody').append(row());
	 }

	 function createTable(data)
	 {
	 	console.log(data);
	 	var html='<div class="table-responsive">'+
	 	'<table class="table table-condensed">'+
	 	'  <thead>'+
	 	'<tr>'+
	 	'  <th>Stt</th>'+
	 	'  <th>ID</th>'+
	 	'  <th>Name</th>'+
	 	'  <th>Price</th>'+
	 	'   <th>Old Price</th>'+
	 	'   <th>Quantity</th>'+
	 	'   <th>Type</th>'+
	 	'   <th >Url image</th>'+
	 	'   <th>Edit/Remove</th>'+
	 	' </tr>'+
	 	' </thead>'+

	 	'<tbody>';

	 	for (var i = 0; i <data.length; i++) {
	 		var id="row"+i;
	 		var btnIndex=i;
	 		html+='<tr id='+id+'>';
	 		html+='<td class="stt">'+(i+1)+'</td>';
	 		html+='<td class="idItem">'+data[i].id+'</td>';
	 		html+='<td>'+data[i].name+'</td>';
	 		html+='<td class="price">'+data[i].price+' đ</td>';
	 		html+='<td class="oldPrice">'+data[i].oldPrice+' đ</td>';
	 		html+='<td>'+data[i].quantity+'</td>';
	 		html+='<td>'+data[i].type+'</td>';
	 		html+='<td >'+data[i].imgSrc+'</td>';
	 		html+='<td><a href="javascript:editable('+btnIndex+')" class="btn btn-info btn-xs edit">Edit</a>'+
	 		'<a href="javascript:removeRow('+btnIndex+')"  class="btn btn-primary btn-xs remove">Remove</a>'+
	 		'<a href="javascript:updateRow('+btnIndex+')"  style="display:none" class="btn btn-warning btn-xs update">Save</a></td>';
	 		html+=' </tr>';

	 	}

	 	html+= '</tbody>'+
	 	'</table>'+
	 	'</div>';
	 	return html;
	 }
	
	 function editable(index)
	 {
	 	$('#row'+index).addClass('warning').children().attr('contenteditable', 'true');
	 	$('#row'+index+ '> td').has("a").attr('contenteditable', 'false');
	 	$('.idItem,.stt,.oldPrice').attr('contenteditable', 'false');
	 	$('#row'+index+ '> td a.edit').addClass('active');
	 	$('#row'+index+ '> td a.update').show();
	 	$('#row'+index+ '> td a.remove').hide();
	 }

	 function updateRow(index)
	 {	
	 	$('#confirm').modal('show');
	 	$('#yes').click(function(event) {
	 		$('#row'+index).removeClass('warning').addClass('success').children().attr('contenteditable', 'false');
		 	$('#row'+index+ '> td').has("a").attr('contenteditable', 'false');
				$('.idItem,.stt').attr('contenteditable', 'false');
		 	$('#row'+index+ '> td a.edit').removeClass('active');
		 	
		 	$('#row'+index+ '> td a.remove').show();
		 	$('#row'+index+ '> td a.update').hide();
		 	
		 	var id, name,price,quantity,type,imgSrc,oldPrice;
		 	
		 	$('#row'+index).children().each(function(index, el) {
		 		
		 		switch(index)
		 		{			
		 			case 1:
		 			 id=$(this).html();
		 			break;
		 			case 2:
		 			 name=$(this).html();
		 			break;
		 			case 3:
		 			var str=$(this).html();
		 			var data=str.split(' ');
		 			 price=	data[0];
		 			break;
		 			case 4:
		 			var str=$(this).html();
		 			var data=str.split(' ');
		 			oldPrice=	data[0];
		 			break;
		 			case 5:
		 			 quantity=$(this).html();
		 			break;
		 			case 6:
		 			 type=$(this).html();
		 			break;
		 			case 7:
		 			 imgSrc=$(this).html();
		 			break;
		 		}

		 	});
		 	var data={id:id,name:name,price:price,oldPrice:oldPrice,quantity:quantity,type:type,imgSrc:imgSrc};
		 	if(isNaN(data.price)||isNaN(data.quantity))
		 	{
		 		$('#messAmin').html('Kiểu dữ liệu không đúng').removeClass('alert-success').addClass('alert-danger').fadeIn().css('margin', '20px 20px 0 0');;
		 		$('#row'+index).removeClass('success').addClass('danger')	;
		 	}
		 	else
		 	$.ajax({
				url: '/updateItem',
				type: 'POST',
				data: data,
			})
			.done(function(data) {
				console.log(data);
					$('#messAmin').html('Đã cập nhật thành công').removeClass('alert-danger').addClass('alert-success').fadeIn().css('margin', '20px 20px 0 0');;
		 			setTimeout(function(){ $('#messAmin').fadeOut(); }, 7000);
		 			$('#row'+index).removeClass('denger').addClass('success')	;
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("ajax complete");
			});
	 	
	 	});
	
	 }

	 function removeRow(index)
	 {	
	 	$('#confirm').modal('show');
	 	$('#yes').click(function(event) {
	 		$('#row'+index+ '> td').has("a").attr('contenteditable', 'false');
		 	$('#row'+index).hide();

		 	var str='#row'+index;
		 	var id=$(str).children('.idItem').html();
		 	var data={id:id};

		 	$.ajax({
				url: '/removeItem',
				type: 'POST',
				data: data,
			})
			.done(function(data) {
				console.log(data);
				$('#messAmin').html('Đã xóa thành công khỏi hệ thống').removeClass('alert-danger').addClass('alert-success').fadeIn().css('margin', '20px 20px 0 0');;
		 		setTimeout(function(){ $('#messAmin').fadeOut(); }, 7000);

			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("ajax complete");
			});

		 	
	 	});
	 	
	 }

	 function byAll()
	 {	
	 	retrieve('byAll','');
	 }

	 function byId()
	 {	$('.result-retrieve').html('<h4>Nhập mã sản phẩm</h4> <input type="text" style="width:200px;display:inline-block;" class="form-control" name="idItem"><input type="button" class="btn btn-warning" name="Find" onClick="watch()" id="find" value="Xem">');
	 	//retrieve('byId');
	 }

	 function byPrice()
	 {	
	 	var tem='<div style="padding-left:25px" > <label class="radio "><input type="radio" name="priceItem"  value="0">Dưới 50.000đ</label>'+
			'<label class="radio"><input type="radio" name="priceItem" value="1">50.000d - 100.000d</label>'+
			'<label class="radio"><input type="radio" name="priceItem" value="2">100.000d - 300.000d</label>'+
			'<label class="radio"><input type="radio" name="priceItem" value="3">300.000d - 500.000d</label>'+
			'<label class="radio"><input type="radio" name="priceItem" value="4">500.000d - 1.000.000d</label>'+
			'<label class="radio"><input type="radio" name="priceItem" value="5">Trên 1.000.000d</label>'+
			'<input type="button" class="btn btn-warning" name="find" style="width:100px" id="Find" onClick="watch()" value="Xem"></div>';
	 	$('.result-retrieve').html('<h4>Chọn tầm giá</h4> '+tem);
	 	
	 	//retrieve('byPrice');
	 }

	 function byName()
	 {	$('.result-retrieve').html('<h4>Nhập tên sản phẩm</h4>  <input type="text" style="width:400px;display:inline-block;" class="form-control" name="nameItem"><input type="button" class="btn btn-warning" id="Find" onClick="watch()" name="find" value="Xem">');
	 	//retrieve('byName');
	 }
	 
	 function retrieve(str,DATA)
	 {	
	 	var data={type:str,DATA};
	 
	 	$.ajax({
			url: '/retrieve',
			type: 'GET',
			data: data,
		})
		.done(function(data) {
			
			$('.result-retrieve').html(createTable(data));
			

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("ajax complete");
		});
	 }

	function watch() {  
		
		var price =$('.result-retrieve input[name=priceItem]:checked').val();
		var id = $('.result-retrieve input[name=idItem]').val();
		var name = $('.result-retrieve input[name=nameItem]').val();
		if(price!==undefined){retrieve('byPrice',price);return;}
		if(name!==undefined&&name!='') {retrieve('byName',name);return;}
		if(isNaN(id) &&id!==undefined)alert('Nhập số nhé');
		else
		if(id!==undefined &&id!='')retrieve('byId',id);
		
	};


