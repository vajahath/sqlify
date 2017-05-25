/**
 * implementation of:
 * https://hiddentao.com/squel/api.html#select_order
 */

module.exports = function(chain, resource) {
	resource.forEach(function(item) {
		chain = chain.order(item.field, item.asc);
	});
};
