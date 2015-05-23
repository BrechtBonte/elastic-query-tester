// Range query
function RangeQuery()
{
	// https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html
	var _fieldName,
		_lower,
		_lowerInclude,
		_upper,
		_upperInclude,
		_timeZone,
		_boost;

	this.getFieldName = function()
	{
		return _fieldName;
	}

	this.setFieldName = function(fieldName)
	{
		_fieldName = fieldName;
	}

	this.getLowerLimit = function()
	{
		return _lower;
	}

	this.includesLowerLimit = function()
	{
		return _lowerInclude;
	}

	this.setLowerLimit = function(lower, include)
	{
		_lower = lower;
		_lowerInclude = include;
	}

	this.getUpperLimit = function()
	{
		return _upper;
	}

	this.includesUpperLimit = function()
	{
		return _upperInclude;
	}

	this.setUpperLimit = function(upper, include)
	{
		_upper = upper;
		_upperInclude = include;
	}

	this.getTimeZone = function()
	{
		return _timeZone;
	}

	this.setTimeZone = function(timeZone)
	{
		// Only when using date fields
		_timeZone = timeZone;
	}

	this.getBoost = function()
	{
		return _boost;
	}

	this.setBoost = function(boost)
	{
		_boost = boost;
	}

	this.isSetUp = function()
	{
		return _fieldName &&
				(typeof(_lower) != 'undefined' || typeof(_upper) != 'undefined');
	}

	this.toJson = function()
	{
		var jsonObject = {
			"range": {
				_fieldName: {}
			}
		};

		if (typeof(_lower) != 'undefined') {
			var key = 'gt';
			if (_lowerInclude) key += 'e';
			jsonObject.range[ _fieldName ][ key ] = _lower;
		}

		if (typeof(_upper) != 'undefined') {
			var key = 'lt';
			if (_upperInclude) key += 'e';
			jsonObject.range[ _fieldName ][ key ] = _upper;
		}

		if (_timeZone) {
			jsonObject.range[ _fieldName ]['time_zone'] = _timeZone;
		}

		if (_boost) {
			jsonObject.range[ _fieldName ]['boost'] = _boost;
		}

		return JSON.stringify( jsonObject );
	}
}