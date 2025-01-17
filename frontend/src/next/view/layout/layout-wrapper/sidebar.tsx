import {
  CalendarOutlined,
  HomeFilled,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  TagOutlined,
  TeamOutlined,
  UngroupOutlined,
  WeiboOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Layout, Menu, MenuProps } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useWindowSize from '../../../utils/useWindowSize'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('Home', 'home', <HomeFilled />),
  { type: 'divider' },
  getItem(
    'PUBLIC',
    'grp',
    null,
    [
      getItem('Ideas', 'ideas', <WeiboOutlined />),
      getItem('Tags', 'categories', <TagOutlined />),
      getItem('Users', 'accounts-manager', <TeamOutlined />),
      getItem('Departments', 'departments', <UngroupOutlined />),
      getItem('Events', 'event', <CalendarOutlined />),
    ],
    'group'
  ),
]
function AppSidebar() {
  const navigate = useNavigate()
  const windowWidth = useWindowSize()
  const [tabKey, setTabKey] = useState(['home'])
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const handleClickMenu = async (val: any) => {
    setTabKey([val.key])
    switch (val.key) {
      case 'home':
        navigate('/')
        break
      default:
        navigate(`/${val.key}`)
    }
  }

  return (
    <>
      {windowWidth > 1000 ? (
        <Layout.Sider width={268} style={{ background: 'transparent' }}>
          <Layout.Sider
            // collapsible
            collapsed={collapsed}
            onCollapse={value => setCollapsed(value)}
            width={268}
            style={{
              backgroundColor: 'white',
              position: 'sticky',
              zIndex: 1,
              alignSelf: 'start',
              height: '97vh',
              top: '50px',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
              paddingTop: '12px',
            }}
          >
            <Menu onClick={handleClickMenu} defaultSelectedKeys={tabKey} mode="inline" items={items} />
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{ marginBottom: 16, float: 'right', marginRight: '16px' }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </Layout.Sider>
        </Layout.Sider>
      ) : (
        <Dropdown menu={{ items: items }} trigger={['click']} overlayStyle={{ width: 200 }} placement="bottom">
          <Button
            icon={<MenuOutlined style={{}} />}
            type="primary"
            style={{
              position: 'sticky',
              zIndex: 3,
              alignSelf: 'start',
              top: '10px',
              border: '1px solid #ccc',
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
              marginTop: '10px',
            }}
          />
        </Dropdown>
      )}
    </>
  )
}

// const StyledMenu = styled(Menu)`
//   background: #888888;
//   font-size: 20px;
//   width: 500px;
// `

export default AppSidebar
