/* tslint:disable: no-unused-expression arrow-parens */

import { expect } from 'chai';
import { Resource, sqlify as makeQuery, squel as sql } from './../src';

describe('Testing sqlify', () => {
	it('should make good query (type 2: INSERT)', done => {
		const resource: Resource = {
			set: {
				age: 44,
				girl: true,
				name: 'Divya'
			}
		};
		const chain = sql.insert().into('users');
		makeQuery(chain, resource);

		const query = chain.toString();
		expect(query).to.equal(
			`INSERT INTO users (age, girl, name) VALUES (44, TRUE, 'Divya')`
		);
		done();
	});

	describe('testing some actual scenarios >', () => {
		it('case 1 (SELECT field FROM table JOIN JOIN JOIN WHERE cond.)', done => {
			const resource: Resource = {
				field: [
					'service_types.service_title',
					'service_pricing.service_pricing_title',
					'service_pricing_sub.service_pricing_sub_title',
					'service_pricing_cost.service_pricing_cost',
					'service_pricing_cost.service_pricing_currency'
				],
				join: [
					[
						'service_pricing',
						null,
						'service_types.service_id = service_pricing.service_type'
					],
					[
						'service_pricing_sub',
						null,
						'service_pricing.service_pricing_id = service_pricing_sub.service_pricing_id'
					],
					[
						'service_pricing_cost',
						null,
						'service_pricing_sub.service_pricing_sub_id = service_pricing_cost.service_pricing_sub_id'
					]
				],
				where: {
					'service_types.service_id': 'something',
					'service_pricing_cost.service_pricing_currency':
						'something else'
				}
			};
			const chain = sql.select().from('users');
			makeQuery(chain, resource);

			const query = chain.toString();
			expect(query).to.equal(
				"SELECT service_types.service_title, service_pricing.service_pricing_title, service_pricing_sub.service_pricing_sub_title, service_pricing_cost.service_pricing_cost, service_pricing_cost.service_pricing_currency FROM users INNER JOIN service_pricing ON (service_types.service_id = service_pricing.service_type) INNER JOIN service_pricing_sub ON (service_pricing.service_pricing_id = service_pricing_sub.service_pricing_id) INNER JOIN service_pricing_cost ON (service_pricing_sub.service_pricing_sub_id = service_pricing_cost.service_pricing_sub_id) WHERE (service_types.service_id='something') AND (service_pricing_cost.service_pricing_currency='something else')"
			);
			done();
		});
		it('case 2 (SELECT field FROM table WHERE cond.)', function(done) {
			const resource: Resource = {
				field: ['fabric_id', 'fabric_title'],
				where: {
					'fabrics.fabric_type': 'something'
				}
			};
			const chain = sql.select().from('fabrics');
			makeQuery(chain, resource);

			const query = chain.toString();
			expect(query).to.equal(
				"SELECT fabric_id, fabric_title FROM fabrics WHERE (fabrics.fabric_type='something')"
			);
			done();
		});

		it("case 3 (INSERT INTO embroidery_formats (format_title,format_ext,service_type VALUES('1','2','3') RETURNING format_id)", function(done) {
			const resource: Resource = {
				set: {
					format_title: 'abc',
					format_ext: 'aa',
					service_type: 1
				},
				returning: ['format_id']
			};
			const chain = sql.insert().into('embroidery_formats');
			makeQuery(chain, resource);

			const query = chain.toString();
			expect(query).to.equal(
				"INSERT INTO embroidery_formats (format_title, format_ext, service_type) VALUES ('abc', 'aa', 1) RETURNING format_id"
			);
			done();
		});

		it('case 4 GROUP BY: (SELECT fabric_id, fabric_title FROM fabrics GROUP BY fabric_id)', function(done) {
			const resource: Resource = {
				field: ['fabric_id', 'fabric_title'],
				group: ['fabric_id']
			};
			const chain = sql.select().from('fabrics');
			makeQuery(chain, resource);

			const query = chain.toString();
			// lme.w(query);
			expect(query).to.equal(
				'SELECT fabric_id, fabric_title FROM fabrics GROUP BY fabric_id'
			);
			done();
		});

		it("case 5 GROUP BY: (INSERT INTO embroidery_formats (format_title,format_ext,service_type VALUES('1','2','3') RETURNING format_id)", done => {
			const resource: Resource = {
				field: ['name', 'age'],
				group: ['name', 'age']
			};
			const chain = sql.select().from('fabrics');
			makeQuery(chain, resource);

			const query = chain.toString();
			// lme.w(query);
			expect(query).to.equal(
				'SELECT name, age FROM fabrics GROUP BY name, age'
			);
			done();
		});

		it('case 6 ORDER BY: (SELECT id FROM students ORDER BY id ASC, name ASC, age ASC)', done => {
			const resource: Resource = {
				field: ['id'],
				order: [
					{
						field: 'id',
						asc: true
					},
					{
						field: 'name',
						asc: false
					},
					{
						field: 'age',
						asc: true
					}
				]
			};
			const chain = sql.select().from('students');
			makeQuery(chain, resource);

			const query = chain.toString();
			// lme.w(query);
			expect(query).to.equal(
				'SELECT id FROM students ORDER BY id ASC, name DESC, age ASC'
			);
			done();
		});

		it('case 7 ERR handling', function(done) {
			const resource = {
				field: ['id'],
				order: [
					{
						asc: true,
						field: 'id'
					},
					{
						field: 'name',
						asc: false
					},
					{
						field: 'age',
						asc: true
					}
				],
				blabla: ['he', 'he']
			};
			const chain = sql.select().from('students');
			// makeQuery(chain, resource);
			// lme.w(query);
			expect(() => {
				makeQuery(chain, resource);
			}).to.throw(Error);
			done();
		});
	});
});
