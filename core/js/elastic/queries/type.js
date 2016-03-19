// Type query
function TypeQuery()
{
	var _type;

	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Type Query',
			'text': 'The type query matches the document type',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-type-query.html',
			'form': {
				'type': {
					'type': 'text',
					'required': true,
					'value': _type
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
		}
	};

	this.getNestings = function()
	{
		return {};
	};

	this.isSetUp = function()
	{
		return _type;
	};

	this.canRun = function()
	{
		return this.isSetUp();
	};

	this.toJson = function()
	{
		return {
			"type": {
				"value": _type
			}
		};
	}
}
