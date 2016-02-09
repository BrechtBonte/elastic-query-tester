// Missing Filter
function MissingFilter()
{
	var _fieldName;

	this.getType = function()
	{
		return 'filter';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Missing Filter',
			'text': 'The Missing filter matches all documents containing a field without the given name, or if it\'s value is NULL',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-filter.html',
			'form': {
				'field name': {
					'type': 'text',
					'required': false,
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
		return typeof(_fieldName) != 'undefined';
	};

	this.canRun = function()
	{
		return this.isSetUp;
	};

	this.toJson = function()
	{
		var jsonObject = {
			"missing": {
				"field": _fieldName
			}
		};

		return jsonObject;
	}
}
