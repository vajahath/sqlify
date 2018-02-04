/* tslint:disable: no-unused-expression arrow-parens */

const { expect } = require('chai');
const { sqlify, squel } = require('./../dist');

const makeQuery = sqlify;
const sql = squel;

describe('Testing sqlify For JS: Verifies require works properly', () => {
	it('should make good query (type 2: INSERT)', done => {
		const resource = {
			set: {
				age: 44,
				girl: true,
				name: 'Divya',
			},
		};
		const chain = sql.insert().into('users');
		makeQuery(chain, resource);

		const query = chain.toString();
		// prettier-ignore
		expect(query).to.equal(`INSERT INTO users (age, girl, name) VALUES (44, TRUE, 'Divya')`);
		done();
	});
});
