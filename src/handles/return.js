
/**
 * implementing RETURN (INSERT)
 * https://hiddentao.com/squel/api.html#insert_return
 */

module.exports = function(chain, resource) {
	for (var item in resource) {
		if (!resource.hasOwnProperty(item)) {
			continue;
		}
		chain = chain.returning(resource[item]);
	}
};
