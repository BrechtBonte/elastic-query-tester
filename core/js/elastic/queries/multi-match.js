// Multi match query
function MultiMatchQuery()
{
	var _query,
		_fields = [];

	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Multi Match Query',
			'text': 'Builds a match query for use on multiple fields',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html',
			'form': {
				'query': {
					'type': 'text',
					'required': true,
					'value': _query
				},
				'fields': {
					'type': 'text',
					'required': true,
					'value': _fields.join(', '),
					'info': '"," separated'
				}
			}
		};
	};

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'query':
				_query = value;
				break;
			case 'fields':
				var fields = value.split(',');
				_fields = [];
				for (var i = 0, iMax = fields.length; i < iMax; i++) {
					_fields.push(fields[i].trim());
				}
				break;
		}
	};

	this.getNestings = function()
	{
		return {};
	};

	this.isSetUp = function()
	{
		return _query && _fields.length;
	};

	this.canRun = function()
	{
		return this.isSetUp();
	};

	this.toJson = function()
	{
		return {
			"multi_match": {
				"query": _query,
				"fields": _fields
			}
		};
	}
}
