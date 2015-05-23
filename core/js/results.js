// Handling querying + showing results
$(document).ready(function() {

	var runBtn = $('#run-btn'),
		hostInput = $('#host-input'),
		indexSelect = $('#index-select'),
		typeSelect = $('#type-select');

	runBtn.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		var query = runBtn.data('query'),
			url = hostInput.val() + '/' + indexSelect.val() + '/' + typeSelect.val() + '/_search';

		var http = new XMLHttpRequest();
		http.open("GET", url);
		http.onreadystatechange = function() {
			if (this.readyState == this.DONE) {
				console.log(http.responseText);
			}
		};
		http.send(query);
	});
});