// Nested query
function NestedQuery()
{
	// https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html
	var _path,
		_query,
		_scoreMode = 'avg';

	this.getPath = function()
	{
		return _path;
	}

	this.setPath = function(path)
	{
		_path = path;
	}

	this.getScoreMode = function()
	{
		return _scoreMode;
	}

	this.setScoreMode = function(scoreMode)
	{
		// avg, sum, max, none
		_scoreMode = scoreMode;
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