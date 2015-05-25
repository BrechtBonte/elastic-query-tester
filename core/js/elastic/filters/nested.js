// Nested Filter
function NestedFilter()
{
	var _path,
		_filter;

	this.getType = function()
	{
		return 'filter';
	}

	this.getInfo = function()
	{
		return {
			'name': 'Nested Filter',
			'text': 'The Newted Filter is necessary for filtering fields from nested objects',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-filter.html',
			'form': {
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
			case 'path':
				_path = value;
				break;
		}
	}

	this.addNesting = function(name, part)
	{
		if (name == 'filter') {
			_filter = part;
		}
	}

	this.removeNesting = function(name, part)
	{
		if (name == 'filter' && part == _filter) {
			_filter = null;
		}
	}

	this.getNestings = function()
	{
		return {
			'filter': {
				'type': 'filter',
				'multiple': false
			}
		};
	}

	this.isSetUp = function()
	{
		return _path && _filter;
	}

	this.canRun = function()
	{
		return this.isSetUp() && _filter && _filter.canRun();
	}

	this.toJson = function()
	{
		var jsonObject = {
			"nested": {
				"path": _path,
				"filter": _filter.toJson()
			}
		};

		return jsonObject;
	}
}