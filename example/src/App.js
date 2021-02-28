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
  return <FileToJsonMaper keys={keys} onComplete={(data) => console.log(data)} text="Create React Library Example 😄" />
}

export default App
