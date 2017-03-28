const makeQuery = require('./../src');
const sql = require('squel');

let resource = {
	fields: ['name', 'age', 'address'],
	where: {
		name: 'Divya',
		age: '44'
	}
}

let chain = sql.select().from('users');

makeQuery(chain, resource);

console.log(chain.toString());
