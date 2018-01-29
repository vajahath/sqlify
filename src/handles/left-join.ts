/**
 * implementing LEFT JOIN
 * https://hiddentao.com/squel/api.html#select_left_join
 */
import { Resource } from '../Resource';

export const left_join = (chain: any, resource: Resource['left_join']) => {
	resource.forEach(item => {
		chain = chain.left_join(item[0], item[1], item[2]);
	});
};
