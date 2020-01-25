# Sqlify

Yet another SQL query builder.

[![npm](https://img.shields.io/npm/v/sqlify.svg)](https://www.npmjs.com/package/sqlify)
![Build Status](https://github.com/vajahath/sqlify/workflows/Build/badge.svg) 
[![T](https://img.shields.io/badge/TypeScript%20Ready-.d.ts%20included-blue.svg)]()
[![npm](https://img.shields.io/npm/dt/sqlify.svg)](https://www.npmjs.com/package/sqlify)

> There are many sql query builders out there. But this one makes more sense to me :wink:.

![](media/sqlify.png)

## Install

```bash
npm install --save sqlify
```

## Why

* This package is a wrapper around [squel](https://hiddentao.com/squel) module to make it more friendly. (Check that package to know its maintenance status)
* Helps you to build dynamic sql queries.
* **Example use case:** suppose, you are getting a POST request to insert some data to your SQL database.
  You'll get the data in `req.body` as `{name: "Swat", age: 22, address: "ND"}`.
  Now make the query like:

    ```js
    const resource = {
      set: req.body
      where: {
        id: 5
      }
    }

    sqlify(chain, resource); // done!
    ```

> Warning ⚠️: Do not ever pass queries generated on the client side to your web server for execution. The above example is only a use case. Do NOT copy paste as such.

## Examples

#### SELECT

```js
const { squel, sqlify } = require('sqlify');

const resource = {
  field: ['name', 'age', 'address'],
  where: {
    name: 'Swat',
    age: 22,
  },
};

const chain = squel.select().from('users');

sqlify(chain, resource);

chain.toString();
// => SELECT name, age, address FROM users WHERE (name=Swat) AND (age=22)
```

##### Starter Guide For TypeScript

```ts
import { squel, sqlify, Resource } from 'sqlify'

// `Resource` is type.
const resource :Resource = {
  field: ['name', 'age', 'address'],
  where: {
    name: 'Swat',
    age: 22,
  },
};

// ...
```

#### SELECT with a simple JOIN

```js
// ...

const resource = {
  field: ['user.*', 'hobbies.hobby', 'colors.favorite'],
  where: {
    name: 'Swat',
    age: 22,
  },
  join: [
    ['hobbies', null, 'hobbies.id = user.id'],
    ['colors', null, 'colors.user_id = user.id'],
  ];
}
const chain = squel.select().from('Hero');

sqlify(chain, resource);

chain.toString();

/*
SELECT 
  user.*,
  hobbies.hobby,
  colors.favorite 
FROM Hero 
  INNER JOIN hobbies 
    ON (hobbies.id = user.id) 
  INNER JOIN colors 
    ON (colors.user_id = user.id) 
WHERE (name='Swat') AND (age=22)
*/
```

Read the JOIN section of [squel docs](https://hiddentao.com/squel/#select) for more.

#### INSERT

```js
const { squel, sqlify } = require('sqlify');

const resource = {
  set: {
    name: 'Swat',
    age: 22,
  },
};

const chain = sql.insert().into('users');
sqlify(chain, resource);

chain.toString();
// => INSERT INTO users (name, age) VALUES ('Swat', 22)
```

## How?

`sqlify` exposes a **function**, **module** ([squel](https://www.npmjs.com/package/squel)) and a `Resource` type (for using with TypeScript).

The function receives 2 arguments. They are:

* `chain`
* `resource`

#### Step 1: Require the package

```js
const { squel, sqlify } = require('sqlify');
```

#### Step 2: Initialize `chain` and `resource`

`chain` is an instance of [squel](https://www.npmjs.com/package/squel).
For example,

```js
// ...

const chain = squel.select().from('users');

// ...
```

`resource` is an object which contains the data to build the query.

Example:

```js
// ...

const resource = {
    field: ['name', 'age', 'address'],
    where: {
        name: 'Swa',
        age: 22
    }
};

// ...
```

Where, the properties of `resource` object (in the above case, `field` and `where`) are taken from the chain function names of the [squel](https://www.npmjs.com/package/squel). There are more. Refer their docs and use them accordingly.

> When used with TypeScript, you should mark type of `resource` with the `import`ed `Resource` class.
> Like `const resource:Resource = {...}`.

#### Step 3: Sqlify

```js
// ...

sqlify(chain, resource);

// ...
```

`sqlify` function wont return anything. It simply do things in in-place.

#### Step 4: Watch stuff

```js
// ...

// parse query
const query = chain.toString();
// see it
console.log(query);
// => SELECT name, age, address FROM users WHERE (name='Swa') AND (age=22)

// ...
```

_Unclear about something here? Feel free to rise an issue.._

## Also,

Since `sqlify` takes in and out chain functions, you can modify it **even after** `sqlify`ing it.

Example:

```js
// ...

const chain = squel.select().from('users');

sqlify(chain, resource);

chain.limit(10);

chain.toString(); // Voila!
```

### Supported Squel Functions

The following fields can be used inside the `resource` object. Logic behind the usage of these functions can be found at [squel docs](https://hiddentao.com/squel).

|            |            |      |           |            |
| ---------- | ---------- | ---- | --------- | ---------- |
| `cross_join` | `field`      | `join` | `left_join` | `outer_join` |
| `returning`  | `right_join` | `set`  | `where`     | `group`      |
| `order`      |            |      |           |            |
|            |            |      |           |            |

## Contributors

* [Lakshmipriya](https://github.com/lakshmipriyamukundan)

## v1 to v2 migration guide

* **change the way you `require` the package:**
  * in v1, you required `sqlify` along with `squel` as:
  ```js
  const sqlify = require('sqlify');
  const squel = require('squel');
  // ...
  ```
  * in v2 you've to change that code into:
  ```js
  const { sqlify, squel } = require('sqlify');
  // ...
  ```

* **change in function name:** change `fields:[]` to `field:[]` in the `resource` object.
  <br><br>*Oh yes! it's that simple.*
  <br><br>

## Change log

* v2.5.0
  * Security Update
* v2.4.0
  * TypeScript support and definitions
  * Better docs
* v2.3.1
  * enabling Greeenkeeper, better docs
* v2.3.0
  * adds better error handling: (if an unsupported method is used, sqlify throws an err)
* v2.2.0
  * adds `order` function from [squel-order](https://hiddentao.com/squel/api.html#select_order)
  * better docs
* v2.1.1
  * adds `group` function from [squel-group](https://hiddentao.com/squel/api.html#select_group)
  * better docs
* v2.0.0
  * fixing [#5](https://github.com/vajahath/sqlify/issues/5) and [#2](https://github.com/vajahath/sqlify/issues/2).
  * more squel functions
* v1.0.4
  * bug fix with 's in select queries
* v1.0.1, 1.0.2, 1.0.3
  * bug fix (in `package.json`)
  * better docs
* v1.0.0
  * initial release

## Licence

MIT © [Vajahath Ahmed](https://twitter.com/vajahath7)

[badge_paypal_donate]: https://cdn.rawgit.com/vajahath/cloud-codes/a01f087f/badges/paypal_donate.svg
[paypal-donations]: https://paypal.me/vajahath
