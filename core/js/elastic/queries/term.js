// Term query
function TermQuery()
{
	// https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html
	var _fieldName,
		_value,
		_boost;

	this.getInfo = function()
	{
		return {
			'name': 'Term Query',
			'text': 'The term query allows you to query terms',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html',
			'form': {
				'fieldName': {
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
	}

	this.getFieldName = function()
	{
		return _fieldName;
	}

	this.setFieldName = function(fieldName)
	{
		_fieldName = fieldName;
	}

	this.getValue = function()
	{
		return _value;
	}

	this.setValue = function(value)
	{
		_value = value;
	}

	this.getBoost = function()
	{
		return _boost;
	}

	this.setBoost = function(boost)
	{
		_boost = boost;
	}

	this.getNestings = function()
	{
		return {};
	}

	this.isSetUp = function()
	{
		return _fieldName && _value;
	}

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

		return JSON.stringify( jsonObject );
	}
}