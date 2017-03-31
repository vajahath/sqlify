var makeQuery = require('./../src');
var sql = require('squel');
var lme = require('lme');

var resource = {
	fields: [
		'service_types.service_title',
		'service_pricing.service_pricing_title',
		'service_pricing_sub.service_pricing_sub_title',
		'service_pricing_cost.service_pricing_cost',
		'service_pricing_cost.service_pricing_currency'
	],
	join: [
		['service_pricing', null, 'service_types.service_id = service_pricing.service_type'],
		['service_pricing_sub', null, 'service_pricing.service_pricing_id = service_pricing_sub.service_pricing_id'],
		['service_pricing_cost', null, 'service_pricing_sub.service_pricing_sub_id = service_pricing_cost.service_pricing_sub_id']
	],
	where: {
		'service_types.service_id': 'something',
		'service_pricing_cost.service_pricing_currency': 'something else'
	}
};
var chain = sql.select({ separator: '\n' }).from('service_types');
makeQuery(chain, resource);

var query = chain.toString();
lme.i(query);
