/**
 * implementing: WHERE
 * https://hiddentao.com/squel/api.html#select_where
 */

import { Resource } from '../Resource';

let appendingValue = '';

export const where = (chain: any, resource: Resource['where']) => {
	Object.keys(resource).forEach(item => {
		appendingValue = resource[item];
		// modify appendingValue to include 's if necessary
		switch (typeof resource[item]) {
			case 'number':
			case 'boolean':
				break;
			case 'string':
				appendingValue = `'${appendingValue}'`;
				break;
			default:
				throw new Error(
					'SQLIFY ERR: a type other than "string", "number", "boolean" encountered',
				);
		}
		chain = chain.where(item + '=' + appendingValue);
	});
};
