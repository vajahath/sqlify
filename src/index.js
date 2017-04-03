/**
 * `chain` is the instance of npm squel module
 * `resource` includes the data to build the query
 */
var lme = require('lme');
var squel = require('squel').useFlavour('postgres');
var handles = require('./handles');

var key;

var sqlify = function (chain, resource) {
	// refrain from sins
	// sometimes if resource contains req.body, this is required to make clear object (as of now)
	resource = JSON.parse(JSON.stringify(resource));

	// iterate through each properties of `resource`
	for (key in resource) {
		if (!resource.hasOwnProperty(key)) {
			continue;
		}
		switch (key) {
		case 'fields':
			handles.field(chain, resource[key]);
			break;

		case 'where':
			handles.where(chain, resource[key]);
			break;

		case 'set':
			handles.set(chain, resource[key]);
			break;

		case 'join':
			handles.join(chain, resource[key]);
			break;

		case 'left_join':
			handles.left_join(chain, resource[key]);
			break;

		case 'right_join':
			handles.right_join(chain, resource[key]);
			break;

		case 'outer_join':
			handles.outer_join(chain, resource[key]);
			break;

		case 'cross_join':
			handles.cross_join(chain, resource[key]);
			break;

		case 'returning':
			handles.returning(chain, resource[key]);
			break;

		default:
			lme.e('method ' + key + ' is not implemented');
			break;
		}
	}
};

// expose squel and sqlify
module.exports = {
	squel: squel,
	sqlify: sqlify
};
