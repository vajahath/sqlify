/**
 * implementing LEFT JOIN
 * https://hiddentao.com/squel/api.html#select_left_join
 */
import { JoinClause } from '../JoinClause';

export const left_join = (chain: any, resource: JoinClause[]) => {
	resource.forEach(item => {
		chain = chain.left_join(item[0], item[1], item[2]);
	});
};
