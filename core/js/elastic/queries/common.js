// Common query
function CommonQuery()
{
	var _fieldName,
		_query,
		_cutoffFrequency,
		_lowFrequencyOperator = "or";

	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Common Query',
			'text': 'Search taking small word into account',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-common-terms-query.html',
			'form': {
				'field name': {
					'type': 'text',
					'required': true,
					'value': _fieldName
				},
				'query': {
					'type': 'text',
					'required': true,
					'value': _query
				},
				'cutoff frequency': {
					'type': 'text',
					'required': true,
					'value': _cutoffFrequency
				},
				'low frequency operator': {
					'type': 'dropdown',
					'options': ['or', 'and'],
					'required': false,
					'value': _lowFrequencyOperator
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
			case 'query':
				_query = value;
				break;
			case 'cutoff frequency':
				_cutoffFrequency = value;
				break;
			case 'low frequency operator':
				_lowFrequencyOperator = value;
				break;
		}
	};

	this.getNestings = function()
	{
		return {};
	};

	this.isSetUp = function()
	{
		return _fieldName && _query && _cutoffFrequency;
	};

	this.canRun = function()
	{
		return this.isSetUp();
	};

	this.toJson = function()
	{
		var jsonObject = {"common": {}};
		jsonObject.term[ _fieldName ] = {};
		jsonObject.term[ _fieldName ]["query"] = _query;
		jsonObject.term[ _fieldName ]["cutoff_frequency"] = _cutoffFrequency;
		if (_lowFrequencyOperator) {
			jsonObject.term[ _fieldName ]["low_freq_operator"] = _lowFrequencyOperator;
		}

		return jsonObject;
	}
}
