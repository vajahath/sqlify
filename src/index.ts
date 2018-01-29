/**
 * `chain` is the instance of npm squel module
 * `resource` includes the data to build the query
 */

import * as squelLib from 'squel';

import * as handles from './handles';
import { Resource } from './Resource';

const squel = squelLib.useFlavour('postgres');

export const sqlify = (chain: any, resource: Resource) => {
	// iterate through each properties of `resource`
	Object.keys(resource).forEach(key => {
		switch (key) {
			case 'field':
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

			case 'group':
				handles.group(chain, resource[key]);
				break;

			case 'order':
				handles.order(chain, resource[key]);
				break;

			default:
				throw new Error(
					'SQLIFY ERR: method ' +
						key +
						' is not implemented > please contribute this method > its simple :)',
				);
			// break;
		}
	});
};

export { squel, Resource };
