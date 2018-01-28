// tslint:disable:variable-name

import { JoinClause } from './JoinClause';
import { Order } from './Order';
import { WhereObj } from './WhereObj';

export class Resource {
	public field?: string[];
	public where?: WhereObj;
	public set?: WhereObj;
	public join?: JoinClause[];
	public left_join?: JoinClause[];
	public right_join?: JoinClause[];
	public outer_join?: JoinClause[];
	public cross_join?: JoinClause[];
	public returning?: string[];
	public group?: string[];
	public order?: Order[];
}
