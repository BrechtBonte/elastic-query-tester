// Ids query
function IdsQuery()
{
	var _ids = [];

	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Ids Query',
			'text': 'Matches documents by their ids (_uid).',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html',
			'form': {
				'ids': {
					'type': 'text',
					'required': true,
					'value': _ids.join(', '),
					'info': '"," separated'
				}
			}
		};
	};

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'ids':
				var ids = value.split(',');
				_ids = [];
				for (var i = 0, iMax = ids.length; i < iMax; i++) {
					_ids.push(ids[i].trim());
				}
				break;
		}
	};

	this.getNestings = function()
	{
		return {};
	};

	this.isSetUp = function()
	{
		return _ids.length;
	};

	this.canRun = function()
	{
		return this.isSetUp();
	};

	this.toJson = function()
	{
		return {
			"ids": {
				"type": _ids,
				"values": _ids
			}
		};
	}
}
