var links = $('.form-control');
    	links.on('focusout', function() {
    		var val = $(this).val();
    		if(val !== '') {
    			$(this).next().addClass('move-up');
    		}else{
    			$(this).next().removeClass('move-up');
    		}
    	});
  

	////////////////////// Contact form validation ////////////////////////////

	var inputs = $('form#contact-me div.inputs input,form#contact-me div.message-area textarea ');

	inputs.on('focusout', function(){
		var inputVal = $(this).val();

		if(inputVal === '') {
			$(this).removeClass('has-class');
		}else{
			$(this).addClass('has-class');
		}

	});
	
var form = $('form#contact-me-form'),
	nameInput = form.find('input#name'),
	emailInput = form.find('input#email'),
	textArea = form.find('textarea#message'),
	submit = form.find('button[type="submit"]'),
	responseDiv = $('div.response'),
	toShowForm = $('div.toShowForm'),
	url, method, dataString, name, email, message;

	submit.on('click', function() {
			name = nameInput.val(),
			email = emailInput.val(),
			message = textArea.val(),
			url = form.attr('action'),
			type = form.attr('method'),
			display = $('div#contact').find('div.messageDisplay'),
			emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;


			var error = false;
			$('.errors').remove();
			 
			if (!name) {

				$('div#divforName').after('<span class="errors">Please fill in your name!</span>');
				error = true;
				nameInput.focus();

			}
			if(!email) {
				$('div#divforEmail').after('<span class="errors">Please fill in your email!</span>');
				error = true;
				nameInput.focus();

			}else if(!emailReg.test(email)) {
				$('div#divforEmail').after('<span class="errors">Please fill in the correct email!</span>');
				error = true;
				emailInput.focus();
			}
			if(!message) {
				$('div#divforMessage').after('<span class="errors" id="errorForMessage">Please fill in your message!</span>');
				error = true;
				submit.css('margin-top', '12px');

			}
			if(error === true) {
				return false;
			}
			else {
				error = false;		
				form.fadeOut('slow');
				responseDiv.fadeIn('slow').text('Sending...');
				var data = form.serialize();
				// ajax request
				$.ajax({
				type : 'POST',
				url : 'php/contact-me.php',
				data : data,		
				}).
					done(function(data) {
				responseDiv.removeClass('toError').addClass('toSuccess');
    			$('<img src="images/tick.png" alt="tick" class="tick">').insertBefore($('div.response'));
				responseDiv.text(data);
				toShowForm.fadeIn('slow');
				$('#name').val('');
   				$('#email').val('');
   				$('#message').val('');
				}).
					fail(function(data) {
				responseDiv.removeClass('toSuccess').addClass('toError');
				if (data.responseText !== '') {
        			responseDiv.text(data.responseText);
    			} else {
        			responseDiv.text('Oops! An error occured and your message could not be sent.');
  							  }

							});

			}
			return false;
			
		});
	
	// reshow the form
	toShowForm.on('click', function() {
		var tick = $('img.tick');
		form.fadeIn('slow');
		inputs.removeClass('has-class');
		$(responseDiv.selector+','+tick.selector+','+toShowForm.selector).fadeOut();
		inputs.removeClass('has-class');

		

	});
