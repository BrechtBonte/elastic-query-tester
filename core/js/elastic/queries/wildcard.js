// Wildcard query
function WildcardQuery()
{
	var _fieldName,
		_value,
		_boost;

	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Wildcard Query',
			'text': 'The wildcard query allows you to query for terms using wildcards',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html',
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
				},
				'boost': {
					'type': 'text',
					'required': false,
					'value': _boost
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
			case 'value':
				_value = value;
				break;
			case 'boost':
				_boost = value;
				break;
		}
	};

	this.getNestings = function()
	{
		return {};
	};

	this.isSetUp = function()
	{
		return _fieldName && _value;
	};

	this.canRun = function()
	{
		return this.isSetUp();
	};

	this.toJson = function()
	{
		var jsonObject = {"wildcard": {}};
		if (_boost) {
			jsonObject.term[ _fieldName ] = {
				"value": _value,
				"boost": _boost
			};
		} else {
			jsonObject.term[ _fieldName ] = _value;
		}

		return jsonObject;
	}
}
