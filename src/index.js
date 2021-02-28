/* eslint-disable no-unreachable */
import 'antd/dist/antd.css'

import PropTypes from 'prop-types'
import React, { useState } from 'react'
import FileReader from './components/FileReader'
import FileMapper from './components/FileMapper'
import FilePresenter from './components/FilePresenter'
import { notification } from 'antd'

export const FileToJsonMaper = ({ keys, onComplete }) => {
  const initialState = {
    fileReader: true,
    fileMapper: false,
    displayFile: false
  }
  const initialFile = {
    keys,
    mapsTo: [],
    data: []
  }
  const [stage, setStage] = useState(initialState)
  const [file, setFile] = useState(initialFile)
  const [mapper, setMapper] = useState([])
  const [displayData, setDisplayData] = useState({
    header: [],
    data: []
  })
  const onFileReaderChange = (data) => {
    let newMapper = []
    if (!data.success)
      return notification.error({
        message:
          'Encontered an error while trying to read your file, please check file and upload again'
      })
    newMapper = file.keys.map((map, index) => ({
      keys: map.value,
      required: map.required,
      mapTo: data.headers[index].value
    }))
    setMapper([...newMapper])
    setFile({ ...file, mapsTo: data.headers, data: data.body })
    setStage({
      ...stage,
      fileReader: false,
      fileMapper: true
    })
  }
  const onBackToFileReader = () => {
    setFile(initialFile)
    setStage({
      ...stage,
      fileReader: true,
      fileMapper: false
    })
  }
  const onMapperChange = ({
    rowIndex,
    columnIndex,
    keys,
    mapTo,
    keysLabel,
    mapToLabel
  }) => {
    const index = mapper.findIndex((map) => map.columnIndex === columnIndex)
    if (index >= 0) {
      const map = mapper[index]
      const newMap = {
        ...map,
        keys: keys || map.keys,
        mapTo: mapTo || map.mapTo,
        rowIndex: isNaN(rowIndex) ? map.rowIndex : rowIndex,
        columnIndex: isNaN(columnIndex) ? map.columnIndex : columnIndex,
        keysLabel: keysLabel || map.keysLabel,
        mapToLabel: mapToLabel || map.mapToLabel
      }
      mapper[index] = newMap
      return setMapper([...mapper])
    }
    return setMapper([
      ...mapper,
      { rowIndex, keys, mapTo, columnIndex, keysLabel: keysLabel, mapToLabel }
    ])
  }
  const onContinueToFilePresenter = (e) => {
    // e.preventDefault()
    const newMapper = []

    const temp1Keys = {}
    mapper.forEach((map) => {
      temp1Keys[map.keys] = map.rowIndex
    })
    file.data.forEach((value) => {
      const stupidObject = {}
      Object.keys(temp1Keys).forEach((v) => {
        stupidObject[v] = value[temp1Keys[v]]
      })
      newMapper.push(stupidObject)
    })
    setDisplayData({
      header: Object.keys(temp1Keys),
      data: newMapper
    })
    setStage({
      ...stage,
      fileReader: false,
      fileMapper: false,
      displayFile: true
    })
  }
  const onInputChange = ({ index, value, key }) => {
    const data = displayData.data
    data[index][key] = value
    setDisplayData({ ...displayData, data: [...data] })
  }
  const onBackToFileMapper = () => {
    setDisplayData({
      header: [],
      data: []
    })
    setStage({
      ...stage,
      fileReader: false,
      fileMapper: true,
      displayFile: false
    })
  }
  const onFileMappingComplete = () => {
    setStage({
      fileReader: false,
      fileMapper: false,
      displayFile: false
    })
    onComplete(displayData.data)
  }
  return (
    <React.Fragment>
      <FileReader visible={stage.fileReader} onChange={onFileReaderChange} />
      <FileMapper
        onContinue={onContinueToFilePresenter}
        onChange={onMapperChange}
        onBackToFileReader={onBackToFileReader}
        visible={stage.fileMapper}
        keys={file.keys}
        mapsTo={file.mapsTo}
        mapper={mapper}
        data={file.data}
      />
      <FilePresenter
        visible={stage.displayFile}
        tableHeader={displayData.header}
        data={displayData.data}
        onInputChange={onInputChange}
        onBackToFileMapper={onBackToFileMapper}
        onFinish={onFileMappingComplete}
      />
    </React.Fragment>
  )
}

FileToJsonMaper.propTypes = {
  keys: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string
    })
  ),
  onComplete: PropTypes.func.isRequired,
  display: PropTypes.bool
}

FileToJsonMaper.defaultProps = {
  display: false
}
