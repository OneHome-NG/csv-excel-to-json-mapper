/* eslint-disable promise/param-names */
import Papa from 'papaparse'

const parseCSV = async (file) => {
  Papa.parsePromise = function (file) {
    return new Promise(function (complete, error) {
      Papa.parse(file, {
        complete,
        error
      })
    })
  }

  let results
  await Papa.parsePromise(file).then(function (parsedData) {
    results = parsedData
  })

  return results
}

export default parseCSV
