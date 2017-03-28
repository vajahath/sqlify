/**
 * `chain` is the instance of npm squel module
 * `resource` includes the data to build the query
 */
var key;

module.exports = function(chain, resource) {
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
				chain = chain.where(item + '=' + resource[key][item]);
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
