import { Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import EventPieChart from './charts/eventPieChart'
import LarsestEventIdea from './charts/largest-event-chart'
import LatestIdeaList from './charts/latest-ideas'
import SmallStatistic from './charts/smallstatistic'

function DashboardAdmin() {
  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24 }}
        style={{
          padding: '10px',
        }}
      >
        <Col span={24}>
          <SmallStatistic />
        </Col>
      </Row>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24 }}
        style={{
          padding: '10px',
        }}
      >
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={12}
          xxl={6}
          style={{
            borderRadius: '5px',
          }}
        >
          <EventPieChart />
        </Col>
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={12}
          xxl={6}
          style={{
            borderRadius: '5px',
          }}
        >
          <LarsestEventIdea />
        </Col>
      </Row>

      <Row
        gutter={{ xs: 8, sm: 16, md: 24 }}
        style={{
          padding: '10px',
        }}
      >
        <LarsestEventIdea />
      </Row>

      <Row
        style={{
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: 'auto',
          margin: '10px',
        }}
      >
        <Col span={24} style={{ display: 'flex', justifyContent: 'center', borderBottom: 'inset' }}>
          <Title level={3}>Lastest list ideas</Title>
        </Col>
        <Col span={24}>
          <LatestIdeaList />
        </Col>
      </Row>
    </>
  )
}

export default DashboardAdmin
