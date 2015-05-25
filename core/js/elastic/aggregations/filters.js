// Filters Aggregation
function FiltersAggregation()
{
	var _name,
		_filters = [],
		_aggregations = [];

	this.getType = function()
	{
		return 'aggregation';
	}

	this.getInfo = function()
	{
		return {
			'name': 'Filters Aggregation',
			'text': 'The Filters Aggregation applies multiple filters to the nested aggregations. A set of buckets will be returned for each filter',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/1.5/search-aggregations-bucket-filters-aggregation.html',
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
			'filters': {
				'type': 'filter',
				'multiple': true
			},
			'aggregations': {
				'type': 'aggregation',
				'multiple': true
			}
		};
	}

	this.addNesting = function(name, part)
	{
		if (name == 'filters') {
			_filters.push(part);
		}
		if (name == 'aggregations') {
			_aggregations.push(part);
		}
	}

	this.removeNesting = function(name, part)
	{
		if (name == 'filters') {
			var filterIndex = _filters.indexOf(part);
			if (filterIndex > -1) {
				_filters.splice(filterIndex, 1);
			}
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
		return _name && _filters.length > 0;
	}

	this.canRun = function()
	{
		var allOk = this.isSetUp();

		for (var i = 0; i < _filters.length; i++) {
			if (!_filters[ i ].canRun()) {
				return false;
			}
		}

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
			"filters": {
				"filters": []
			}
		}

		for (var i = 0; i < _filters.length; i++) {
			jsonObject.filters.filters.push(_filters[i].toJson());
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