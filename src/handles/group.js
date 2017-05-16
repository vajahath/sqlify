/**
 * implementation of:
 * https://hiddentao.com/squel/api.html#select_group
 */

module.exports = function(chain, resource) {
	resource.forEach(function(item) {
		chain = chain.group(item);
	});
};
