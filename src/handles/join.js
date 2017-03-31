/**
 * implementing JOIN
 * https://hiddentao.com/squel/api.html#select_join
 */

module.exports = function(chain, resource) {
	resource.forEach(function(item) {
		chain = chain.join(item[0], item[1], item[2]);
	});
};
