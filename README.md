# logdc
Simple console log for NodeJs with colors and datestamp.
0 dependencies.


## Installation

```
$ npm install logdc
```

```
$ yarn add logdc
```

## Usage

```
const log = require(logdc)();

## Settings



log.info('Lorem Ipsum');
// 'Lorem Ipsum'
log.info('Lorem Ipsum', {foo: 'bar'});
//'Lorem Ipsum', {foo: 'bar'}
log.info('Lorem Ipsum', {foo: 'bar'}, [1, 2, 3], 'Dolorem');
