/**
 * implementing RIGHT JOIN
 * https://hiddentao.com/squel/api.html#select_left_join
 */
import { Resource } from '../Resource';

export const right_join = (chain: any, resource: Resource['right_join']) => {
	resource.forEach(item => {
		chain = chain.right_join(item[0], item[1], item[2]);
	});
};
