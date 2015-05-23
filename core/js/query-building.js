// handle query building
$(document).ready(function() {

	var blocks = {
		'query': {
			'Bool': 'BoolQuery',
			'Nested': 'NestedQuery',
			'Range': 'RangeQuery',
			'Term': 'TermQuery'
		}
	}

	// get base blocks
	var mainQueryBlock = $("#main-query");
	var mainQuery = new MainQuery();
	mainQueryBlock.data('part', mainQuery);

	
	// inintializing nested selects
	var initSelect = function(select) {
		var type = select.data('type');

		select.append('<option disabled>─────</option>');
		$.each(blocks[ type ], function(name, className) {
			select.append('<option value="' + className + '">' + name + '</option>');
		});
	}
	$.each($('.nesting-select'), function() {
		initSelect($(this));
	});


	// listener for selecting blocks
	var infoTitle = $('#info-title'),
		formContainer = $('#form-container'),
		formFieldsContainer = $('#fields-container'),
		infoBlock = $('#info-block'),
		infoTextContainer = $('#info-text-container'),
		urlBlock = $('#url-block'),
		urlContainer = $('#url-container');

	var loadInfoForPart = function(part)
	{
		var info = part.getInfo();

		infoTitle.html(info.name);
		
		if (info.text) {
			infoTextContainer.html(info.text);
			infoBlock.show();
		} else {
			infoBlock.hide();
		}

		if (info.url) {
			urlContainer.html('<a href="' + info.url + '" target="_blank">More info</a>');
			urlBlock.show();
		} else {
			urlBlock.hide();
		}

		if (info.form) {
			formFieldsContainer.empty();
			$.each(info.form, function (name, field) {
				var fieldHtml = '';
				var value = typeof(field.value) == 'undefined' ? '' : field.value;

				switch(field.type) {
					case 'text':
						fieldHtml = '<input type="text" class="form-control field-inp" id="'+name+'-inp" placeholder="'+name+'" value="'+value+'" name="'+name+'" />';
						break;
					case 'bool':
						fieldHtml = '<div class="checkbox"><label><input type="checkbox" class="field-inp checkbox-inp" name="'+name+'"'+(value ? ' checked="checked"' : '')+' /></label></div>'
						break;
					case 'dropdown':
						fieldHtml = '<select class="form-control field-inp">';
						$.each(field.options, function(i, option) {
							fieldHtml += '<option'+(value == option ? ' selected="selected"' : '')+'>' + option + '</option>';
						});
						fieldHtml += '</select>';
						break;
				}
				var label = name;
				if (field.required) {
					label += ' *';
				}

				formFieldsContainer.append('<div class="form-group">');
				formFieldsContainer.append('<label for="'+name+'-inp" class="control-label">'+label+'</label>');
				formFieldsContainer.append(fieldHtml);
				formFieldsContainer.append('</div>');
			});
			formContainer.show();
		} else {
			formContainer.hide();
		}
	}

	var selectBlock = function(block)
	{
		var part = block.data('part');

		$('.query-block').removeClass('selected');
		block.addClass('selected');

		loadInfoForPart(part);
	}

	$('#query-tab').on('click', '.query-block', function(e) {
		e.preventDefault();
		e.stopPropagation();

		selectBlock($(this));
	});
	selectBlock(mainQueryBlock);


	// listener for adding new blocks
	var createBlockForClassName = function(className)
	{	
		var partConstructor = window[className];
		var part = new partConstructor();

		var block = $('<div>').addClass('query-block');
		block.append('<h2>' + part.getInfo().name + '<button class="close" type="button">×</button></h2>');

		if (!$.isEmptyObject(part.getNestings())) {
			$.each(part.getNestings(), function(name, info) {

				var nestingBlock = $('<div class="nesting form-inline">');
				nestingBlock.append('<p class="nesting-name">' + name + '</p>');

				var nestingSelect = $('<select class="nesting-select form-control">');
				nestingSelect.append('<option value="">add a ' + info.type + '</option>');
				nestingSelect.data('type', info.type);
				nestingSelect.data('name', name);
				nestingSelect.data('multiple', info.multiple);
				initSelect(nestingSelect);

				nestingBlock.append(nestingSelect);
				block.append(nestingBlock);
			});
		}

		block.data('part', part);
		return block;
	}

	mainQueryBlock.on('change', '.nesting-select', function() {
		var select = $(this),
			nestingName = select.data('name'),
			allowsMultiple = select.data('multiple'),
			className = select.val(),
			parentPart = select.closest('.query-block').data('part');

		var block = createBlockForClassName(className);
		var part = block.data('part');
		select.before( block );

		parentPart.addNesting(nestingName, part);
		selectBlock(block);

		// reset
		select.val('');
		if (!allowsMultiple) {
			select.hide();
		}
	});


	// listener for removing blocks
	mainQueryBlock.on('click', '.close', function(e) {
		e.preventDefault();

		var block = $(this).closest('.query-block'),
			part = block.data('part'),
			parentBlock = block.parent().closest('.query-block'),
			parentPart = parentBlock.data('part'),
			nestingSelect = block.closest('.nesting').children('.nesting-select'),
			nestingName = nestingSelect.data('name');

		block.remove();
		parentPart.removeNesting(nestingName, part);
		nestingSelect.show();
		selectBlock(parentBlock);
	});


	// handle form submit
	var blockForm = formFieldsContainer.closest('form'),
		formFeedback = $('#form-feedback');
	blockForm.on('submit', function(e) {
		e.preventDefault();

		var selectedPart = mainQueryBlock.find('.query-block.selected').data('part'),
			inputs = blockForm.find('.field-inp');

		$.each(inputs, function(i, input) {

			var input = $(input),
				name = input.attr('name'),
				value = input.val() === '' ? undefined : input.val();

			if (input.is('.checkbox-inp')) {
				vaule = input.is(':checked');
			}
			selectedPart.updateField(name, value);
		});

		if (formFeedback.css('display') == 'none') {
			formFeedback.slideDown();
		}
		formFeedback.delay(1000).slideUp();
	});
});