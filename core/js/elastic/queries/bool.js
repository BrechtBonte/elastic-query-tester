// Bool query
function BoolQuery()
{
	// https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
	var _must = [],
		_mustNot = [],
		_should = [],
		_minimumMatches,
		_boost;

	this.getMust = function()
	{
		return _must;
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

	this.getMustNot = function()
	{
		return _mustNot;
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

	this.getShould = function()
	{
		return _should;
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

	this.isSetUp = function()
	{
		return _must.length || _mustNot.length || _should.length;
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

		return JSON.stringify( jsonObject );
	}
}