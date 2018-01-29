/**
 * implementing JOIN
 * https://hiddentao.com/squel/api.html#select_join
 */
import { JoinClause } from '../JoinClause';

export const join = (chain: any, resource: JoinClause[]) => {
	resource.forEach(item => {
		chain = chain.join(item[0], item[1], item[2]);
	});
};
