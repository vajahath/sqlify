##### Yet another SQL query builder

> There are many sql query builders out there. But this one is mine. This one make sense for me.

## Install 
```bash
npm install --save sqlify
```

## How?
This package is used along with [squel](https://www.npmjs.com/package/squel).

`sqlify` exposes a function which receives 2 arguments. They are:
- `chain`
- `resource`

#### Step 1: Require both packages
```js
const sql = require('squel');
const sqlify = require('sqlify');
const lme = require('lme') // not necessary. For printing things out..

...
```

#### Step 2: Initialize `chain` and `resource`
`chain` is an instance of [squel](https://www.npmjs.com/package/squel).
For example,
```js
...

let chain = squel.select().from('users');

...
```

`resource` is an object which contains the data to build the query.
Example:
```js
...

let resource = {
    fields: ['name', 'age', 'address'],
    where: {
        name: 'Swa',
        age: '22'
    }
};

...
```
Where, the properties of `resource` object (in the above case, `fields` and `where`) are taken from the chain function names of the [squel](https://www.npmjs.com/package/squel). Use them accordingly.

#### Step 3: Sqlify
```js
...

sqlify(chain, resource);

...
```

`sqlify` function wont return anything. It simply do things in in-place.

#### Step 4: Watch stuff...
```js
...

// parse query
let query = chain.toString();
// see it
lme.s(query);
// => SELECT name, age, address FROM users WHERE (name=Swa) AND (age=22)
...
```
## Also,
Since `sqlify` can take in and out chain functions, you can modify it even after `sqlify`ing it.

> This package currently supports `fields`, `where` and `set`. These are the chain function names from [squel](https://www.npmjs.com/package/squel).<br><br> **`sqlify`'s source code is fairly simple and easy to understand. Find time to contribute to accommodate other functionalities from [squel](https://www.npmjs.com/package/squel)**

## Licence
MIT © [Vajahath Ahmed](https://twitter.com/vajahath7)