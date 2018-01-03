import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Row, Col, Breadcrumb, Icon, Input, Popover, Menu, Dropdown, Button } from 'antd';
import moment from 'moment';

import logo from './logo.png';
import 'ant-design-pro/dist/ant-design-pro.css';
import './App.css';

import Limit from './limit'
import Period from './period'
import Summary from './summary'
import Details from './details'

const { setUsageLimit } = Limit.actions
const { setPeriodIndex } = Period.actions

const { Chart } = Summary.components
const { DetailsBarChart, DetailsTable } = Details.components

const { Header, Footer } = Layout;

class App extends Component {
  render() {
    const { limit, setLimit, period, setPeriod, summary } = this.props;

    // Define selected period
    const selectedPeriod = summary.records[period.index] || { StartDate: moment().format(), EndDate: moment().format() };

    const menu = (
      <Menu onClick={setPeriod}>
        {summary.records.map((record, idx) =>
          <Menu.Item key={idx}>
            {moment(record.StartDate).format('MMMM')} {record.IsCurrent && <span style={{ color: "#ccc", textTransform: "uppercase", fontSize: "10px", float: "right" }}>current period</span>}
          </Menu.Item>
        )}
      </Menu>
    );

    return (
      <div className="App">
        <Layout>
          <Header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Popover content={<Input placeholder={limit} addonAfter="GB" onPressEnter={setLimit} />} title="Bandwidth Limit" placement="bottomRight" trigger="click">
              <Button type="primary" shape="circle" icon="setting" style={{ float: "right" }}></Button>
            </Popover>
          </Header>
          <Layout className="App-layout">
            <Breadcrumb className="App-breadcrumb">
              <Breadcrumb.Item>
                <Icon type="dashboard" />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Icon type="credit-card" /> Billing Period
              </Breadcrumb.Item>
              <Breadcrumb.Item style={{ cursor: 'pointer' }}>
                <Dropdown overlay={menu}>
                  <span>{`${moment(selectedPeriod.StartDate).format('MMMM Do')} - ${moment(selectedPeriod.EndDate).format('MMMM Do')}`} <Icon type="down" /></span>
                </Dropdown>
              </Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={16}>
              <Col className="App-column" sm={8}>
                <Chart period={selectedPeriod} limit={limit} />
              </Col>
              <Col className="App-column" sm={16}>
                <DetailsBarChart period={selectedPeriod} />
              </Col>
            </Row>
          </Layout>
          <Layout className="App-layout">
            <Row>
              <Col span={24}>
                <DetailsTable period={selectedPeriod} />
              </Col>
            </Row>
          </Layout>
          <Footer>MADE IN <span role="img" aria-label="Québec">⚜️</span> &mdash; <a href="mailto:info@maxjbo.com">info@maxjbo.com</a></Footer>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setLimit: (evt) => setUsageLimit(evt.target.value),
  setPeriod: ({ item, key, keyPath }) => setPeriodIndex(key)
}, dispatch)

const mapStateToProps = state => ({
  limit: state.limit,
  period: state.period,
  summary: state.summary
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
