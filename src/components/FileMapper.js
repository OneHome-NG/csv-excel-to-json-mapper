import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles.module.css'
import Select from 'react-select'
import { Button, Card, Form } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
const FileMapper = ({
  keys,
  mapsTo,
  visible,
  onBackToFileReader,
  onChange,
  onContinue,
  width
}) => {
  if (!keys || !mapsTo || !visible) return null
  const rowIndex = mapsTo.map(({ value }) => value)
  return (
    <Form
      layout='vertical'
      onFinish={onContinue}
      initialValues={{ remember: true }}
    >
      <div className={styles.container}>
        <div className={styles.file_to_json_style}>
          {keys.map((value, index) => (
            <Card
              style={{ width }}
              key={index}
              className={styles.file_to_json_card_style}
            >
              <Form.Item label='Please select a key'>
                <Select
                  classNamePrefix='select'
                  onChange={({ value, label }) => {
                    onChange({
                      keys: value,
                      columnIndex: index,
                      keysLabel: label
                    })
                  }}
                  isClearable={false}
                  name='keys'
                  options={keys}
                />
              </Form.Item>
              <Form.Item>
                <Select
                  classNamePrefix='select'
                  onChange={({ value, label }) => {
                    onChange({
                      rowIndex: rowIndex.indexOf(value),
                      mapTo: value,
                      columnIndex: index,
                      mapToLabel: label
                    })
                  }}
                  isClearable={false}
                  name='mapsTo'
                  options={mapsTo}
                />
              </Form.Item>
            </Card>
          ))}
        </div>
        <div className={styles.file_to_json_back_button}>
          <Form.Item>
            <Button type='primary' onClick={onBackToFileReader}>
              <LeftOutlined />
              Back
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              className={styles.button_float_right}
              type='primary'
              htmlType='submit'
            >
              Continue <RightOutlined />
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}

FileMapper.propTypes = {
  keys: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  mapsTo: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  visible: PropTypes.bool.isRequired,
  onBackToFileReader: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  mapper: PropTypes.arrayOf(
    PropTypes.shape({
      keys: PropTypes.string,
      columnIndex: PropTypes.number,
      rowIndex: PropTypes.number,
      mapTo: PropTypes.string
    })
  ).isRequired,
  width: PropTypes.string
}

FileMapper.defaultProps = {
  width: '250px'
}

export default FileMapper
