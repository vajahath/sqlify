/*global it describe*/

var makeQuery = require('./../src');
var sql = require('squel');
var expect = require('chai').expect;
var lme = require('lme');

describe('Testing sqlify', function() {
	it('should make good query (type 1: SELECT)', function(done) {

		var resource = {
			fields: ['name', 'age', 'address'],
			where: {
				name: 'Divya',
				age: 44,
				boy: false
			},
			join: [
				['students', 's', 's.id = teachers.id'],
				['car', 'c', 'c.id = s.id'],
				['bike', null, 'bike.id = c.id']
			],
			left_join: [
				['students', 's', 's.id = teachers.id'],
				['car', 'c', 'c.id = s.id'],
				['bike', null, 'bike.id = c.id']
			],
			right_join: [
				['students', 's', 's.id = teachers.id'],
				['car', 'c', 'c.id = s.id'],
				['bike', null, 'bike.id = c.id']
			],
			outer_join: [
				['students', 's', 's.id = teachers.id'],
				['car', 'c', 'c.id = s.id'],
				['bike', null, 'bike.id = c.id']
			],
			cross_join: [
				['students', 's', 's.id = teachers.id'],
				['car', 'c', 'c.id = s.id'],
				['bike', null, 'bike.id = c.id']
			],
		};
		var chain = sql.select().from('users');
		makeQuery(chain, resource);

		var query = chain.toString();
		lme.i(query);
		expect(query).to.equal('SELECT name, age, address FROM users WHERE (name=\'Divya\') AND (age=44) AND (boy=false)');
		done();
	});

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
		lme.i(query);
		expect(query).to.equal('INSERT INTO users (name, age, girl) VALUES (\'Divya\', 44, TRUE)');
		done();
	});
});
