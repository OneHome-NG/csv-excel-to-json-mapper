import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles.module.css'

import { parser } from '../helpers/parser'

const FileReader = ({ onChange, visible }) => {
  const fileChange = async (e) => {
    const file = e.target.files[0]
    onChange(await parser(file))
  }

  if (!visible) return null
  return (
    <div className={styles.form_group + ' ' + styles.file_area}>
      <label htmlFor='file'>
        File <span>Your file should be excel or csv</span>
      </label>
      <input
        onChange={fileChange}
        type='file'
        name='file'
        id='file'
        required='required'
        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
        multiple={false}
      />
      <div className={styles.file_dummy}>
        <div className={styles.success}>
          Great, your files are selected. Keep on.
        </div>
        <div className={styles.default}>Please select some files</div>
      </div>
    </div>
  )
}

FileReader.propTypes = {
  onChange: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
}

export default FileReader
