/**
 * implementation of:
 * https://hiddentao.com/squel/api.html#select_order
 */
import { Resource } from '../Resource';

export const order = (chain: any, resource: Resource['order']) => {
	resource.forEach(item => {
		chain = chain.order(item.field, item.asc);
	});
};
