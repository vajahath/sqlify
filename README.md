##### Yet another SQL query builder

[![Build Status](https://travis-ci.org/vajahath/sqlify.svg?branch=master)](https://travis-ci.org/vajahath/sqlify)
[![Known Vulnerabilities](https://snyk.io/test/npm/sqlify/badge.svg)](https://snyk.io/test/npm/sqlify)

![](https://raw.githubusercontent.com/vajahath/sqlify/master/media/sqlify.png)

> There are many sql query builders out there. But this one make sense to me :wink:.

Used along with [squel](https://www.npmjs.com/package/squel).

## Install
```bash
npm install --save sqlify
```
## Why?
- Helps you to build dynamic sql queries.
- **Example use case:** suppose, you are getting a POST request to insert some data to your SQL database.
  You'll get the data in `req.body` as `{name: "Swat", age: 22, address: "ND"}`.
  Now make the query like:

  ```js
  let resource = {
    set: req.body
  }
  sqlify(chain, resource); // done!
  ```

## Examples
#### SELECT
```js
const sql = require('squel');
const sqlify = require('sqlify');

let resource = {
  fields: ['name', 'age', 'address'],
  where: {
    name: 'Swat',
    age: 22
  }
};
let chain = sql.select().from('users');
sqlify(chain, resource);

chain.toString() // => SELECT name, age, address FROM users WHERE (name=Swat) AND (age=22)
```

#### INSERT
```js
const sql = require('squel');
const sqlify = require('sqlify');

let resource = {
  set: {
    name: 'Swat',
    age: 22
  }
};
let chain = sql.insert().into('users');
sqlify(chain, resource);

chain.toString() // => INSERT INTO users (name, age) VALUES ('Swat', 22)
```

## How?
**This package is used along with [squel](https://www.npmjs.com/package/squel) package.**

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

##### Unclear about something here? Feel free to rise an issue..

## Also,
**Since `sqlify` takes in and out chain functions, you can modify it even after `sqlify`ing it.**

---

> This package currently supports `fields`, `where` and `set`. These are the chain function names from [squel](https://www.npmjs.com/package/squel).<br><br> :green_heart: Find some time to contribute :star: to accommodate other functionalities from [squel](https://www.npmjs.com/package/squel).

## Change log
- v1.0.1, 1.0.2
  - bug fix (in `package.json`)
  - better docs

- v1.0.0
  - initial release


## Licence
MIT © [Vajahath Ahmed](https://twitter.com/vajahath7)
