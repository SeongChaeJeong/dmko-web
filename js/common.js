$(function(){
    //파일 첨부
	$('input[type="file"]').on('change', function(){

		id = $(this).attr('id');
		if(id) {
			addAttachContentusURL(this, id);
		}
		
// 		var filename = '';
// 		if(window.FileReader)
// 			filename = $(this).files.name;
// 		else
// 			filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
// 		
// 		$(this).siblings('input[type="text"]').val(filename);
	});
	var winScrollTop = $(window).scrollTop();
	if(winScrollTop >= 20){
		$('#header').addClass('fixed');
	}else{
		$('#header').removeClass('fixed');
	}
});
$(document).ajaxStart(function() {
	showLoadingBar();
});

$(document).ajaxComplete(function(event, request, settings) {
	hideLoadingBar();
});

function showLoadingBar() { 
	var maskHeight = $(document).height(); 
	var maskWidth = window.document.body.clientWidth; 
	var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>"; 
	var loadingImg = ''; 

	loadingImg += "<div id='loadingImg' style='position:absolute; left:50%; top:40%; display:none; z-index:10000;'>"; 
	loadingImg += " <img src='images/loading.gif'/>"; 
	loadingImg += "</div>"; 
	$('body').append(mask).append(loadingImg); 
	$('#mask').css({ 
		'width' : maskWidth , 
		'height': maskHeight , 
		'opacity' : '0.3' 
	}); 

	$('#mask').show(); 
	$('#loadingImg').show(); 
}

function hideLoadingBar() { 
	$('#mask, #loadingImg').hide(); 
	$('#mask, #loadingImg').remove(); 
}

$(window).on('scroll', function(){
	var winScrollTop = $(window).scrollTop();
	if(winScrollTop >= 20){
		$('#header').addClass('fixed');
	}else{
		$('#header').removeClass('fixed');
	}
});
function addAttachContentusURL(input, target) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
		
			var filename = '';
			if(window.FileReader)
				filename = input.files[0].name;
			else
				filename = input.val().split('/').pop().split('\\').pop(); // 파일명만 추출
			
			$("#"+target+"_name").val(filename);
			
		}
		reader.readAsDataURL(input.files[0]);
	}
}
//contact us
function contactBoxOpen(){
	$('.page-dim').fadeIn('fast');
	$('.contact .btn-contact-close').fadeIn('fast');
	$('.contact').animate({
		'bottom': 0
	}, 300);
}
function contactBoxClose(){
	$('.page-dim').fadeOut('fast');
	$('.contact .btn-contact-close').fadeOut('fast');
	if($(window).width() <= 860){
		$('.contact').animate({
			'bottom': '-94%'
		}, 300);
	}else{
		$('.contact').animate({
			'bottom': '-83.5%'
		}, 300);
	}
}
function inNavContactBoxOpen(){
	mSideBoxClose();
	contactBoxOpen();
}

//side box menu
function mSideBoxOpen(){
	$('#header .menu').animate({
		'left': 0
	}, 300);
	$('.page-dim').fadeIn('fast');
}
function mSideBoxClose(){
	$('#header .menu').animate({
		'left': '-280px'
	}, 300);
	$('.page-dim').fadeOut('fast');
}

//scroll 콘텐츠 애니메이션
$.fn.contAni = function () {
	$.each(this, function (i, v) {
		$window = $(window);
		var delayPosition = -100,
			windowheight;
		$window.on('resize', function () {
			insertTargetPosition();
		});
		$window.on('scroll', function () {
			var position = $window.scrollTop() + windowheight + delayPosition;
			$(v).each(function () {
				if (!$(this).hasClass('active') && $(this).data('offsetTop') < position) {
					$(this).addClass('active');
				}
			});
		});
		function insertTargetPosition() {
			windowheight = $window.height();
			var position = $window.scrollTop() + windowheight + delayPosition;
			$(v).each(function () {
				$(this).data('offsetTop', ($(this).offset().top));
				if (!$(this).hasClass('active') && $(this).data('offsetTop') < position) {
					$(this).addClass('active');
				}
			});
		}
		(function init() {
			insertTargetPosition();
		})();
	});
}