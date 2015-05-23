// Nested query
function NestedQuery()
{
	var _path,
		_query,
		_scoreMode = 'avg';

	this.getType = function()
	{
		return 'query';
	}

	this.getInfo = function()
	{
		return {
			'name': 'Nested Query',
			'text': 'The nested query is necessary for querying fields from nested objects',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html',
			'form': {
				'path': {
					'type': 'text',
					'required': true,
					'value': _path
				},
				'score mode': {
					'type': 'dropdown',
					'options': ['avg', 'sum', 'max', 'none'],
					'required': true,
					'value': _scoreMode
				}
			}
		};
	}

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'path':
				_path = value;
				break;
			case 'score mode':
				_scoreMode = value;
				break;
		}
	}

	this.addNesting = function(name, part)
	{
		if (name == 'query') {
			_query = part;
		}
	}

	this.removeNesting = function(name, part)
	{
		if (name == 'query' && part == _query) {
			_query = null;
		}
	}

	this.getNestings = function()
	{
		return {
			'query': {
				'type': 'query',
				'multiple': false
			}
		};
	}

	this.isSetUp = function()
	{
		return _path && _query;
	}

	this.toJson = function()
	{
		var jsonObject = {
			"nested": {
				"path": _path,
				"score_mode": _scoreMode,
				"query": _query.toJson()
			}
		};
		return JSON.stringify(jsonObject);
	}
}