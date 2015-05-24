// Main query
function MainQuery()
{
	var _query,
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
		if (name == 'query') {
			_query = part;
		}
	}

	this.removeNesting = function(name, part)
	{
		if (name == 'query' && part == _query) {
			_query = null;
		}
	}

	this.getNestings = function()
	{
		return {
			'query': {
				'type': 'query',
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
			"size": _size,
			"query": _query.toJson()
		};

		return JSON.stringify(jsonObject);
	}
}