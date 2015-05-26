// Not Filter
function NotFilter()
{
	var _filter;

	this.getType = function()
	{
		return 'filter';
	}

	this.getInfo = function()
	{
		return {
			'name': 'Not Filter',
			'text': 'The Not Filter negates it\'s nested filter',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-not-filter.html'
		}
	}

	this.getNestings = function()
	{
		return {
			'filters': {
				'type': 'filter',
				'multiple': false
			}
		};
	}

	this.addNesting = function(name, part)
	{
		if (name == 'filter') {;
			_filter = part
		}
	}

	this.removeNesting = function(name, part)
	{
		if (name == 'filters' && _filter == part) {
			_filter = undefined;
		}
	}

	this.isSetUp = function()
	{
		return typeof(_filter) != 'undefined';
	}

	this.canRun = function()
	{
		return this.isSetUp() && _filter && _filter.canRun();
	}

	this.toJson = function()
	{
		var jsonObject = {
			"not": _filter.toJson()
		};

		return jsonObject;
	}
}