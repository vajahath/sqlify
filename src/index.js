/**
 * `chain` is the instance of npm squel module
 * `resource` includes the data to build the query
 */
var key;
var appendingValue = 0;

var lme = require('lme');

module.exports = function(chain, resource) {
	// refrain from sins
	// sometimes if resource contains req.body, this is required to make clear object (as of now)
	resource = JSON.parse(JSON.stringify(resource));

	// iterate through each properties of `resource`
	for (key in resource) {
		if (!resource.hasOwnProperty(key)) {
			continue;
		}
		switch (key) {
		case 'fields':
			resource[key].forEach(function(item) {
				chain = chain.field(item);
			});
			break;

		case 'where':
			for (item in resource[key]) {
				if (!resource[key].hasOwnProperty(item)) {
					continue;
				}

				appendingValue = resource[key][item];
					// modify appendingValue to include 's if necessary
				switch (typeof(resource[key][item])) {
				case 'number':
					break;
				case 'string':
					appendingValue = '\'' + appendingValue + '\'';
					break;
				default:
					lme.e('SQLIFY ERR: a type other than "string" or "number" encountered in \'where\'');
					throw new Error('a type other than "string" or "number" encountered');
				}
				chain = chain.where(item + '=' + appendingValue);
			}
			break;

		case 'set':
			for (var item in resource[key]) {
				if (!resource[key].hasOwnProperty(item)) {
					continue;
				}
				chain = chain.set(item, resource[key][item]);
			}
			break;
		}
	}
};
