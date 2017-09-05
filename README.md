# logdc
Simple console log for NodeJs with colors and timestamp.
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
const log = require(logdc);

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

To change separator character override default settings for label `br`.

## Settings

Override default settings or create new labels in your `package.json` file.

Add `logdcConfig` node:

```
  "logdcConfig": {
    "labels": {
      "foo": {
        "color": "red",
        "text": "My Custom label"
      },
      "warn": {
        "color": "green",
        "text": "Do not warn me!"
      }
    },
    "time": true,
    "counter": 2,
    "equal": true
  }
```

#### 1. Labels

 1.1. Hide labels

```
  "logdcConfig": {
    "labels": false
  }
```

```
log.info('Lorem Ipsum');

$[19:19:25] 'Lorem Ipsum'

```

 1.2. Add custom labels, or override default
```
"logdcConfig": {
    "labels": {
        "foo": {
            "color": "red",
            "text": "My Custom label"
        },
        "warn": {
            "color": "green",
            "text": "Do not warn me!"
        }
    }
}
```
 
```
log.foo('Lorem Ipsum');
$[19:15:46] FOO     : 'Lorem Ipsum'

log.warn('Lorem Ipsum');
$[19:15:46] DO NOT WARN ME! : 'Lorem Ipsum'
```

 1.3. Equal length

Length of labels (type name + spaces + ':') is equal to longest type name (default 8 `SUCCESS :`),
so that colon is always at the same vertical position. To disable this behaviour set `equal` as `false`

```
"logdcConfig": {
    "equal": false
}
```

```
log.info('Lorem Ipsum');
log.error('Lorem Ipsum');
// console
$[19:15:46] INFO: 'Lorem Ipsum'
$[19:15:46] ERROR: 'Lorem Ipsum'
```

#### 2. Time

To hide timestamp set `time` to `false`

```
"logdcConfig": {
    "time": false
}
```

```
log.info('Lorem Ipsum');
$INFO    : 'Lorem Ipsum'
```

#### 3. Colors

Label name has color.

Config `counter` is defining number of logged arguments to colorize, default is 2, or colorize label and first argument.

 3.1. To disable colors pass set `counter` as `0`

```
"logdcConfig": {
    "counter": 0
}
```

```
log.info('Lorem Ipsum');
$[19:15:46] INFO    : 'Lorem Ipsum'
```

 3.2. To add colors to other logged parameters increase `counter` (`1` is for label)

```
"logdcConfig": {
    "counter": 4
}
```

```
log.info('Lorem Ipsum', {foo: 'bar'}, 'Third param');
$[19:15:46] INFO    : 'Lorem Ipsum', { foo: 'bar' }, 'Third param'
```

 3.3. To change color of default label set `labels` with default type as key:
 
 ```
 "logdcConfig": {
     "labels": {
         "error": {
             "color": "white",
             "text": "No errors"
         },
         "warn": {
             "color": "green",
             "text": "Do not warn me!"
         }
     }
 }
 ```

```
log.error('Lorem Ipsum');
$[19:15:46] NO ERRORS : 'Lorem Ipsum'
```

## Default arguments

```
  "logdcConfig": {
    "labels": {
        "log": {
            "color": "white",
            "text": "log"
        },
        "info":    {
            "color": "white",
            "text": "info"
        },
        "warn":    {
            "color": "yellow",
            "text": "warning"
        },
        "error":   {
            "color": "red",
            "text": "error"
        },
        "success": {
            "color": "green",
            "text": "success"
        },
        "br":      {
            "color: "white",
            "text": ":"
        }
    },
    "time": true,
    "counter": 2,
    "equal": true
  }
```

## Examples

![Logdc examples](/logdc.png?raw=true "Examples")

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
