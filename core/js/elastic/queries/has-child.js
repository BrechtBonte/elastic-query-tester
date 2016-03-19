// HasChild query
function HasChildQuery()
{
	var _type,
		_query,
		_minChildren,
		_maxChildren,
		_scoreMode = 'none';

	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'HasChild Query',
			'text': 'Matches documents that have children mathcing the query',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-child-query.html',
			'form': {
				'type': {
					'type': 'text',
					'required': true,
					'value': _type
				},
				'score mode': {
					'type': 'dropdown',
					'options': ['none', 'avg', 'sum', 'max', 'none'],
					'required': false,
					'value': _scoreMode
				},
				'min children': {
					'type': 'text',
					'required': false,
					'value': _minChildren
				},
				'max children': {
					'type': 'text',
					'required': false,
					'value': _maxChildren
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
			case 'min children':
				_minChildren = value;
				break;
			case 'max children':
				_maxChildren = value;
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
			"has_child": {
				"type": _type,
				"query": _query.toJson()
			}
		};

		if (_scoreMode) {
			jsonObject.has_child["score_mode"] = _scoreMode;
		}
		if (_minChildren) {
			jsonObject.has_child["min_children"] = _minChildren;
		}
		if (_maxChildren) {
			jsonObject.has_child["max_children"] = _maxChildren;
		}

		return jsonObject;
	}
}
