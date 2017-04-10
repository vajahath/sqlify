/**
 * implementing: WHERE
 * https://hiddentao.com/squel/api.html#select_where
 */
var appendingValue;
var lme = require('lme');

module.exports = function(chain, resource) {
	Object.keys(resource).forEach(function(item) {
		appendingValue = resource[item];
        // modify appendingValue to include 's if necessary
		switch (typeof(resource[item])) {
		case ('number'):
		case ('boolean'):
			break;
		case 'string':
			appendingValue = '\'' + appendingValue + '\'';
			break;
		default:
			lme.e('SQLIFY ERR: a type other than "string", "number", "boolean" encountered in \'where\'');
			throw new Error('a type other than "string", "number", "boolean" encountered');
		}
		chain = chain.where(item + '=' + appendingValue);
	});
};
