/**
 * implementing RETURN (INSERT)
 * https://hiddentao.com/squel/api.html#insert_return
 */
import { Resource } from '../Resource';

export const returning = (chain: any, resource: Resource['returning']) => {
	resource.forEach(item => {
		chain = chain.returning(item);
	});
};
