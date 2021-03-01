# csv-excel-to-json-mapper

> this package helps map files from excel or csv to a desired json data structure

[![NPM](https://img.shields.io/npm/v/csv-excel-to-json-mapper.svg)](https://www.npmjs.com/package/csv-excel-to-json-mapper) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save csv-excel-to-json-mapper
```

## Usage

```jsx
import React from 'react'

import { FileToJsonMaper } from 'csv-excel-to-json-mapper'
import 'csv-excel-to-json-mapper/dist/index.css'

const App = () => {
  const keys = [
    { value: "surname", label: "Surname", required: true },
    { value: "otherNames", label: "Other Names", required: true },
    { value: "email", label: "email" },
    { value: "password", label: "Password" },
  ]
  return <FileToJsonMaper keys={keys} onComplete={(data) => console.log(data)} />
}

export default App

```

## License

MIT © [LogicalOgbonna](https://github.com/LogicalOgbonna)
