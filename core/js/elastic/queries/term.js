// Term query
function TermQuery()
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
			'name': 'Term Query',
			'text': 'The term query allows you to query terms',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html',
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
		var jsonObject = {"term": {}};
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
