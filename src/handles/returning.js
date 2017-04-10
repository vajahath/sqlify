/**
 * implementing RETURN (INSERT)
 * https://hiddentao.com/squel/api.html#insert_return
 */

module.exports = function(chain, resource) {
	Object.keys(resource).forEach(function(item) {
		chain = chain.returning(resource[item]);
	});
};
