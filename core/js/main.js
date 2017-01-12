// Main file
$(document).ready(function() {

	var mainNav = $('#main-nav'),
		mainContainer = $('#main-container'),
		hostForm = $('#host-form'),
		hostInput = $('#host-input'),
		indexSelect = $('#index-select'),
		typeSelect = $('#type-select'),
		mappings = {};

	hostInput.focus();

	hostForm.on('submit', function(e) {
		e.preventDefault();

		if (hostInput.val()) {
			hostForm.find('input, button').prop('disabled', true);

			var url = hostInput.val();
			var http = new XMLHttpRequest();
			http.open('GET', url);
			http.onreadystatechange = function() {
				if (this.readyState == this.DONE) {
					if (this.status == 200) {
						// all is well

						$.ajax({
							url: hostInput.val() + '/_all',
							method: 'GET',
							dataType: 'json',
							success: function(data) {

								$.each(data, function(indexName, indexInfo) {
									mappings[ indexName ] = [];
									$.each(indexInfo.mappings, function(typeName) {
										mappings[ indexName ].push(typeName);
									});
								});

								indexSelect.empty();
								typeSelect.empty();

								$.each(mappings, function(indexName) {
									indexSelect.append('<option>' + indexName + '</option>');
								});
								indexSelect.trigger('change');

								indexSelect.show();
								typeSelect.show();
								mainNav.show();
								mainContainer.show();
							}
						});

					} else {
						hostForm.find('input, button').prop('disabled', false);
						alert('could not make contact with elasticsearch');
					}
				}
			};
			http.send();
		}
	});

	indexSelect.on('change', function() {
		var types = mappings[ indexSelect.val() ];

		typeSelect.empty();
		if (typeof(types) != 'undefined') {
			$.each(types, function(i, type) {
				typeSelect.append('<option>' + type + '</option>');
			});
		}
	});
});
