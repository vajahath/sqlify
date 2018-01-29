/**
 * implementing JOIN
 * https://hiddentao.com/squel/api.html#select_join
 */
import { Resource } from '../Resource';

export const join = (chain: any, resource: Resource['join']) => {
	resource.forEach(item => {
		chain = chain.join(item[0], item[1], item[2]);
	});
};
