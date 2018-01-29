/**
 * implementing SET (INSERT)
 * https://hiddentao.com/squel/api.html#insert_set
 */
import { WhereObj } from '../WhereObj';

export const set = (chain: any, resource: WhereObj) => {
	Object.keys(resource).forEach(item => {
		chain = chain.set(item, resource[item]);
	});
};
