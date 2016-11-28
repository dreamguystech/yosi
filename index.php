<?php
require_once 'config.php';
session_destroy();
session_start();
	$pname = $displaylogin = $invite_id = $pid='';
	if(isset($_GET['pid']))$pid= $_GET['pid'];
	if($pid)
	{
		$_SESSION['pid'] = $pid;
	}
	else
	{
		header("Location: http://dev.yosicare.com");
	}
	//get token details api 
	$_SESSION['webyosiRequestId'] = INI_WEB_REQUEST_TOKEN_ID;
	$api_request = INI_WEB_API_BASE . "practice/requesttoken";
	 $MCrypt = new MCrypt();
	 $params = "Id=".INI_WEB_REQUEST_TOKEN_ID."&Secret=".INI_WEB_REQUEST_TOKEN_SECRET."&Version=v1&Client=web";
	 $params = $MCrypt->encrypt($params);
		
		$api_request_post_data = array(
			"Params" => $params
		);
	$api_response = getData($api_request, $api_request_post_data);
	$json_response = json_decode($api_response);
	$json_response_data = $json_response->data;
	$jsondata = json_decode($MCrypt->decrypt($json_response_data->data));
	$AccessToken = $jsondata->AccessToken;
	$_SESSION['webyosiToken'] = $AccessToken->Token;
	$_SESSION['webyosiRefreshToken'] = $AccessToken->RefreshToken;
	
  	//get left sidebar details api 
	$api_request = INI_WEB_API_BASE . "practice/getdetails";
	$MCrypt = new MCrypt();
	$params = "PracticeId=".$_SESSION["pid"];
	$params = $MCrypt->encrypt($params);
	$api_request_post_data = array(
		"Params" => $params
	);
	$api_response = getData($api_request, $api_request_post_data);
	$json_response = json_decode($api_response);
	$Practice_all = $json_response->data; 
	$PracticeId =$Practice_all->Data;
	
	$id 	= 	 $PracticeId->practice_id;
	$name	=	 $PracticeId->practice_name;
	$logo	=	$PracticeId->practice_logo;
	$practice_address1	=	$PracticeId->practice_address1;
	$practice_address2	=	$PracticeId->practice_address2;
	$practice_state	=	$PracticeId->practice_state;
	$practice_city	=	$PracticeId->practice_city;
	$practice_zipcode	=	$PracticeId->practice_zipcode;
	$practice_phone	=	$PracticeId->practice_phone;		
	
	//get all doctor details api 
	 $api_request_doctorlist = INI_WEB_API_BASE . "practice/doctorlist";
	 $MCrypt = new MCrypt();
	 $params = "PracticeId=".$id;
	 $params = $MCrypt->encrypt($params);
		$api_request_post_doctorlist = array(
			"Params" => $params
		);
	$api_response_one = getData($api_request_doctorlist, $api_request_post_doctorlist);
	$json_response_all = json_decode($api_response_one);
	$returned_drlist=array();
	if($json_response_all)
	{
		$json_response_doctorlist = $json_response_all->data;
		$returned_drlist = $json_response_doctorlist->Data;
	}
	//get current date time slot api
	$cur_date=date("m/d/Y"); 
	$api_request_timing = INI_WEB_API_BASE . "practice/doctortiming";
	 $MCrypt = new MCrypt();
	 $params_t = "PracticeId=".$id."&DoctorId=".$returned_drlist[0]->doctor_id."&Appdate=".$cur_date;
	 $params_t = $MCrypt->encrypt($params_t);
		$api_request_post_timing = array(
			"Params" => $params_t
		);
	$api_response_timing = getData($api_request_timing, $api_request_post_timing);
	$json_response_all_time = json_decode($api_response_timing);
	$returned_drlist_time = $json_response_all_time->data;
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="images/favicon.png">
        <title>Yosi</title>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="css/owl.carousel.css" rel="stylesheet" type="text/css">
		<link href="css/owl.theme.default.min.css" rel="stylesheet" type="text/css">
        <link href="css/style.css" rel="stylesheet" type="text/css">
        <link href="css/responsive.css" rel="stylesheet" type="text/css">
		<link href="css/responsive2.css" rel="stylesheet" media="screen and (max-height: 745px)">
        <link href="css/bootstrap-datepicker.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="main-wrapper">
            <div class="header">
                <div class="header-left">
                    <a href="" class="logo">
						<img src="images/logo.png" width="67" height="48" alt="Yosi">
					</a>
                </div>
                <div class="navbar navbar-custom">
					<h3 class=""><?php echo $name ?> <!--<span class="specialist">Podiatrist</span>--></h3>
                </div>
            </div>
            <div class="sidebar">
                <div class="sidebar-inner slimscroll">
					<div class="profile-widget">
						<div class="profile-img">
							<img alt="Doctor Name" src="<?php echo $logo; ?>" class="img-responsive img-circle" width="150" height="150">
						</div>
						<div class="doctor-det">
							<div class="doctor-info">
								<h5><?php echo $name; ?></h5>
								<!--<span>Practicing since 2012</span>-->
							</div>
							<div class="doctor-address">
								<p>
								<span><?php echo $practice_address1 ?></span>
								<span><?php echo $practice_address2 ?></span>
								<span><?php echo $practice_state ?></span>
								<span><?php echo $practice_city ?></span>
								<span><?php echo $practice_zipcode ?></span></p>
							</div>
							<div class="doctor-phone">
                                <span id="number_show" style="display:none;">Phone: <?php echo $practice_phone; ?></span>
                                <a href="javascript:ReverseDisplay('number_show')" class="add-html">Show Phone Number</a>
                            </div>
						</div>
					</div>
                </div>
            </div>
            <div id="select_drlist" class="modal success-modal doctor-modal">
				<div class="modal-dialog">
					<div class="modalcontent">
						<div class="row">
							<div class="col-md-12">
								<h2 class="choose-provider">Choose Your Provider</h2>
								<div class="doctor-carousel <?php if(count($returned_drlist) ==1){ echo 'doctor-onlyone'; } else if(count($returned_drlist) ==2){ echo 'doctor-onlytwo'; }else if(count($returned_drlist) ==3){ echo 'doctor-onlythree'; }?>">
									<div class="owl-carousel" id="doctor-carousel">
										<?php if(count($returned_drlist)> 0){ foreach($returned_drlist as $all_drlist){ 
										$nam=$all_drlist->doctor_first_name.' '.$all_drlist->doctor_last_name; 
										$img='images/doctor.jpg';
										if(isset($all_drlist->doctor_image)) { if($all_drlist->doctor_image !='') {$img =$all_drlist->doctor_image; } }?>
										<a href="javascript:;" class="dr-link" onClick="select_doctor(<?php echo $id;?>, <?php echo $all_drlist->doctor_id;?>, '<?php echo $cur_date;?>', '<?php echo $nam; ?>');">
											<div class="doctor-widget" >
												<span class="dr-img-wrap">
													<span class="doctor_img" style="background-image:url(<?php echo $img; ?>) " ></span>
												</span>
												<h4><?php echo $nam;?><br><span><?php if($all_drlist->doctor_specialty!='') { echo $all_drlist->doctor_specialty; } else { ?>&nbsp; <?php }?></span></h4>
											</div>
										</a> <?php } } ?>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-backdrop2"></div>
            <div class="content-wrap">
                <div class="content container-fluid">
					<div id="select_calendarpage" >
						<div class="row">
							<div class="col-xs-12">
								<div class="page-title-section">
									<h4 class="page-title" >Request an Appointment with <span id="updated_select_doctor"><?php echo $name; ?></span> <span class="appointment-result" style="display:none">
												<span class="selected_date" id="datepicker-example14"></span> <span id="selecttime_default">at</span>
                                                <span class="selected_time" id="selected_time"></span>
											</span></h4>
								</div>
							</div>
						</div>
						<div class="row">
							<div id="appointment_before_part" class="col-sm-12 col-md-12 col-lg-12 col-xs-12 date-pick-time">
								<div class="widget-box">
									
									<div class="row">
										<div class="col-md-12">
											<div class="appointment-time">
												<h3>Select a preferred date and time</h3>
												<p>To choose a date and select appointment time</p>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-9 col-lg-9 col-sm-9 col-xs-8 calander-picker">
											<form action="javascript:void(0)" method="post">
												<div id="calander" class="timeqa"></div>
											</form>
										</div>
										<div class="col-md-3 col-lg-3 col-sm-3 col-xs-4 time-picker">
											<div class="timepicker">
												<div id="scrollUp" class="time-top"><img src="images/top-arrow.png" alt="" width="13" height="10"></div>
												<div class="slimscroll" id="boxscroll">
													<ul class="time-list" id="dynamic_timelist">
														<?php if(count($returned_drlist_time>0)){ 
															foreach($returned_drlist_time as $res)
															{?>
																<li  class="conformed_time"><?php echo $res->app_time;?></li>
                                                             <?php
															}
														}
														?>	
													</ul>
												</div>
												<div id="scrollDown" class="time-bottom"><img src="images/bottom-arrow.png" alt="" width="13" height="10"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="appointment_after_part" class="col-lg-4 col-md-4 col-sm-4 col-xs-12 selected-timepick" style="display:none">
								<div class="appointment-form">
									<div class="form-header">
										<h3>Appointment Details</h3>
									</div>
									<form  id="appointment_form" method="post" class="">
										<input type="hidden" name="PracticeId" id="PracticeId" value="<?php echo $id; ?>" >
										<input type="hidden" name="Address2" id="Address2" value="cheranma nagar" >
										<input type="hidden" name="DoctorId" id="DoctorId" value="1" >
										<div class="form-body">
											<div class="form-group">
												<label>First Name</label>
												<input class="form-control" placeholder="First Name" name="firstname" id="firstname" type="text">
											</div>
											<div class="form-group">
												<label>Last Name</label>
												<input class="form-control" placeholder="Last Name" name="lastname" id="lastname" type="text">
											</div>
											<div class="form-group">
												<label>Phone</label>
												<input class="form-control" placeholder="415-802-5244" name="phone" id="phone" type="tel">
											</div>
											<div class="form-group">
												<label>Email</label>
												<input class="form-control" placeholder="johan@example.com" name="email" id="email" type="email">
											</div>
                                            <div class="form-group">
												<label>DOB</label>
                                            	<input class="form-control" placeholder="MM/DD/YYYY" id="datepicker-dob" type="text" name="user_dob" value="" >
											</div>
											
											<div class="app-btn">
												<button type="submit" class="btn btn-primary btn-block request_btn">Request Appointment</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
         <div id="loading-spinner" class="modal fade success-modal" role="dialog"><img src="images/loader.gif" alt="" class="sent-img" width="32" height="32"> </div>
        <div id="appointment-sucess" class="modal fade success-modal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <img src="images/sent.png" alt="" class="sent-img" width="64" height="62">
                        <h3 id="doctor_success_alert"></h3> 
                        <p id="response_success"></p>
                        <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/modernizr.min.js"></script>
        <script type="text/javascript" src="js/jquery.slimscroll.js"></script>
        <script type="text/javascript" src="js/zebra_datepicker.js"></script>
        <script type="text/javascript" src="js/owl.carousel.min.js"></script>
        <script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
        <script>
		$(function () {
			$('#datepicker-dob').datepicker({ 
				autoclose: true,
				startView: 'decade',
				minView: 'decade',
				viewSelect: 'decade',
				endDate : new Date()
			 }); 
         });
		</script>
    </body>
</html>