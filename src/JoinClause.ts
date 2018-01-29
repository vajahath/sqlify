export class JoinClause extends Array<string | null> {
	[index: number]: string | null;
	/** table to join */
	public 0: string;
	/** as clause */
	public 1: null | string;
	/** condition */
	public 2: string;
}
