##### Yet another SQL query builder

[![Build Status](https://travis-ci.org/vajahath/sqlify.svg?branch=master)](https://travis-ci.org/vajahath/sqlify)
[![Known Vulnerabilities](https://snyk.io/test/npm/sqlify/badge.svg)](https://snyk.io/test/npm/sqlify)
[![Gitter chat](https://badges.gitter.im/npm-sqlify/gitter.png)](https://gitter.im/npm-sqlify/Lobby)
[![Greenkeeper badge](https://badges.greenkeeper.io/vajahath/sqlify.svg)](https://greenkeeper.io/)

![](https://raw.githubusercontent.com/vajahath/sqlify/master/media/sqlify.png)

> There are many sql query builders out there. But this one makes more sense to me :wink:.

> **Sqlify v2.0** is out! **What's new?**
> - more squel functions
> - using same function names for `sqlify` and `squel`. ([#5](https://github.com/vajahath/sqlify/issues/5))
> - addressing ([#3](https://github.com/vajahath/sqlify/issues/3))
> - wrapping `squel` inside `sqlify` for better stability.
> - *(migrating to v2 is easier than you think. It just requires 2 mins, you bet!)*
>   <br>[**migration guide**](#v1-to-v2-migration-guide)

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
const sql = require('sqlify').squel;
const sqlify = require('sqlify').sqlify;

let resource = {
  field: ['name', 'age', 'address'],
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
const sql = require('sqlify').squel;
const sqlify = require('sqlify').sqlify;

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

`sqlify` exposes a **function** and a **module** ([squel](https://www.npmjs.com/package/squel)).

The function receives 2 arguments. They are:
- `chain`
- `resource`

#### Step 1: Require the package
```js
const sql = require('sqlify').squel;
const sqlify = require('sqlify').sqlify;
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
    field: ['name', 'age', 'address'],
    where: {
        name: 'Swa',
        age: 22
    }
};

...
```
Where, the properties of `resource` object (in the above case, `field` and `where`) are taken from the chain function names of the [squel](https://www.npmjs.com/package/squel). Use them accordingly.

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
// => SELECT name, age, address FROM users WHERE (name='Swa') AND (age=22)
...
```

##### Unclear about something here? Feel free to rise an issue..

## Also,
**Since `sqlify` takes in and out chain functions, you can modify it even after `sqlify`ing it.**

---

> :green_heart: Find some time to contribute :star: to accommodate other functionalities from [squel](https://www.npmjs.com/package/squel).

### supported functions
|            |            |      |           |            |
|------------|------------|------|-----------|------------|
| cross-join | field      | join | left-join | outer-join |
| returning  | right-join | set  | where     |            |
|            |            |      |           |            |

## Contributors

- [Lakshmipriya](https://github.com/lakshmipriyamukundan)


## v1 to v2 migration guide

- **change the way you `require` the package:**
  - in v1, you required `sqlify` along with `squel` as:
    ```js
	const sqlify = require('sqlify');
	const squel = require('squel');
	...
	```
  - in v2 you've to change that code into:
    ```js
	const sqlify = require('sqlify').sqlify;
	const squel = require('sqlify').squel;
	...
	```
- **change in function name:** change `fields:[]` to `field:[]` in the `resource` object.
<br><br>*Oh yes! it's that simple.*

## Change log
- v2.0.0
  - fixing [#5](https://github.com/vajahath/sqlify/issues/5) and [#2](https://github.com/vajahath/sqlify/issues/2).
  - more squel functions
- v1.0.4
  - bug fix with 's in select queries
- v1.0.1, 1.0.2, 1.0.3
  - bug fix (in `package.json`)
  - better docs

- v1.0.0
  - initial release


## Licence
MIT © [Vajahath Ahmed](https://twitter.com/vajahath7)
