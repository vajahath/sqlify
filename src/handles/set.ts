/**
 * implementing SET (INSERT)
 * https://hiddentao.com/squel/api.html#insert_set
 */
import { Resource } from '../Resource';

export const set = (chain: any, resource: Resource['set']) => {
	Object.keys(resource).forEach((item) => {
		chain = chain.set(item, resource[item]);
	});
};
