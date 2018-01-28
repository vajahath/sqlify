/**
 * implementation of:
 * https://hiddentao.com/squel/api.html#select_field
 */

import { Resource } from '../Resource';

export const field = (chain: any, resource: Resource['field']) => {
	resource.forEach((item) => {
		chain = chain.field(item);
	});
};
