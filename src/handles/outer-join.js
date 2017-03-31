/**
 * implementing OUTER JOIN
 * https://hiddentao.com/squel/api.html#select_outer_join
 */

module.exports = function(chain, resource) {
	resource.forEach(function(item) {
		chain = chain.outer_join(item[0], item[1], item[2]);
	});
};
