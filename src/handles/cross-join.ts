/**
 * implementing CROSS JOIN
 * https://hiddentao.com/squel/api.html#select_cross_join
 */
import { Resource } from '../Resource';

export const cross_join = (chain: any, resource: Resource['cross_join']) => {
	resource.forEach((item) => {
		chain = chain.cross_join(item[0], item[1], item[2]);
	});
};
