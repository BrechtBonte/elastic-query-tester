// Regexp query
function RegexpQuery()
{
	var _fieldName,
		_regex,
		_flags,
		_boost;

	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Regexp Query',
			'text': 'The regexp query allows you to query for terms using regular expressions',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html',
			'form': {
				'field name': {
					'type': 'text',
					'required': true,
					'value': _fieldName
				},
				'regex': {
					'type': 'text',
					'required': true,
					'value': _regex
				},
				'flags': {
					'type': 'text',
					'required': false,
					'value': _flags,
					'info': '"|" separated'
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
		return _fieldName && _regex;
	};

	this.canRun = function()
	{
		return this.isSetUp();
	};

	this.toJson = function()
	{
		var jsonObject = {"regexp": {}};

		if (!_boost && !_flags) {
			jsonObject.regexp[ _fieldName ] = _regex;
		} else {
			jsonObject.regexp[ _fieldName ]["value"] = _regex;
			if (_boost) {
				jsonObject.regexp[ _fieldName ]["boost"] = _boost;
			}
			if (_flags) {
				jsonObject.regexp[ _fieldName ]["flags"] = _flags;
			}
		}

		return jsonObject;
	}
}
