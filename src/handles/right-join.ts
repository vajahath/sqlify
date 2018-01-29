/**
 * implementing RIGHT JOIN
 * https://hiddentao.com/squel/api.html#select_left_join
 */
import { JoinClause } from '../JoinClause';

export const right_join = (chain: any, resource: JoinClause[]) => {
	resource.forEach(item => {
		chain = chain.right_join(item[0], item[1], item[2]);
	});
};
