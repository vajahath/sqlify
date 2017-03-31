/*global it describe*/

var makeQuery = require('./../src');
var sql = require('squel');
var expect = require('chai').expect;
var lme = require('lme');

describe('Testing sqlify', function() {
	it('should make good query (type 2: INSERT)', function(done) {
		var resource = {
			set: {
				name: 'Divya',
				age: 44,
				girl: true
			}
		};
		var chain = sql.insert().into('users');
		makeQuery(chain, resource);

		var query = chain.toString();
		expect(query).to.equal('INSERT INTO users (name, age, girl) VALUES (\'Divya\', 44, TRUE)');
		done();
	});

	describe('testing some actual scenarios >', function() {
		it('case 1 (SELECT fields FROM table JOIN JOIN JOIN WHERE cond.)', function(done) {
			var resource = {
				fields: [
					"service_types.service_title",
					"service_pricing.service_pricing_title",
					"service_pricing_sub.service_pricing_sub_title",
					"service_pricing_cost.service_pricing_cost",
					"service_pricing_cost.service_pricing_currency"
				],
				join: [
					["service_pricing", null, "service_types.service_id = service_pricing.service_type"],
					["service_pricing_sub", null, "service_pricing.service_pricing_id = service_pricing_sub.service_pricing_id"],
					["service_pricing_cost", null, "service_pricing_sub.service_pricing_sub_id = service_pricing_cost.service_pricing_sub_id"]
				],
				where: {
					"service_types.service_id": "something",
					"service_pricing_cost.service_pricing_currency": 'something else'
				}
			}
			var chain = sql.select().from('users');
			makeQuery(chain, resource);

			var query = chain.toString();
			expect(query).to.equal('SELECT service_types.service_title, service_pricing.service_pricing_title, service_pricing_sub.service_pricing_sub_title, service_pricing_cost.service_pricing_cost, service_pricing_cost.service_pricing_currency FROM users INNER JOIN service_pricing ON (service_types.service_id = service_pricing.service_type) INNER JOIN service_pricing_sub ON (service_pricing.service_pricing_id = service_pricing_sub.service_pricing_id) INNER JOIN service_pricing_cost ON (service_pricing_sub.service_pricing_sub_id = service_pricing_cost.service_pricing_sub_id) WHERE (service_types.service_id=\'something\') AND (service_pricing_cost.service_pricing_currency=\'something else\')');
			done();
		});
		it('case 2 (SELECT fields FROM table WHERE cond.)', function(done) {
			var resource = {
				fields: [
					"fabric_id",
					"fabric_title"
				],
				where: {
					"fabrics.fabric_type": 'something'
				}
			}
			var chain = sql.select().from('fabrics');
			makeQuery(chain, resource);

			var query = chain.toString();
			expect(query).to.equal('SELECT fabric_id, fabric_title FROM fabrics WHERE (fabrics.fabric_type=\'something\')');
			done();
		});

	})
});
