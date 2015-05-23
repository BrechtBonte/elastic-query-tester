// Bool query
function BoolQuery()
{
	var _must = [],
		_mustNot = [],
		_should = [],
		_minimumMatches,
		_boost;

	this.getType = function()
	{
		return 'query';
	}

	this.getInfo = function()
	{
		return {
			'name': 'Bool Query',
			'text': 'The bool query is used to apply multiple queries',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html',
			'form': {
				'minimum matches': {
					'type': 'text',
					'required': false,
					'value': _minimumMatches
				},
				'boost': {
					'type': 'text',
					'required': false,
					'value': _boost
				}
			}
		};
	}

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'minimum matches':
				_minimumMatches = value;
				break;
			case 'boost':
				_boost = value;
				break;
		}
	}

	this.addMust = function(query)
	{
		_must.push(query);
	}

	this.removeMust = function(query)
	{
		var index = _must.indexOf(query);
		if (index > -1) {
			_must.splice(index, 1);
		}
	}

	this.addMustNot = function(query)
	{
		_mustNot.push(query);
	}

	this.removeMustNot = function(query)
	{
		var index = _mustNot.indexOf(query);
		if (index > -1) {
			_mustNot.splice(index, 1);
		}
	}

	this.addShould = function(query)
	{
		_should.push(query);
	}

	this.removeShould = function(query)
	{
		var index = _should.indexOf(query);
		if (index > -1) {
			_should.splice(index, 1);
		}
	}

	this.addNesting = function(name, part)
	{
		switch(name) {
			case 'must':
				this.addMust(part);
				break;
			case 'mustNot':
				this.addMustNot(part);
				break;
			case 'should':
				this.addShould(part);
				break;
		}
	}

	this.removeNesting = function(name, part)
	{
		switch(name) {
			case 'must':
				this.removeMust(part);
				break;
			case 'mustNot':
				this.removeMustNot(part);
				break;
			case 'should':
				this.removeShould(part);
				break;
		}
	}

	this.getNestings = function()
	{
		return {
			'must': {
				'type': 'query',
				'multiple': true
			},
			'mustNot': {
				'type': 'query',
				'multiple': true
			},
			'should': {
				'type': 'query',
				'multiple': true
			}
		};
	}

	this.isSetUp = function()
	{
		return _must.length || _mustNot.length || _should.length;
	}

	this.canRun = function()
	{
		var allOk = this.isSetUp();

		if (allOk) {
			$.each(_must, function(i, query) {
				if (!query.canRun()) {
					allOk = false;
					return false;
				}
			});
		}
		if (allOk) {
			$.each(_mustNot, function(i, query) {
				if (!query.canRun()) {
					allOk = false;
					return false;
				}
			});
		}
		if (allOk) {
			$.each(_should, function(i, query) {
				if (!query.canRun()) {
					allOk = false;
					return false;
				}
			});
		}

		return allOk;
	}

	this.toJson = function()
	{
		var jsonObject = {
			"bool": {}
		};

		if (_must.length) {
			if (_must.length == 1) {
				jsonObject.bool.must = _must[0].toJson();
			} else {
				jsonObject.bool.must = [];
				for (var i = 0; i < _must.length; i++) {
					jsonObject.bool.must.push( _must[ i ].toJson() );
				}
			}
		}

		if (_mustNot.length) {
			if (_mustNot.length == 1) {
				jsonObject.bool.must_not = _mustNot[0].toJson();
			} else {
				jsonObject.bool.must_not = [];
				for (var i = 0; i < _mustNot.length; i++) {
					jsonObject.bool.must_not.push( _mustNot[ i ].toJson() );
				}
			}
		}

		if (_should.length) {
			if (_should.length == 1) {
				jsonObject.bool.should = _should[0].toJson();
			} else {
				jsonObject.bool.should = [];
				for (var i = 0; i < _should.length; i++) {
					jsonObject.bool.should.push( _should[ i ].toJson() );
				}
			}
		}

		if (typeof(_minimumMatches) != 'undefined') {
			jsonObject.bool.minimum_should_match = _minimumMatches;
		}

		if (_boost) {
			jsonObject.bool.boost = _boost;
		}

		return jsonObject;
	}
}