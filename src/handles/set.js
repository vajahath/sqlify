/**
 * implementing SET (INSERT)
 * https://hiddentao.com/squel/api.html#insert_set
 */

module.exports = function(chain, resource) {
	for (var item in resource) {
		if (!resource.hasOwnProperty(item)) {
			continue;
		}
		chain = chain.set(item, resource[item]);
	}
};
