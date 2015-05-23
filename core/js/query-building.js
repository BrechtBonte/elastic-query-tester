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
	var mainQueryBlock = $("#main-query"),
		formTitle = $("#form-title"),
		blockForm = $("#block-form");

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


	// listener for adding new blocks
	var createBlockForClassName = function(className)
	{	
		var partConstructor = window[className];
		var part = new partConstructor();

		var block = $('<div>').addClass('query-block');
		block.append('<h2>' + className + '<button class="close" type="button">×</button></h2>');

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
			parentPart = block.parent().closest('.query-block').data('part'),
			nestingSelect = block.closest('.nesting').children('.nesting-select'),
			nestingName = nestingSelect.data('name');

		block.remove();
		parentPart.removeNesting(nestingName, part);
		nestingSelect.show();
	});

});