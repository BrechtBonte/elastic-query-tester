// Fuzzy query
function FuzzyQuery()
{
	var _fieldName,
		_value,
		_fuzziness,
		_boost;

	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Fuzzy Query',
			'text': 'The fuzzy query allows you to query terms with a given margin of error',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html',
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
				'fuzziness': {
					'type': 'text',
					'required': false,
					'value': _fuzziness
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
			case 'fuzziness':
				_fuzziness = value;
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
		var jsonObject = {"fuzzy": {}};

		if (!_boost && !_fuzziness) {
			jsonObject.fuzzy[ _fieldName ] = _value;
		} else {
			jsonObject.fuzzy[ _fieldName ]["value"] = _value;
			if (_boost) {
				jsonObject.fuzzy[ _fieldName ]["boost"] = _boost;
			}
			if (_fuzziness) {
				jsonObject.fuzzy[ _fieldName ]["fuzziness"] = _fuzziness;
			}
		}

		return jsonObject;
	}
}
