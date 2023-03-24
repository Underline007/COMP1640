import { Col, Row, Space, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import { useNavigate } from 'react-router-dom'
import EventChart from './charts/eventChart'
import EventPieChart from './charts/eventPieChart'
import LoadList from './charts/loadlist'
import SmallStatistic from './charts/smallstatistic'

function DashboardAdmin() {
const navigate = useNavigate()
  return ( 
    <>
    <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{
            margin:'10px'}} >
      {/* <Col span={8} style={{border: '1px solid #ccc',
            borderRadius: '5px', width:'33.3%',}} >
      <Typography.Title level={4}>
            Total User
          </Typography.Title>
      </Col>
      <Col span={8} style={{border: '1px solid #ccc',
            borderRadius: '5px',  width:'33.3%'}}>
      <Typography.Title level={4}>
            Total Post
          </Typography.Title>
      </Col>
      <Col span={8} style={{border: '1px solid #ccc',
            borderRadius: '5px', width:'33.3%'}}>
      <Typography.Title level={4}>
            Rate
          </Typography.Title>
      </Col> */}
      <Col span={24}>
      <SmallStatistic/>
      </Col>
    </Row>
    <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{
            margin:'10px',}}>
        <Col className="gutter-row"  xs={24} sm={24} md={12} xxl={6} style={{
            borderRadius: '5px'}}>
          <EventPieChart />
        </Col>
        <Col className="gutter-row"  xs={24} sm={24} md={12} xxl={6} style={{
            borderRadius: '5px',}}>
          <EventChart />
        </Col>
      </Row>
    <Row style={{
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width:'auto',
            margin:'20px'}}>
      <Col span={24} style={{display:'flex', justifyContent:'center',borderBottom:'inset'}}>
        <Title level={3}>
        Post History
        </Title>
      </Col>
      <Col span={24} >
        <LoadList/>
      </Col>
    </Row>
      </>
  )
}

export default DashboardAdmin
