// Main query
function MainQuery()
{
	var _query,
		_filter,
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
	}

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'result limit':
				_size = value;
				break;
		}
	}

	this.addNesting = function(name, part)
	{
		switch (name) {
			case 'query':
				_query = part;
				break;
			case 'filter':
				_filter = part;
				break;
		}
	}

	this.removeNesting = function(name, part)
	{
		switch (name) {
			case 'query':
				if (part == _query) _query = null;
				break;
			case 'filter':
				if (part == _filter) _filter = null;
				break;
		}
	}

	this.getNestings = function()
	{
		return {
			'query': {
				'type': 'query',
				'multiple': false
			},
			'filter': {
				'type': 'filter',
				'multiple': false
			}
		};
	}

	this.isSetUp = function()
	{
		return typeof(_query) != 'undefined' && typeof(_size) != 'undefined';
	}

	this.canRun = function()
	{
		return this.isSetUp() && _query && _query.canRun();
	}

	this.toJson = function()
	{
		var jsonObject = {
			"from": 0,
			"size": _size,
			"query": _query.toJson()
		};
		if (_filter) {
			jsonObject.query = {
				"filtered": {
					"query": _query.toJson(),
					"filter": _filter.toJson()
				}
			};
		}

		return JSON.stringify(jsonObject);
	}
}