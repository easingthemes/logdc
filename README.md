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

log.info('Lorem Ipsum', {foo: ['bar']}, [1, 2, 3], 'Dolorem');
$[19:15:46] INFO    : 'Lorem Ipsum', { foo: [ 'bar' ] }, [ 1, 2, 3 ], 'Dolorem'
```

## Types (Default)
```
// code
log.info('Lorem Ipsum');
log.warn('Lorem Ipsum');
log.error('Lorem Ipsum');
log.success('Lorem Ipsum');
log.log('Lorem Ipsum');
log.br();
// console:

$[19:15:46] INFO    : 'Lorem Ipsum'
$[19:15:46] WARN    : 'Lorem Ipsum'
$[19:15:46] ERROR   : 'Lorem Ipsum'
$[19:15:46] SUCCESS : 'Lorem Ipsum'
$[19:15:46] LOG     : 'Lorem Ipsum'
$[19:15:46] ::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
```

## Separator
```
log.br();
$[19:15:46] :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
```

## Settings

1. Labels

Label is uppercase type name

	1.1. Hide labels - first argument

	```
	const log = require(logdc)(false);

	log.info('Lorem Ipsum');
	$[19:19:25] 'Lorem Ipsum'

	```

	1.2. Add custom labels - first argument

	```
	const log = require(logdc)({
		custom: 'red',
		foo: 'green'
	});

	log.foo('Lorem Ipsum');
	$[19:15:46] FOO     : 'Lorem Ipsum'
	```

	1.3. Equal length - second argument

	Length of labels (type name + spaces + ':') is equal to longest type name (default 8 `SUCCESS :`),
	so that colon is always at the same vertical position. To disable this behaviour pass second argument as `false`

	```
	const log = require(logdc)({}, false);

	log.info('Lorem Ipsum');
    log.error('Lorem Ipsum');
    // console
	$[19:15:46] INFO: 'Lorem Ipsum'
    $[19:15:46] ERROR: 'Lorem Ipsum'
	```

2. Time

To hide timestamp pass third argument as `true`

```
const log = require(logdc)({}, true, false);

log.info('Lorem Ipsum');
$INFO    : 'Lorem Ipsum'
```

3. Colors

Label name has color.

Fourth argument is defining number of logged to colorize, default is 1, or colorize just label.

	3.1. To disable colors pass fourth argument as `0`

	```
	const log = require(logdc)({}, true, true, 0);

	log.info('Lorem Ipsum');
	$[19:15:46] INFO    : 'Lorem Ipsum'
	```

	3.2. To add colors to other logged parameters increase fourth parameter (`1` is for label)

	```
	const log = require(logdc)({}, true, true, 3);

	log.info('Lorem Ipsum', {foo: 'bar'});
	$[19:15:46] INFO    : 'Lorem Ipsum', { foo: 'bar' }
	```

	3.3. To change color of default label use first argument

	```
	const log = require(logdc)({
		info: 'red',
		error: 'green'
	});

	log.error('Lorem Ipsum');
	$[19:15:46] ERROR   : 'Lorem Ipsum'
	```

## Default arguments

```
const log = require(logdc)(
	labels = {},
	isEqualLength = true,
	hideDate = false,
	counter = 1
);
```

## Examples

```
log.info('Lorem Ipsum', {foo: ['bar']}, [1, 2, 3], 'Dolorem')
$[17:03:26] INFO    : 'Lorem Ipsum', { foo: [ 'bar' ] }, [ 1, 2, 3 ], 'Dolorem'
```

```
log.warn('Lorem Ipsum', {foo: ['bar']}, [1, 2, 3], 'Dolorem')
$[17:03:26] WARN    : 'Lorem Ipsum', { foo: [ 'bar' ] }, [ 1, 2, 3 ], 'Dolorem'
```

```
log.error('Lorem Ipsum', {foo: ['bar']}, [1, 2, 3], 'Dolorem')
$[17:03:26] ERROR   : 'Lorem Ipsum', { foo: [ 'bar' ] }, [ 1, 2, 3 ], 'Dolorem'
```

```
log.success('Lorem Ipsum', {foo: ['bar']}, [1, 2, 3], 'Dolorem')
$[17:03:26] SUCCESS : 'Lorem Ipsum', { foo: [ 'bar' ] }, [ 1, 2, 3 ], 'Dolorem'
```

```
log.log('Lorem Ipsum', {foo: ['bar']}, [1, 2, 3], 'Dolorem')
$[17:03:26] LOG     : 'Lorem Ipsum', { foo: [ 'bar' ] }, [ 1, 2, 3 ], 'Dolorem'
```

```
log.br()
$[17:03:26] :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
```
