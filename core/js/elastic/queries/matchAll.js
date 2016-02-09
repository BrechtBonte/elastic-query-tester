// MatchAll Query
function MatchAllQuery()
{
	this.getType = function()
	{
		return 'query';
	};

	this.getInfo = function()
	{
		return {
			'name': 'MatchAll Query',
			'text': 'The MatchAll query matches all documents, usefull for filtered queries',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-all-query.html'
		};
	};

	this.getNestings = function()
	{
		return {};
	};

	this.isSetUp = function()
	{
		return true;
	};

	this.canRun = function()
	{
		return this.isSetUp();
	};

	this.toJson = function()
	{
		var jsonObject = {
			"match_all": {}
		};

		return jsonObject;
	}
}
