var $load_chat = 0;
//var sitename = "//localhost";// "//transwest.kitsunekko.net";
var sitename = '';
$(function() {
	
	// формат поля ввода номера тел
	$('#form_costing input[name="tel"], #form_call_back input[name="tel"]').intlTelInput({
		initialCountry: 'auto',
		geoIpLookup: function(callback) {
			$.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
				var countryCode = (resp && resp.country) ? resp.country : '';
				callback(countryCode);
			});
		},
		preferredCountries: ['ua', 'ru', 'by', 'kz'],
		separateDialCode: true,
		autoPlaceholder: 'aggressive',
		utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.8/js/utils.js',
	});
	
	// PopUpKiller
	setTimeout(function() {
		$.ajax({
			url: sitename +'/assets/popupkiller.php',
			type: 'POST',
			data: {'param': 'check_popupkiller'},
			success: function(response) {
				var res = $.parseJSON(response);
				if (res.check == 'yes' && res.close_popup == 'yes' && res.adwords == 'yes'){
					$('#call_back').trigger('click');
				}
			}
		});
	}, 15000);
	
    // расширенная форма расчета
    $('#button_form').click(function() {
        
        if ($(this).is(':checked')) {
            $('.expanded_form').css('display', 'block');
            $('#button_form+label').text('Вернутся к упрощенной форме');
            $('.calc_form form input[name="button"]').appendTo('.calc_form form');
			
			$('.sidebar').removeClass('fixed_sidebar fixed_sidebar_stop');
        }
        
        else {
            $('.expanded_form').css('display', 'none');
            $('#button_form+label').text('Расширенная форма для точного расчета');
        }
    
    });
    // указать темп. режим в форме расчета
    $('#temp').click(function() {
        
        if ($(this).is(':checked')) {
            $('input[name="temp_c"]').prop('disabled', false);
        }
        
        else {
            $('input[name="temp_c"]').prop('disabled', true).val('');
        }
    
    });
	// загрузка файла
	$('#form_costing input[name="file"]').change(function() {
        var elem = $('label[for="file"]').html();

        if (elem == 'Загрузить файл') {
            var data = $(this).val().replace(/(.*)\\(\w+\.\w+)$/gi, '$2');
            $('label[for="file"]').html(data);
        }

		else {
            $('label[for="file"]').html('Загрузить файл');
        }
    });
	// расширенное моб меню
    $('#replace_header_mobile').click(function(event) {
        event.preventDefault();
		$(this).parent('div').hide();
		$(this).parent('div').next('div').fadeIn();
		$('.menu').hide();
		//$('.calc_form').fadeIn();
    });
	// список телефонов для звонка
	$('#show_list').on('click', function(event) {
		event.preventDefault();
		$('.list_phone').fadeIn();
		$('html, body').css('overflow','hidden');
	}); 

	$('#close_list_tel').on('click', function(event) {
		event.preventDefault();
		$('.list_phone').fadeOut();
		$('html, body').css('overflow','auto');
	}); 
	// обратный звонок
	$('#call_back, #call_back_header').on('click', function(event) {
		event.preventDefault();
		$('.call_back_block').fadeIn();
		$('html, body').css('overflow','hidden');
	}); 

	$('#close_call_back').on('click', function(event) {
		event.preventDefault();
		$('.call_back_block').fadeOut();
		$('html, body').css('overflow','auto');
		
		$.get(sitename +'/assets/popupkiller.php', {param: 'close_popupkiller'});
	}); 
	// ---	
	// Top button
	//$(window).scroll(function() {
	//	if ($(window).scrollTop() > 0) {
	//		$('#toTop').style.display = "block" // fadeIn();
	//	}

	//	else {
	//		$('#toTop').fadeOut();
	//	}
	//});

	var btn = $('#toTop');

	//$(window).scroll(function () {
	//	if ($(window).scrollTop() > 300) {
	//		btn.addClass('show');
	//	} else {
	//		btn.removeClass('show');
	//	}
	//});

	window.addEventListener('scroll', function () {
		if (window.scrollTop > 300) {
			btn.addClass('show');
		} else {
			btn.removeClass('show');
		}
	});
	
	$('#toTop').on("click",function() {
		$('body,html').animate({scrollTop:0}, 500);
	});	
    
	// загрузка чата
	$("#chat").click(function() {
		0 == $load_chat && $.getScript("js/chat.js", function() {
			$load_chat = 1
		}), 1 == $load_chat && HelpCrunch("openChat")
    });
	
	// фиксированный sidebar при скролле
 	/*$(window).scroll(function(){
		var widthWin = $(window).outerWidth() + 16;
		if (($('.calc_form').is(':visible') || $('.add_block_info').is(':visible')) && widthWin > 630){
			
			var posBlock = $('.top_block').offset().top;
			var posNextBlock = $('.top_block').next().offset().top;
			var heightBlock = $('.sidebar').outerHeight();
			var winScroll = $(this).scrollTop();
			
			if (!$('#button_form').is(':checked')){
				if (winScroll >= posBlock && winScroll <= (posNextBlock - heightBlock)){
					$('.sidebar').addClass('fixed_sidebar').removeClass('fixed_sidebar_stop');
				}
				
				else if (winScroll > (posNextBlock - heightBlock)){
					$('.sidebar').addClass('fixed_sidebar_stop').removeClass('fixed_sidebar');
				}
				
				else {
					$('.sidebar').removeClass('fixed_sidebar fixed_sidebar_stop');
				}
			}
		}
		
		else {
			$('.sidebar').removeClass('fixed_sidebar fixed_sidebar_stop');
		}

	});*/
			
	$("#replace_header_mobile").click(function(e) {
		e.preventDefault(), $(".menu_msg").is(":hidden") ? ($(".menu_msg").slideDown(), $(this).addClass("replace_header_arrow"), $(".calc-all").slideUp(), $(".menu_call").slideUp(), $(".menu").slideUp()) : ($(".menu_msg").slideUp())
    });
	
	$("#show_mobile_menu").click(function(e) {
		e.preventDefault(), $(".menu").is(":hidden") ? ($(".menu").slideDown(), $(this).addClass("replace_header_arrow"), $(".menu_msg").slideUp(), $(".menu_call").slideUp(), $(".calc-all").slideUp()) : ($(".menu").slideUp())
	});


	
	$("#show_calc").click(function (e) {
		e.preventDefault(), $(".calc-all").is(":hidden") ? ($(".calc-all").slideDown(), $(this).addClass("replace_header_arrow"), $(".menu_msg").slideUp(), $(".menu_call").slideUp(), $(".menu").slideUp()) : ($(".calc-all").slideUp())
		document.getElementById("calcform-body").scrollIntoView();
	});


	$("#show_phone").click(function(e) {
		e.preventDefault(), $(".menu_call").is(":hidden") ? ($(".menu_call").slideDown(), $(this).addClass("replace_header_arrow"),  $(".menu_msg").slideUp(), $(".calc-all").slideUp(), $(".menu").slideUp()) : ($(".menu_call").slideUp())
	});


	var acc = document.getElementsByClassName("accordion");
	var i;


	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			var j;
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			for (j = 0; j < acc.length; j++) {
				var pan = acc[j].nextElementSibling;
				if (pan.style.maxHeight && pan != panel) {
					acc[j].classList.remove("active");
					pan.style.maxHeight = null;
				}
			}
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}

	//document.getElementById("countrylist-button").addEventListener("click", onClickCountry);

	//document.getElementById("seo-button").addEventListener("click", onClickSeo);

	
});


function onCalcClick() {
	$(".calc-all").is(":hidden") ? ($(".calc-all").slideDown(), $(this).addClass("replace_header_arrow"), $(".menu_msg").slideUp(), $(".menu_call").slideUp(), $(".menu").slideUp()) : ($(".calc-all").slideUp())
	var e = document.getElementById("calcform-body")
		if (e) e.scrollIntoView();
	var e = document.getElementById("calcform-top").scrollIntoView();
		if (e) e.scrollIntoView();
	

}

function onMailClick() {
	document.getElementById("form_message").scrollIntoView();

}
function onMailClick() {
	document.getElementById("form_message").scrollIntoView();

}
function onClickSeo() {
	document.getElementById("seo-button").style.display = "none";
//	var sh = document.getElementById("seo-hidden");
//	sh.style.display = "block";

$( "#seo-hidden" ).show();

}

function onClickCountry() {
	var element = document.getElementById("countrylist-mini");
	element.classList.add("countrylist-mobhide");
	var element = document.getElementById("countrylist-all");
	element.classList.remove("countrylist-mobhide");
	element.scrollIntoView();
}

// send form
function sendForm() {

	event.preventDefault();
	$('#result').toggle().html('');
	$('#preloader').toggle();

	var countNumTel = $('#form_costing input[name="tel"]').attr('placeholder').replace(/\s|(-)|( )/gi, '').length;
	var countNumTelCode = $('#form_costing .selected-dial-code').text().length;
	var minCountTel = countNumTel + countNumTelCode;

	var dataform = new FormData();
	dataform.append('date', $('#form_costing [name="date"]').val());
	dataform.append('from_country', $('#form_costing [name="from_country"]').val());
	dataform.append('from_town', $('#form_costing [name="from_town"]').val());
	dataform.append('to_country', $('#form_costing [name="to_country"]').val());
	dataform.append('to_town', $('#form_costing [name="to_town"]').val());
	dataform.append('name_cargo', $('#form_costing [name="name_cargo"]').val());
	dataform.append('name_client', $('#form_costing [name="name_client"]').val());
	dataform.append('email', $('#form_costing [name="email"]').val());
	dataform.append('min_count_tel', minCountTel);

	if ($('#form_costing [name="tel"]').val().length > 0) {
		var formatTel = $('#form_costing .selected-dial-code').text() + $('#form_costing [name="tel"]').val();
		dataform.append('tel', formatTel);
	}

	dataform.append('packaging', $('#form_costing [name="packaging"]').val());

	if ($('#form_costing [name="delivery"]').is(':checked')) {
		dataform.append('delivery', $('#form_costing [name="delivery"]:checked').val());
	}

	if ($('#form_costing [name="tir"]').is(':checked')) {
		dataform.append('tir', $('#form_costing [name="tir"]:checked').val());
	}

	if ($('#form_costing [name="trans"]').is(':checked')) {
		dataform.append('trans', $('#form_costing [name="trans"]:checked').val());
	}

	if ($('#form_costing [name="load"]').is(':checked')) {
		var arr_load = new Array();

		$('#form_costing [name="load"]:checked').each(function () {
			arr_load.push($(this).val());
		});

		var str_load = arr_load.join(', ');
		dataform.append('load', str_load);
	}

	dataform.append('temp_c', $('#form_costing [name="temp_c"]').val());
	dataform.append('comment', $('#form_costing [name="comment"]').val());
	dataform.append('file', $('#form_costing [name="file"]')[0].files[0]);

	$.ajax({
		url: sitename + "/assets/form.php",
		type: "POST",
		dataType: "html",
		data: dataform,
		processData: false,
		contentType: false,
		success: function (response) {
			$('#result').toggle();
			$('#preloader').toggle();
			$('body,html').animate({ scrollTop: 0 }, 500);
			$('#result').html(response);
			$('.sidebar-form').slideDown();
			if ($('p').is('.result_ok')) {
				$('#button_form').trigger('click');
				$('#form_costing').trigger('reset').fadeOut();
				//$('#result').next('p').fadeOut();
			}
		}
	});
}


function sendMessageForm() {

	event.preventDefault();
	$('#result_message').toggle().html('');
	$('#preloader').toggle();


	var dataform = new FormData();
	dataform.append('name', $('#form_message [name="name"]').val());
	dataform.append('tele', $('#form_message [name="tele"]').val());
	dataform.append('eml', $('#form_message [name="emal"]').val());
	dataform.append('message', $('#form_message [name="message"]').val());
	dataform.append('file', $('#form_message [name="file"]')[0].files[0]);




	$.ajax({
		url: sitename + "/assets/form_message.php",
		type: "POST",
		dataType: "html",
		data: dataform,
		processData: false,
		contentType: false,
		success: function (response) {
			$('#result_message').toggle();
			$('#preloader').toggle();
			$('body,html').animate({ scrollTop: 0 }, 500);
			$('#result_message').html(response);
			if ($('p').is('.result_ok')) {
				//$('#button_form').trigger('click');
				$('#form_message').trigger('reset').fadeOut();
				//$('#result').next('p').fadeOut();
			}
		}
	});
}

// обратный звонок
function sendCallBack() {
	event.preventDefault();
    $('.call_back_block #result').toggle().html('');
    $('.call_back_block #preloader').toggle();
	
	var countNumTel = $('#form_call_back input[name="tel"]').attr('placeholder').replace(/\s|(-)|( )/gi, '').length;
	var minCountTel = countNumTel;

    $.ajax({
        url: sitename +'/assets/call_back.php',
        type: 'POST',
		data: $('#form_call_back').serialize()+'&telcode='+$('#form_call_back .selected-dial-code').text()+'&min_count_tel='+minCountTel,
        success: function(response) {
            $('.call_back_block #result').toggle();
            $('.call_back_block #preloader').toggle();
			$('.call_back_block #result').html(response);
			
			if ($('p').is('.result_ok')){
				$('#form_call_back').trigger('reset');
			}
        }
    });
}

// новая форма расчета стоимости
function showContact(){
	$.confirm({
		title: 'Контактные данные',
		boxWidth: '270px',
		useBootstrap: false,
		type: 'green',
		closeIcon: true,
		content: 'url://transwest.eu/includes/popform.html',
		buttons: {
			'рассчитать цену': {
				action: function () {
					var input_name = $('#newform_calc_contact [name="visitor"]').val();
					var input_tel = $('#newform_calc_contact [name="tel"]').val();	
					var countNumTel = $('#newform_calc_contact input[name="tel"]').attr('placeholder').replace(/\s|(-)|( )/gi, '').length;
					
					if (!input_name || !input_tel) {
						$.alert({
							content: 'Пожалуйста укажите Ваше Имя и телефон',
							type: 'red',
							title: false,
							useBootstrap: false,
							boxWidth: '270px',
						});
						
						return false;
					}

 					else if (input_tel.length < countNumTel) {
						$.alert({
							content: 'Пожалуйста укажите правильный номер телефона',
							type: 'red',
							title: false,
							useBootstrap: false,
							boxWidth: '270px',
						});
						
						return false;
					} 
					
					else {
						newFormSend();
					}					
				}
			},
			'закрыть': {
				action: function () {}
			}
		}
	});
}


function newFormSend() {
	event.preventDefault();

	var dataform = new FormData();
    dataform.append('visitor', $('#newform_calc_contact [name="visitor"]').val());
    dataform.append('tel', $('#newform_calc_contact .selected-dial-code').text()+$('#newform_calc_contact [name="tel"]').val());
    dataform.append('email', $('#newform_calc_contact [name="email"]').val());
    dataform.append('volume', $('#form_newcalc [name="volume"]').val());
    dataform.append('weight', $('#form_newcalc [name="weight"]').val());
    dataform.append('loading', $('#form_newcalc [name="loading"]').val());
    dataform.append('execution', $('#form_newcalc [name="execution"]').val());
	
    dataform.append('fromCity', $('#form_newcalc [name="fromCity"]').val());
    dataform.append('toCity', $('#form_newcalc [name="toCity"]').val());
	
    if ($('#form_newcalc [name="packing"]').is(':checked')) {
        dataform.append('packing', $('#form_newcalc [name="packing"]:checked').val());
    } 

	if ($('#form_newcalc [name="urgency"]').is(':checked')) {
        dataform.append('urgency', $('#form_newcalc [name="urgency"]:checked').val());
    }
	
    if ($('#form_newcalc [name="goods"]').is(':checked')) {
        var arr_goods = new Array();
        
		$('#form_newcalc [name="goods"]:checked').each(function() {
            arr_goods.push($(this).val());
        });
		
        var arr_goods = arr_goods.join(', ');
        dataform.append('goods', arr_goods);
    }

    $.ajax({
        url: sitename +"/assets/newform.php",
        type: "POST",
        data: dataform,
		processData: false,
        contentType: false,
        success: function(response) {
			$('#result_newform').html(response);
			
			$.alert({
				title: 'Расчет стоимости',
				boxWidth: '270px',
				useBootstrap: false,
				type: 'green',
				content: response,
				closeIcon: true,
				buttons: {
					'ok': {
						action: function () {
							$('#form_newcalc').trigger('reset');
							$('#newform_calc_contact').trigger('reset');
						}
					}
				}
			});
        }
    });
}

// оценка новостей 
function ratingNews(param, id) {
    $.ajax({
        url: sitename +'/assets/rating_news.php',
        type: 'POST',
		data: {
			'param': param,
			'id': id,
		},
        success: function(response) {	
			if (response == 'error') {
				$.alert({
					title: false,
					boxWidth: '270px',
					useBootstrap: false,
					type: 'red',
					content: '<div style="text-align:center">Вы уже выставили свою оценку для данной новости!</div>',
					closeIcon: true,
				});
			}
			
			else {
				$('.'+param+'_public i[data-id="'+id+'"]').text(response);				
			}
        }
    });
}
