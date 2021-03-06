// handle query building
$(document).ready(function() {

	var blocks = {
		'query': {
			'Bool': 'BoolQuery',
			'Common': 'CommonQuery',
			'Exists': 'ExistsQuery',
			'Fuzzy': 'FuzzyQuery',
			'HasChild': 'HasChildQuery',
			'HasParent': 'HasParentQuery',
			'Ids': 'IdsQuery',
			'Match': 'MatchQuery',
			'Match All': 'MatchAllQuery',
			'Multi Match': 'MultiMatchQuery',
			'Nested': 'NestedQuery',
			'Prefix': 'PrefixQuery',
			'Range': 'RangeQuery',
			'Regexp': 'RegexpQuery',
			'Term': 'TermQuery',
			'Type': 'TypeQuery',
			'Wildcard': 'WildcardQuery'
		},
		'aggregation': {
			'Avg': 'AvgAggregation',
			'Filter': 'FilterAggregation',
			'Filters': 'FiltersAggregation',
			'Global': 'GlobalAggregation',
			'Max': 'MaxAggregation',
			'Min': 'MinAggregation',
			'Missing': 'MissingAggregation',
			'Nested': 'NestedAggregation',
			'Reverse Nested': 'ReverseNestedAggregation',
			'Stats': 'StatsAggregation',
			'Sum': 'SumAggregation',
			'Terms': 'TermsAggregation',
			'Value Count': 'ValueCountAggregation'
		}
	};

	var mainQueryBlock = $("#main-query"),
		runBtn = $('#run-btn');
	var mainQuery = new MainQuery();
	mainQueryBlock.data('part', mainQuery);

	
	var updateRunBtn = function()
	{
		if (mainQuery.canRun()) {
			runBtn.removeClass('disabled');
			runBtn.attr('title', '');
			runBtn.data('query', mainQuery.toJson());
		} else {
			runBtn.addClass('disabled');
			runBtn.attr('title', 'Query is incomplete, check blocks with red borders');
		}
	};
	updateRunBtn();

	// inintializing nested selects
	var initSelect = function(select) {
		var type = select.data('type');

		select.append('<option disabled>─────</option>');
		$.each(blocks[ type ], function(name, className) {
			select.append('<option value="' + className + '">' + name + '</option>');
		});
	};
	$.each($('.nesting-select'), function() {
		initSelect($(this));
	});


	// handle form submit
	var formFieldsContainer = $('#fields-container'),
		blockForm = formFieldsContainer.closest('form'),
		formFeedback = $('#form-feedback');

	blockForm.on('submit', function(e) {
		e.preventDefault();

		var selectedBlock = $('.query-block.selected'),
			selectedPart = selectedBlock.data('part'),
			inputs = blockForm.find('.field-inp');

		$.each(inputs, function(i, input) {

			input = $(input);
			var name = input.attr('name'),
				value = input.val() === '' ? undefined : input.val();

			if (input.is('.checkbox-inp')) {
				value = input.is(':checked');
			}
			selectedPart.updateField(name, value);
		});

		if (selectedPart.isSetUp()) {
			selectedBlock.removeClass('incomplete');
		} else {
			selectedBlock.addClass('incomplete');
		}
		updateRunBtn();

		if (formFeedback.css('display') == 'none') {
			formFeedback.slideDown();
		}
		formFeedback.delay(1000).slideUp();
	});


	// listener for selecting blocks
	var infoTitle = $('#info-title'),
		formContainer = $('#form-container'),
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
						if (field.info) {
							fieldHtml =
								'<div class="input-group">' +
									'<input type="text" class="form-control field-inp" id="'+name+'-inp" placeholder="'+name+'" value="'+value+'" name="'+name+'" />' +
									'<div class="input-group-addon">' + field.info + '</div>' +
								'</div>';
						} else {
							fieldHtml = '<input type="text" class="form-control field-inp" id="' + name + '-inp" placeholder="' + name + '" value="' + value + '" name="' + name + '" />';
						}
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
	};

	var selectBlock = function(block)
	{
		var part = block.data('part');
		formFeedback.hide();

		$('.query-block').removeClass('selected');
		block.addClass('selected');

		loadInfoForPart(part);
	};

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

		var block = $('<div>').addClass('query-block').addClass('type-' + part.getType());
		block.append('<h2>' + part.getInfo().name + '<button class="close" type="button">×</button></h2>');

		if (!$.isEmptyObject(part.getNestings())) {
			$.each(part.getNestings(), function(name, info) {

				var nestingBlock = $('<div class="nesting form-inline">');
				nestingBlock.append('<p class="nesting-name">' + name + '</p>');

				var nestingSelect = $('<select class="nesting-select form-control">');
				var optionText = 'add a';
				if (['a', 'e', 'i', 'o', 'u'].indexOf(info.type.substring(0,1)) > -1) {
					optionText += 'n';
				}
				nestingSelect.append('<option value="">'+optionText+' ' + info.type + '</option>');
				nestingSelect.data('type', info.type);
				nestingSelect.data('name', name);
				nestingSelect.data('multiple', info.multiple);
				initSelect(nestingSelect);

				nestingBlock.append(nestingSelect);
				block.append(nestingBlock);
			});
		}

		if (!part.isSetUp()) {
			block.addClass('incomplete');
		}
		block.data('part', part);
		return block;
	};

	mainQueryBlock.on('change', '.nesting-select', function() {
		var select = $(this),
			nestingName = select.data('name'),
			allowsMultiple = select.data('multiple'),
			className = select.val(),
			parentBlock = select.closest('.query-block'),
			parentPart = parentBlock.data('part');

		var block = createBlockForClassName(className);
		var part = block.data('part');
		select.before( block );

		parentPart.addNesting(nestingName, part);
		if (parentPart.isSetUp()) {
			parentBlock.removeClass('incomplete');
		} else {
			parentBlock.addClass('incomplete');
		}
		updateRunBtn();
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
		if (parentPart.isSetUp()) {
			parentBlock.removeClass('incomplete');
		} else {
			parentBlock.addClass('incomplete');
		}
		updateRunBtn();
		nestingSelect.show();
		selectBlock(parentBlock);
	});
});
