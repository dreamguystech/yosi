$('.slimscroll').slimscroll({
height: 'auto',
          position: 'right',
          size: "7px",
          color: '#ccc',
          wheelStep: 5
});
	$(document).ready(function() {
         $('#datepicker-example14').Zebra_DatePicker({
			 format: 'm/d/Y',
         direction: true,
		
		 setDate: new Date() ,
         pair: $('#datepicker-example7-end'),
         always_visible: $('#calander')
         });
         $('.dp_next').html('<img src="./images/arrow_right.png" width="11" height="14">');
         $('.dp_previous').html('<img src="./images/arrow_left.png" width="11" height="14">');
        // $(".Zebra_DatePicker").css("z-index", '');
        // $(".Zebra_DatePicker").css("position", 'relative');
         $(".old-date").css("background-color", '#B4B4B4');
         $(".dp_current").css("background-color", '');
         $(".Zebra_DatePicker").css({"position": "relative", "width": "100%"}); 
		 $("#calander").css("width", '100%');
         jQuery('.time').scrollTop(450);
         
         $(".timeqa").on('click','.Zebra_DatePicker .dp_daypicker',function (){ 
            
         	$('.timeslot').val($(this).text());
         	var date = $('#datepicker-example14').html(); 
			$(".widget-box").addClass('date_selected');
			 $(".appointment-result").show();
			 var did= $("#DoctorId").val();
			 var pid= $("#PracticeId").val();
			 $("#selecttime_default").hide();
			 $("#selected_time").html('');
			 /*var url 	 = 'ajax/doctortiming.php'; 
					$.ajax({
						type:'post',
						url:url,
						data:{id:pid,dr_id:did,cur_date:date},
						dataType: 'json',
					
						success: function(data)
						{
							if(data)
							{
								if(data.content.length>0){
								$("#dynamic_timelist").html('');
								$("#dynamic_timelist").html(data.content);	
								}
								//$("#select_drlist").hide();	
								//$(".modal-backdrop2").hide();	
												
							}
						}
					})*/

         });
		 
		 $(".dp_daypicker").on('click',function (){  
		 	$(".time-list li").removeClass('active');
			$('.slimscroll').slimScroll({ scrollTo: '0' });
		 
		 });
	});
		
	$(document).ready(function(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var n = today.getHours();
		
		var ampm = (n >= 12) ? "PM" : "AM";
		//alert(ampm);
		if (n > 12) {
			n = n-12;
		}
		$("#selected_time").html(n+':00 '+ampm);
		$('#'+n).addClass('active');
		if(n>5){
			var ns= n-5; 
			var ns1= (ns *50); 
			$('.slimscroll').slimScroll({ scrollTo: ns1+'px' });
		}
		
		var yyyy = today.getFullYear();
		if(dd<10){
		dd='0'+dd
		} 
		if(mm<10){
		mm='0'+mm
		} 
		var today = mm+'/'+dd+'/'+yyyy;
		$('#datepicker-example14').html(today);
		//$( ".dp_current" ).removeClass( "dp_current" ).addClass( "dp_selected" );
		$( ".dp_weekend_disabled" ).removeClass( "dp_weekend_disabled" ).addClass( "dp_disabled" );
	});
	
	$(document).ready(function(eve){
		$('.date_field_input').bind('keypress', function(event) {	
			var keyCode = event.keyCode || event.which; 				 
			if(keyCode!=9)
			{ 					
				var regex = new RegExp("^[0-9 \b]+$");
				var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);					 
				if (!regex.test(key)) 
				{					 
					event.preventDefault();
					return false;
				}
			}
		});		 
	
		$('#appointment_form').submit(function(){
			var FirstName = $.trim($('#firstname').val());
			var LastName  = $.trim($('#lastname').val());
			var Phone     = $.trim($('#phone').val());
			var Email     = $.trim($('#email').val());
			var Dob		  = $.trim($('#datepicker-dob').val()); 						
			if(FirstName.length>0 && LastName.length>0 && Phone.length>0 && Email.length>0 && Dob.length>0)	
			{ 
				var AppTime  = $.trim($('#selected_time').html());
				if(AppTime.length>0){
					var FirstName = $.trim($('#firstname').val());
					var LastName  = $.trim($('#lastname').val());
					var Phone     = $.trim($('#phone').val());
					var Email     = $.trim($('#email').val());
					
					var Dob       = $.trim($('#datepicker-dob').val());
					var PracticeId = $.trim($('#PracticeId').val());
					var DoctorId  = $.trim($('#DoctorId').val());
					var Appdate  = $.trim($('#datepicker-example14').html());
					var AppTime  = $.trim($('#selected_time').html());
					$("#appointment-sucess").modal('toggle');			
					//var url 	  = 'ajax/addappointment.php'; 	
					/*$.ajax({
						type:'post',
						url:url,
						data:{FirstName:FirstName,LastName:LastName,Phone:Phone,Email:Email,Dob:Dob,PracticeId:PracticeId,DoctorId:DoctorId,Appdate:Appdate,AppTime:AppTime},
						beforeSend: function() {
							$('.request_btn').html('<img src="images/btn-loader.svg" width="24"/>');
						},
						success: function(data)
						{ 
							if(data)
							{ 
								$('#appointment_form')[0].reset();
								$("#selected_time").html('');
								$("#datepicker-example14").html('');
								$("#selecttime_default").hide();
								$("#response_success").html(data);
								$('.conformed_time').removeClass('active');
								$("#appointment-sucess").modal('toggle');	
																	
							}
							else {
								$('#appointment_form')[0].reset();
								$("#selected_time").html('');
								$("#datepicker-example14").html('');
								$("#response_success").html(data);
								$("#selecttime_default").hide();
								$('.conformed_time').removeClass('active');
								$("#appointment-sucess").modal('toggle');
								
							}
							 $('.request_btn').html('Request Appointment');
						}
					})*/
				}else{
					alert('Please select a time');
				}
			}
			else{
				if(FirstName.length<1){  
					$('#firstname').parent().addClass('has-error');
				}
				if(LastName.length<1){
					$('#lastname').parent().addClass('has-error');
				}
				if(Phone.length<1){
					$('#phone').parent().addClass('has-error');
				}
				if(Email.length<1){
					$('#email').parent().addClass('has-error');
				}
				if(Dob.length<1)						 						
				{
					$('#datepicker-dob').parent().addClass('has-error');
					
				}
			}
			return false;
		});
		$('#firstname').blur(function() {	
			$('#firstname').parent().removeClass('has-error');
		});
		$('#lastname').blur(function() {	
			$('#lastname').parent().removeClass('has-error');
		});
		$('#phone').blur(function() {	
			$('#phone').parent().removeClass('has-error');
		});
		$('#email').blur(function() {	
			$('#email').parent().removeClass('has-error');
		});
		$('#datepicker-dob').on('click',function() {	 
			$('#datepicker-dob').parent().removeClass('has-error');
		});
		
		$("#dynamic_timelist").on("click",".conformed_time", function(){
		 	 $('.conformed_time').removeClass('active');
			 $(this).addClass('active');
			 var as= $(this).html(); 
			 $("#selected_time").html(as);
			 var date1 = $('#datepicker-example14').html(); 
			 $("#appointment_before_part").removeClass("col-md-12 col-lg-12 col-xs-12");
			 $("#appointment_before_part").addClass("col-md-8 col-lg-8 col-sm-12 apt-select");
			 $("#selected_time").show();
			  $("#selecttime_default").show();
			 $(".appointment-result").show();
			 $("#appointment_after_part").show();
			 $(".widget-box").removeClass('date_selected');
		});	

		$(".time-list li").click(function(){
			 $('li').removeClass();
			 $(this).addClass('active');
			 var as= $(this).html(); 
			 $("#selected_time").html(as);
			 var date1 = $('#datepicker-example14').html(); 
			 $("#appointment_before_part").removeClass("col-md-12 col-lg-12 col-xs-12");
			 $("#appointment_before_part").addClass("col-md-8 col-lg-8 col-sm-12 apt-select");
			 $("#selected_time").show();
			 $(".appointment-result").show();
			 $("#appointment_after_part").show();
		
		});		
		
	});
	$('#scrollDown').click(function(){
	  $('.slimscroll').slimScroll({ scrollBy: '50px' });
	});
	$('#scrollUp').click(function(){
	  $('.slimscroll').slimScroll({ scrollBy: '-50px' });
	});
	
	function select_doctor(pid, did, adate, ele)
	{
		$("#DoctorId").val(did);
		$("#select_calendarpage").show();
		$("#doctor_success_alert").html(ele+' received the appointment request.');
		$("#updated_select_doctor").html('');
		$("#updated_select_doctor").html(ele);
		$("#select_drlist").hide();
		$(".modal-backdrop2").hide();
	}
	
	var doctorCarousel = $('#doctor-carousel');
	jQuery(document).ready(function () {
		if ($().owlCarousel) {
			var owl = $('.owl-carousel');
			if (doctorCarousel.length) {
				doctorCarousel.owlCarousel({
					autoplay: false,
					//loop: true,
					margin: 20,
					dots: false,
					nav: true,
					navText: [
						"<img src='images/s-left.png' alt='' width='33' height='48'>",
						"<img src='images/s-right.png' alt='' width='33' height='48'>"
					],
					responsive: {
						0: {items: 1},
						480: {items: 2},
						768: {items: 2},
						992: {items: 3},
						1024: {items: 3},
						1280: {items: 3}
					}
				});
			}
		}
	
	});
	function ReverseDisplay(d) {
		if(document.getElementById(d).style.display == "none") { document.getElementById(d).style.display = "inline-block"; $(".add-html").html('');}
		else { document.getElementById(d).style.display = "none"; $(".add-html").html('Show Phone Number'); }
	}