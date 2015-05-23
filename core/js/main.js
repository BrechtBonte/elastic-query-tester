// Main file
$(document).ready(function() {

	var mainNav = $('#main-nav'),
		mainContainer = $('#main-container'),
		hostForm = $('#host-form'),
		hostInput = $('#host-input'),
		indexSelect = $('#index-select');


	hostForm.on('submit', function(e) {
		e.preventDefault();

		if (hostInput.val()) {
			hostForm.find('input, button').prop('disabled', true);

			var url = hostInput.val() + '/?hello=elasticsearch';
			var http = new XMLHttpRequest();
			http.open('HEAD', url);
			http.onreadystatechange = function() {
				if (this.readyState == this.DONE) {
					if (this.status == 200) {
						// all is well

						$.ajax({
							url: hostInput.val() + '/_aliases',
							method: 'GET',
							dataType: 'json',
							success: function(data) {
								indexSelect.empty();
								$.each(data, function(indexName) {
									indexSelect.append('<option>' + indexName + '</option>');
								});
								indexSelect.show();
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
});