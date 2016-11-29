$(document).ready(function(e) { alert(1);
	$(".loading").css('display','block');
	$.ajax({
        url:'https://dev.yosicare.com/calendarpage/mobile-app.php?page=get_practice',
        type:'POST',
        data:'',
		dataType:'json',
success:function(data){ alert(2);
$(".loading").css('display','none');
		$(".main-wrapper").css('opacity','1');
		$("#PracticeId").val(data.data['Data']['practice_id']);
		$(".doctor-info").empty().append(data.data['Data']['practice_name']);
		$(".profile-img img").attr('src',data.data['Data']['practice_logo']);
		$(".doctor-address p").empty().append('<span>'+data.data['Data']['practice_address1']+'</span><span>'+data.data['Data']['practice_address2']+'</span><span>'+data.data['Data']['practice_state']+'</span><span>'+data.data['Data']['practice_city']+'</span><span>'+data.data['Data']['practice_zipcode']+'</span>');
		$("#number_show").empty().append("Phone: "+data.data['Data']['practice_phone']);
		getDoctors();
}
});
	
	/*$.post('https://dev.yosicare.com/calendarpage/mobile-app.php?page=get_practice',{},function(data){
		$(".loading").css('display','none');
		$(".main-wrapper").css('opacity','1');
		$("#PracticeId").val(data.data['Data']['practice_id']);
		$(".doctor-info").empty().append(data.data['Data']['practice_name']);
		$(".profile-img img").attr('src',data.data['Data']['practice_logo']);
		$(".doctor-address p").empty().append('<span>'+data.data['Data']['practice_address1']+'</span><span>'+data.data['Data']['practice_address2']+'</span><span>'+data.data['Data']['practice_state']+'</span><span>'+data.data['Data']['practice_city']+'</span><span>'+data.data['Data']['practice_zipcode']+'</span>');
		$("#number_show").empty().append("Phone: "+data.data['Data']['practice_phone']);
		getDoctors();
	},"json");*/
	
});

function getDoctors(){
	$(".loading").css('display','block');
	$.post('https://dev.yosicare.com/calendarpage/mobile-app.php?page=get_doctors',{practiceId:$("#PracticeId").val()},function(data){
		$(".loading").css('display','none');
		
		if(data.data['Count'] >= 1){
			$("#doctor-carousel").empty();
			for(var i=0;i<data.data['Count'];i++){
				$("#doctor-carousel").append('<a href="javascript:;" class="dr-link" data-did="'+data.data['Data'][i]['doctor_id']+'"><div class="doctor-widget"><span class="dr-img-wrap"><span class="doctor_img" style="background-image:url('+data.data['Data'][i]['doctor_image']+') "></span></span><h4>'+data.data['Data'][i]['doctor_first_name']+" "+data.data['Data'][i]['doctor_last_name']+'<br><span>'+data.data['Data'][i]['doctor_specialty']+'</span></h4></div></a>');
			}
			$("#doctor-carousel").data('owlCarousel').destroy();
			$('#doctor-carousel').owlCarousel({dots: false,items: 1});
		}
	},"json");
}

$(document).on('click','a.dr-link',function(){
	$("#DoctorId").val($(this).attr('data-did'));
	$("#select_calendarpage").show();	
	var doc_name = $(this).find('h4').html().split('<br>'); 
	$("#updated_select_doctor").empty().html(doc_name[0]);
	$("#appointment-sucess h3").empty().append(doc_name[0]+' received the appointment request.');
	$("#select_drlist").hide();
	$(".modal-backdrop2").hide();
	$("body").animate({ scrollTop: $('#select_calendarpage').position().top }, 2000);
});
