// Exists Filter
function ExistsFilter()
{
	var _fieldName;

	this.getType = function()
	{
		return 'filter';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Exists Filter',
			'text': 'The Exists filter checks if the documents contain a field with the given name, or if it\'s value is NULL',
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
			"exists": {
				"field": _fieldName
			}
		};

		return jsonObject;
	}
}
