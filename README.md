# Spotter

Fetch the HTTP status code of a list of URL's.

## Background

You have a list of URL's and you want to check how HTTP requests to them are
handled by the webserver? Spotter will asynchronously send HTTP HEAD requests
and list the returned HTTP response statuscode for each URL.

This project relies on [request-promise](https://www.npmjs.com/package/request-promise)
and [bluebird](https://www.npmjs.com/package/bluebird).

Status: Currently under development.

## Command line tool

### Installation

```bash
$ sudo npm link
```

### Usage

You have a CSV file with a 'url' column which contains a number of url's.

```bash
$ spotter list.csv --column url
```

The CSV file will be overwritten. The original data will be kept, but an
additional column "response" will be added. This column holds the HTTP resonse
code.

## API

Use spotter in your own code like this:

```
var spotter = require('spotter');

spotter(data, column).then(function(result) {
  // do stuff
}
```

## License

The MIT License (MIT)

Copyright (c) 2015 Matthias Vandermaesen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.