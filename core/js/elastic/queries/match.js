// Match query
function MatchQuery()
{
	var _fieldName,
		_value,
		_operator = "or",
		_boost,
		_minimumShouldMatch;

	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Match Query',
			'text': 'Search a field for a certain value. Note, "_all" can be used as a field name',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html',
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
				'operator': {
					'type': 'dropdown',
					'options': ['or', 'and'],
					'required': false,
					'value': _operator
				},
				'minimum should match': {
					'type': 'text',
					'required': true,
					'value': _minimumShouldMatch
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
			case 'operator':
				_operator = value;
				break;
			case 'minimum should match':
				_minimumShouldMatch = value;
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
		var jsonObject = {"match": {}};
		jsonObject.term[ _fieldName ] = {};
		jsonObject.term[ _fieldName ]["value"] = _value;
		jsonObject.term[ _fieldName ]["operator"] = _operator;
		if (_minimumShouldMatch) {
			jsonObject.term[ _fieldName ]["minimum_should_match"] = _minimumShouldMatch;
		}
		if (_boost) {
			jsonObject.term[ _fieldName ]["boost"] = _boost;
		}

		return jsonObject;
	}
}
