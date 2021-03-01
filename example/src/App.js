import React from 'react'

import { FileToJsonMaper } from 'csv-excel-to-json-mapper'
import 'csv-excel-to-json-mapper/dist/index.css'

const App = () => {
  const keys = [
    { value: "surname", label: "Surname" },
    { value: "otherNames", label: "Other Names" },
    { value: "email", label: "email" },
    { value: "password", label: "Password" },
    { value: "bankName", label: "BankName" },
    { value: "tellerNumber", label: "Teller" },
    { value: "tellerDate", label: "Date" },
    { value: "status", label: "Status" },
    { value: "phone", label: "Phone" },
    { value: "gender", label: "Gender" },
    // { value: "icanCode", label: "ICAN Code" },
    // { value: "tshirtSize", label: "Shirt Size" },
    // { value: "memberStatus", label: "Member Status" },
    // { value: "amount", label: "Amount" },
    // { value: "confirmedPayment", label: "Confirmed" },
    // { value: "memberCategory", label: "Category" },
    // { value: "memberAcronym", label: "Acronym" },
    // { value: "nameOfSociety", label: "Society" },
    // { value: "role", label: "role" },
    // { value: "venue", label: "venue" },
  ]
  return <FileToJsonMaper keys={keys} onComplete={(data) => console.log(data)} text="Create React Library Example 😄" />
}

export default App
