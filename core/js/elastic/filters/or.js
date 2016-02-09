// Or Filter
function OrFilter()
{
	var _filters = [];

	this.getType = function()
	{
		return 'filter';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Or Filter',
			'text': 'The Or Filter allows you to optionally combine multiple filters',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-or-filter.html'
		}
	};

	this.getNestings = function()
	{
		return {
			'filters': {
				'type': 'filter',
				'multiple': true
			}
		};
	};

	this.addNesting = function(name, part)
	{
		if (name == 'filters') {
			_filters.push(part);
		}
	};

	this.removeNesting = function(name, part)
	{
		if (name == 'filters') {
			var index = _filters.indexOf(part);
			if (index > -1) {
				_filters.splice(index, 1);
			}
		}
	};

	this.isSetUp = function()
	{
		return _filters.length > 0;
	};

	this.canRun = function()
	{
		var allOk = this.isSetUp();

		if (allOk) {
			for (var i = 0; i < _filters.length; i++)  {
				if (!_filters[i].canRun()) {
					return false;
				}
			}
		}

		return allOk;
	};

	this.toJson = function()
	{
		var jsonObject = {
			"or": []
		};
		for (var i = 0; i < _filters.length; i++) {
			jsonObject.and.push(_filters[i].toJson());
		}
		return jsonObject;
	}
}
