/**
 * implementing OUTER JOIN
 * https://hiddentao.com/squel/api.html#select_outer_join
 */
import { JoinClause } from '../JoinClause';

export const outer_join = (chain: any, resource: JoinClause[]) => {
	resource.forEach(item => {
		chain = chain.outer_join(item[0], item[1], item[2]);
	});
};
