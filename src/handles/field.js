/**
 * implementation of:
 * https://hiddentao.com/squel/api.html#select_field
 */

module.exports = function(chain, resource) {
	resource.forEach(function(item) {
		chain = chain.field(item);
	});
};
