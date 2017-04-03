/**
 * implementing CROSS JOIN
 * https://hiddentao.com/squel/api.html#select_cross_join
 */

module.exports = function(chain, resource) {
	resource.forEach(function(item) {
		chain = chain.cross_join(item[0], item[1], item[2]);
	});
};
