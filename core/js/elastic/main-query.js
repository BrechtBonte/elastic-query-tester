// Main query
function MainQuery()
{
	var _query,
		_aggregations = [],
		_size = 10;

	this.getInfo = function()
	{
		return {
			'name': 'Main Query',
			'text': 'This is the main query, it all starts from here',
			'form': {
				'result limit': {
					'type': 'text',
					'required': true,
					'value': _size
				}
			}
		};
	};

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'result limit':
				_size = value;
				break;
		}
	};

	this.addNesting = function(name, part)
	{
		switch (name) {
			case 'query':
				_query = part;
				break;
			case 'aggregations':
				_aggregations.push(part);
				break;
		}
	};

	this.removeNesting = function(name, part)
	{
		switch (name) {
			case 'query':
				if (part == _query) _query = undefined;
				break;
			case 'aggregations':
				var index = _aggregations.indexOf(part);
				if (index > -1) {
					_aggregations.splice(index, 1);
				}
				break;
		}
	};

	this.getNestings = function()
	{
		return {
			'query': {
				'type': 'query',
				'multiple': false
			},
			'aggregations': {
				'type': 'aggregation',
				'multiple': true
			}
		};
	};

	this.isSetUp = function()
	{
		return  typeof(_query) != 'undefined' && typeof(_size) != 'undefined';
	};

	this.canRun = function()
	{
		var allOk = this.isSetUp() && _query.canRun();

		for (var i = 0; i < _aggregations.length; i++) {
			if (!_aggregations[ i ].canRun()) {
				return false;
			}
		}

		return allOk;
	};

	this.toJson = function()
	{
		var jsonObject;

		var aggregationObject = {};
		for (var i = 0; i < _aggregations.length; i++) {
			aggregationObject[ _aggregations[i].getName() ] = _aggregations[i].toJson();
		}

		if (typeof(_query) != 'undefined') {
			jsonObject = {
				"from": 0,
				"size": _size,
				"query": _query.toJson()
			};
			if (_aggregations.length > 0) {
				jsonObject.aggregations = aggregationObject;
			}
		} else {
			jsonObject = {
				"size": 0,
				"aggregations": aggregationObject
			};
		}

		return JSON.stringify(jsonObject);
	}
}
