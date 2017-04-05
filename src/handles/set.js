/**
 * implementing SET (INSERT)
 * https://hiddentao.com/squel/api.html#insert_set
 */

module.exports = function(chain, resource) {
	Object.keys(resource).forEach(function(item) {
		chain = chain.set(item, resource[item]);
	});
};
