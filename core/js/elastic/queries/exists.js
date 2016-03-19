// Exists query
function ExistsQuery()
{
	var _fieldName;

	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Exists Query',
			'text': 'Returns documents that have at least one non-null value for field',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html',
			'form': {
				'field name': {
					'type': 'text',
					'required': true,
					'value': _fieldName
				}
			}
		};
	};

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'field name':
				_fieldName = value;
				break;
		}
	};

	this.getNestings = function()
	{
		return {};
	};

	this.isSetUp = function()
	{
		return _fieldName;
	};

	this.canRun = function()
	{
		return this.isSetUp();
	};

	this.toJson = function()
	{
		return {
			"exists": {
				"field": _fieldName
			}
		};
	}
}
