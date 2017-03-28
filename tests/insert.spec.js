const makeQuery = require('./../src');
const sql = require('squel');

let resource = {
	set: {
		name: 'Divya',
		age: '44'
	}
}

let chain = sql.insert().into('users');

makeQuery(chain, resource);

console.log(chain.toString());
