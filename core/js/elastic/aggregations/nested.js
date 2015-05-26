// Nested Aggregation
function NestedAggregation()
{
	var _name,
		_path,
		_aggregations = [];

	this.getType = function()
	{
		return 'aggregation';
	}

	this.getInfo = function()
	{
		return {
			'name': 'Nested Aggregation',
			'text': 'The Nested Aggregation allows you to aggregate on nested objects',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/1.5/search-aggregations-bucket-nested-aggregation.html',
			'form': {
				'name': {
					'type': 'text',
					'required': true,
					'value': _name
				},
				'path': {
					'type': 'text',
					'required': true,
					'value': _path
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
			case 'path':
				_path = value;
				break;
		}
	}

	this.getNestings = function()
	{
		return {
			'aggregations': {
				'type': 'aggregation',
				'multiple': true
			}
		};
	}

	this.addNesting = function(name, part)
	{
		if (name == 'aggregations') {
			_aggregations.push(part);
		}
	}

	this.removeNesting = function(name, part)
	{
		if (name == 'aggregations') {
			var index = _aggregations.indexOf(part);
			if (index > -1) {
				_aggregations.splice(index, 1);
			}
		}
	}

	this.isSetUp = function()
	{
		return _name && _path;
	}

	this.canRun = function()
	{
		var allOk = this.isSetUp();

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
			"nested": {
				"path": _path
			}
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