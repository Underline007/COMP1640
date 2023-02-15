import { Card, Row, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'

interface DataType {
  id: string
  name: string
  email: string
  role: string
  active: boolean
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '10%',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a: DataType, b: DataType) => a.name.length - b.name.length,
    width: '30%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '30%',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    width: '15%',
    filters: [
      {
        text: 'Admin',
        value: 'admin',
      },
      {
        text: 'Staff',
        value: 'staff',
      },
      {
        text: 'QA Manager',
        value: 'QAmanager',
      },
      {
        text: 'Coordinator',
        value: 'coordinator',
      },
    ],
    onFilter: (value: any, record: DataType) => record.role.indexOf(value) === 0,
  },
  {
    title: 'Active',
    dataIndex: 'Active',
    width: '15%',
  },
]

function AccountManager() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  return (
    <Row gutter={16} style={{ padding: '20px', margin: 0 }}>
      <Card
        title="All accounts"
        bordered={false}
        style={{ width: '100%' }}
        bodyStyle={{ overflow: 'scroll', height: loading ? '500px' : 'auto', minHeight: '500px' }}
      >
        <Table rowSelection={rowSelection} columns={columns} dataSource={accounts} loading={loading} />
      </Card>
    </Row>
  )
}

export default AccountManager

const accounts = [
  {
    key: '1',
    id: '238456776345',
    name: 'huy',
    email: 'huy1234@gmail.com',
    role: 'admin',
    active: true,
  },
  {
    key: '3',
    id: 'sd243543545',
    name: 'huy1',
    email: 'huy1234@gmail.com',
    role: 'QAmanager',
    active: true,
  },
  {
    key: '4',
    id: '1234afd',
    name: 'huy2',
    email: 'huy1234@gmail.com',
    role: 'coordinator',
    active: true,
  },
  {
    key: '5',
    id: 'asdf',
    name: 'huy3',
    email: 'huy1234@gmail.com',
    role: 'staff',
    active: true,
  },
]