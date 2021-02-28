import readXlsxFile from 'read-excel-file'
import parseCSV from './wait'

export const parser = (file) => {
  const extention = file.name.split('.')[file.name.split('.').length - 1]
  if (extention.toLowerCase() === 'csv') return csvParser(file)
  if (extention.toLowerCase().includes('xls')) return excelPasser(file)
}
export const csvParser = async (file) => {
  const { data, errors } = await parseCSV(file)
  if (errors.length)
    return {
      success: false,
      errors
    }
  const parsedData = {
    success: true,
    body: data.splice(1, data.length),
    headers: data[0].map((value) => ({ value, label: value }))
  }
  return parsedData
}

export const excelPasser = async (file) => {
  try {
    const data = await readXlsxFile(file)
    return {
      success: true,
      headers: data[0].map((value) => ({ value, label: value })),
      body: data.splice(1, data.length)
    }
  } catch (errors) {
    return { errors, success: false }
  }
}
