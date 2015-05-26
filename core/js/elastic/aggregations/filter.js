// Filter Aggregation
function FilterAggregation()
{
	var _name,
		_filter,
		_aggregations = [];

	this.getType = function()
	{
		return 'aggregation';
	}

	this.getInfo = function()
	{
		return {
			'name': 'Filter Aggregation',
			'text': 'The Filter Aggregation applies a filter to the nested aggregations',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/1.5/search-aggregations-bucket-filter-aggregation.html',
			'form': {
				'name': {
					'type': 'text',
					'required': true,
					'value': _name
				}
			}
		};
	}

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'name':
				_name = value;
				break;
		}
	}

	this.getNestings = function()
	{
		return {
			'filter': {
				'type': 'filter',
				'multiple': false
			},
			'aggregations': {
				'type': 'aggregation',
				'multiple': true
			}
		};
	}

	this.addNesting = function(name, part)
	{
		if (name == 'filter') {
			_filter = part;
		}
		if (name == 'aggregations') {
			_aggregations.push(part);
		}
	}

	this.removeNesting = function(name, part)
	{
		if (name == 'filter' && _filter == part) {
			_filter = undefined;
		}
		if (name == 'aggregations') {
			var index = _aggregations.indexOf(part);
			if (index > -1) {
				_aggregations.splice(index, 1);
			}
		}
	}

	this.isSetUp = function()
	{
		return _name && _filter;
	}

	this.canRun = function()
	{
		var allOk = this.isSetUp() && _filter && _filter.canRun();

		for (var i = 0; i < _aggregations.length; i++) {
			if (!_aggregations[ i ].canRun()) {
				return false;
			}
		}

		return allOk;
	}

	this.getName = function()
	{
		return _name;
	}

	this.toJson = function()
	{
		var jsonObject = {
			"filter": _filter.toJson()
		}

		if (_aggregations.length > 0) {
			jsonObject.aggregations = {};

			for (var i = 0; i < _aggregations.length; i++) {
				jsonObject.aggregations[ _aggregations[i].getName() ] = _aggregations[i].toJson();
			}
		}

		return jsonObject;
	}
}