/**
 * implementation of:
 * https://hiddentao.com/squel/api.html#select_group
 */
import { Resource } from '../Resource';

export const group = (chain: any, resource: Resource['group']) => {
	resource.forEach(item => {
		chain = chain.group(item);
	});
};
