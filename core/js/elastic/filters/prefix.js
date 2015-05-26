// Prefix Filter
function PrefixFilter()
{
	var _fieldName,
		_value;

	this.getType = function()
	{
		return 'filter';
	}

	this.getInfo = function()
	{
		return {
			'name': 'Prefix Filter',
			'text': 'The Prefix Filter allows you to filter terms by their value according to a prefix',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-filter.html',
			'form': {
				'field name': {
					'type': 'text',
					'required': true,
					'value': _fieldName
				},
				'value': {
					'type': 'text',
					'required': true,
					'value': _value
				}
			}
		};
	}

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'field name':
				_fieldName = value;
				break;
			case 'value':
				_value = value;
				break;
		}
	}

	this.getNestings = function()
	{
		return {};
	}

	this.isSetUp = function()
	{
		return _fieldName && _value;
	}

	this.canRun = function()
	{
		return this.isSetUp();
	}

	this.toJson = function()
	{
		var jsonObject = {
			"prefix": {}
		};
		jsonObject.prefix[ _fieldName ] = _value;

		return jsonObject;
	}
}