import { Button, Card, Checkbox, Col, Form, Input, message, Row, Space, Typography } from 'antd'
import ky from 'ky'
import { useSnackbar } from 'notistack'
import { useNavigate, useLocation } from 'react-router-dom'
import { imgDir } from '../../../constants/img-dir'

const { Title } = Typography

function Login() {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [form] = Form.useForm()

  const handleSubmit = async (val: any) => {
    const loginRes = await ky
      .post('/api/v1/auth/login', {
        json: { val },
      })
      .json()
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))

    console.log(loginRes)
    message.success('Đăng nhập thành công!')

    // return navigate(state?.from || '/dashboard')
  }

  return (
    <Row style={{ width: '100%', marginTop: 100, justifyContent: 'center' }}>
      <Card>
        <Space align="center" direction="vertical">
          <img src={`${imgDir}logo.png`} height={300} alt="logo" />
          <Title>Login to use this application</Title>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </Row>
  )
}

export default Login
