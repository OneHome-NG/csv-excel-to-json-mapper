import { Table, Input, Button } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from './styles.module.css'

const FilePresenter = ({
  tableHeader,
  data,
  visible,
  onInputChange,
  onBackToFileMapper,
  onFinish,
  scroll
}) => {
  const [table, setTable] = useState({
    columns: [],
    body: []
  })

  useEffect(() => {
    const columns = tableHeader.map((value, index) => ({
      title: <span>{value}</span>,
      dataIndex: value,
      key: value,
      render: (text, th) => {
        return (
          <Input
            onChange={(e) => {
              onInputChange({
                index: parseInt(th.key),
                value: e.target.value,
                key: value
              })
            }}
            value={text}
          />
        )
      }
    }))
    const body = data.map((value, index) => ({ ...value, key: index }))
    setTable({
      columns,
      body
    })
  }, [data])
  if (!visible) return null

  return (
    <div>
      <Table
        scroll={scroll}
        columns={table.columns}
        dataSource={table.body}
        bordered
        size='middle'
      />
      <div className={styles.table_footer}>
        <Button onClick={onBackToFileMapper} type='primary'>
          <LeftOutlined /> Back
        </Button>
        <Button
          onClick={onFinish}
          type='primary'
          className={styles.button_float_right}
        >
          Finish <RightOutlined />
        </Button>
      </div>
    </div>
  )
}

FilePresenter.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onBackToFileMapper: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  tableHeader: PropTypes.arrayOf(PropTypes.string),
  visible: PropTypes.bool.isRequired,
  scroll: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })
}

FilePresenter.defaultProps = {
  scroll: { x: 1500, y: 500 }
}

export default FilePresenter
