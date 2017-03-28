/*global it describe*/

var makeQuery = require('./../src');
var sql = require('squel');
var expect = require('chai').expect;

describe('Testing sqlify', function() {
	it('should make good query (type 1: SELECT)', function(done) {

		var resource = {
			fields: ['name', 'age', 'address'],
			where: {
				name: 'Divya',
				age: '44'
			}
		};
		var chain = sql.select().from('users');
		makeQuery(chain, resource);
		expect(chain.toString()).to.equal('SELECT name, age, address FROM users WHERE (name=Divya) AND (age=44)');
		done();
	});

	it('should make good query (type 2: INSERT)', function(done) {

		var resource = {
			set: {
				name: 'Divya',
				age: 44
			}
		};
		var chain = sql.insert().into('users');
		makeQuery(chain, resource);
		expect(chain.toString()).to.equal('INSERT INTO users (name, age) VALUES (\'Divya\', 44)');
		done();
	});
});
