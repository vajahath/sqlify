/**
 * implementation of:
 * https://hiddentao.com/squel/api.html#select_order
 */
import { Order } from '../Order';

export const order = (chain: any, resource: Order[]) => {
	resource.forEach(item => {
		chain = chain.order(item.field, item.asc);
	});
};
