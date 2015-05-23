// Handling querying + showing results
$(document).ready(function() {

	var runBtn = $('#run-btn'),
		hostInput = $('#host-input'),
		indexSelect = $('#index-select'),
		typeSelect = $('#type-select'),
		resultModal = $('#result-modal');

	var activevTabLink = resultModal.find('.nav-tabs .active a'),
		requestPre = $('#query-request pre'),
		responsePre = $('#query-response pre');

	runBtn.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		var query = runBtn.data('query'),
			url = hostInput.val() + '/' + indexSelect.val() + '/' + typeSelect.val() + '/_search';

		var http = new XMLHttpRequest();
		http.open("GET", url);
		http.onreadystatechange = function() {
			if (this.readyState == this.DONE) {

				requestPre.html(query);
				responsePre.html(http.responseText);
				activevTabLink.tab('show');

				resultModal.modal('show');
			}
		};
		http.send(query);
	});
});