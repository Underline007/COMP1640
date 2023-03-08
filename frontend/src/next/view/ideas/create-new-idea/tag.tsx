import React, { useEffect, useState } from 'react'
import { message, Switch, Transfer, Typography } from 'antd'
import type { TransferDirection } from 'antd/es/transfer'
import { Http } from '../../../api/http'

interface RecordType {
  key: string
  title: string
  description: string
  chosen: boolean
}

function Tags({ setCategories }) {
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  const [categoryList, setCategoryList] = useState([])
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const getAllCate = async () => {
      await Http.get('/api/v1/category')
        .then(res => {
          const categoryData = res.data.data.map(category => ({
            key: category?._id.toString(),
            title: `${category?.name}`,
            description: `${category?.name}`,
          }))
          setCategoryList(categoryData)
        })
        .catch(err => message.error(`Failed to get categories`))
    }
    getAllCate()
  }, [])

  const filterOption = (inputValue: string, option: RecordType) => option.description.indexOf(inputValue) > -1

  const handleChange = (selectedKeys: string[]) => {
    setTargetKeys(selectedKeys)
  }

  const handleSearch = (dir: TransferDirection, value: string) => {
    console.log('search:', dir, value)
  }

  const handleConfirm = (checked: boolean) => {
    setDisabled(checked)
    setCategories(targetKeys)
    // console.log(targetKeys)
  }

  return (
    <>
      <Transfer
        titles={['Avai', 'Yours']}
        locale={{
          itemUnit: 'Tags',
          itemsUnit: 'Tags',
          notFoundContent: 'The list is empty',
          searchPlaceholder: 'Search Tags here',
        }}
        dataSource={categoryList}
        showSearch
        disabled={disabled}
        filterOption={filterOption}
        targetKeys={targetKeys}
        onChange={handleChange}
        onSearch={handleSearch}
        render={item => item.title}
      />
      <br />
      <Switch unCheckedChildren="Not Yet" checkedChildren="Confirm Tags" checked={disabled} onChange={handleConfirm} />
    </>
  )
}

export default Tags
