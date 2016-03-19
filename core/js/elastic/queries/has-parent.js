// HasParent query
function HasParentQuery()
{
	var _type,
		_query,
		_scoreMode = 'none';

	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'HasParent Query',
			'text': 'Matches documents that has a parent of a certain type',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-parent-query.html',
			'form': {
				'type': {
					'type': 'text',
					'required': true,
					'value': _type
				},
				'score mode': {
					'type': 'dropdown',
					'options': ['none', 'score'],
					'required': false,
					'value': _scoreMode
				}
			}
		};
	};

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'type':
				_type = value;
				break;
			case 'score mode':
				_scoreMode = value;
				break;
		}
	};

	this.addNesting = function(name, part)
	{
		if (name == 'query') {
			_query = part;
		}
	};

	this.removeNesting = function(name, part)
	{
		if (name == 'query' && part == _query) {
			_query = undefined;
		}
	};

	this.getNestings = function()
	{
		return {
			'query': {
				'type': 'query',
				'multiple': false
			}
		};
	};

	this.isSetUp = function()
	{
		return _type && _query;
	};

	this.canRun = function()
	{
		return this.isSetUp() && _query && _query.canRun();
	};

	this.toJson = function()
	{
		var jsonObject = {
			"has_parent": {
				"type": _type,
				"query": _query.toJson()
			}
		};

		if (_scoreMode) {
			jsonObject.has_parent["score_mode"] = _scoreMode;
		}

		return jsonObject;
	}
}
