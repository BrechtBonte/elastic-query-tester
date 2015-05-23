// Main query
function MainQuery()
{
	var _query;

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
		return typeof(_query) != 'undefined';
	}

	this.toJson = function()
	{
		var jsonObject = {
			"query": _query.toJson()
		};

		return JSON.stringify(jsonObject);
	}
}