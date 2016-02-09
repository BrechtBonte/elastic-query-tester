// Range Filter
function RangeFilter()
{
	var _fieldName,
		_lower,
		_lowerInclude,
		_upper,
		_upperInclude,
		_timeZone,
		_format,
		_execution = 'index';

	this.getType = function()
	{
		return 'filter';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Range Filter',
			'text': 'The range filter is used to filter ranges..',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-filter.html',
			'form': {
				'field name': {
					'type': 'text',
					'required': true,
					'value': _fieldName
				},
				'lower limit': {
					'type': 'text',
					'required': false,
					'value': _lower
				},
				'include lower limit': {
					'type': 'bool',
					'value': _lowerInclude
				},
				'upper limit': {
					'type': 'text',
					'required': false,
					'value': _upper
				},
				'include upper limit': {
					'type': 'bool',
					'value': _upperInclude
				},
				'time zone': {
					'type': 'text',
					'required': false,
					'note': 'only use this when querying date fields',
					'value': _timeZone
				},
				'format': {
					'type': 'text',
					'required': false,
					'value': _boost
				},
				'execution': {
					'type': 'dropdown',
					'options': ['index', 'fielddata'],
					'required': false,
					'value': _scoreMode
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
			case 'lower limit':
				_lower = value;
				break;
			case 'include lower limit':
				_lowerInclude = value;
				break;
			case 'upper limit':
				_upper = value;
				break;
			case 'include upper limit':
				_upperInclude = value;
				break;
			case 'time zone':
				_timeZone = value;
				break;
			case 'format':
				_format = value;
				break;
			case 'execution':
				_execution = value;
				break;
		}
	};

	this.getNestings = function()
	{
		return {};
	};

	this.isSetUp = function()
	{
		return _fieldName &&
				(typeof(_lower) != 'undefined' || typeof(_upper) != 'undefined');
	};

	this.canRun = function()
	{
		return this.isSetUp();
	};

	this.toJson = function()
	{
		var jsonObject = {
			"range": {}
		};
		jsonObject.range[ _fieldName ] = {};

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

		if (_format) {
			jsonObject.range[ _fieldName ]['format'] = _format;
		}

		if (_execution) {
			jsonObject.range[ _fieldName ]['execution'] = _execution;
		}

		return jsonObject;
	}
}
