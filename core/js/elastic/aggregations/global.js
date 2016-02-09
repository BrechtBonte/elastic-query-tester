// Global Aggregation
function GlobalAggregation()
{
	var _name,
		_aggregations = [];

	this.getType = function()
	{
		return 'aggregation';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Global Aggregation',
			'text': 'The Global Aggregation cancels the effect of all filters for it\'s nested aggregations',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/1.5/search-aggregations-bucket-global-aggregation.html',
			'form': {
				'name': {
					'type': 'text',
					'required': true,
					'value': _name
				}
			}
		};
	};

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'name':
				_name = value;
				break;
		}
	};

	this.getNestings = function()
	{
		return {
			'aggregations': {
				'type': 'aggregation',
				'multiple': true
			}
		};
	};

	this.addNesting = function(name, part)
	{
		if (name == 'aggregations') {
			_aggregations.push(part);
		}
	};

	this.removeNesting = function(name, part)
	{
		if (name == 'aggregations') {
			var index = _aggregations.indexOf(part);
			if (index > -1) {
				_aggregations.splice(index, 1);
			}
		}
	};

	this.isSetUp = function()
	{
		return typeof(_name) != 'undefined';
	};

	this.canRun = function()
	{
		var allOk = this.isSetUp();

		for (var i = 0; i < _aggregations.length; i++) {
			if (!_aggregations[ i ].canRun()) {
				return false;
			}
		}

		return allOk;
	};

	this.getName = function()
	{
		return _name;
	};

	this.toJson = function()
	{
		var jsonObject = {
			"global": {}
		};

		if (_aggregations.length > 0) {
			jsonObject.aggregations = {};

			for (var i = 0; i < _aggregations.length; i++) {
				jsonObject.aggregations[ _aggregations[i].getName() ] = _aggregations[i].toJson();
			}
		}

		return jsonObject;
	}
}
