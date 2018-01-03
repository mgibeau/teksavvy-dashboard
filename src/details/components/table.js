import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment';
import numeral from 'numeral';
import { Card, Table } from 'antd';
import Result from 'ant-design-pro/lib/Result';

import { getUsageDetails } from '../actions';

const { Meta } = Card;

const columns = [
  {
    title: 'Date',
    width: '40%',
    dataIndex: 'date',
    key: 'date'
  }, {
    title: <span>On Peak<sup>*</sup></span>,
    width: '20%',
    className: 'align-right',
    dataIndex: 'onpeak',
    key: 'onpeak',
    render: value => `${value} GB`
  }, {
    title: 'Off Peak',
    width: '20%',
    className: 'align-right',
    dataIndex: 'offpeak',
    key: 'offpeak',
    render: value => `${value} GB`
  }, {
    title: 'Total',
    width: '20%',
    className: 'align-right',
    dataIndex: 'total',
    key: 'total',
    render: value => `${value} GB`
  }
]

const tabList = [{ key: 0, tab: "Download" }, { key: 1, tab: "Upload" }]

class DetailsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      key: 0
    }
  }

  componentDidMount() {
    const { getUsageDetails } = this.props

    getUsageDetails();
  }

  componentWillReceiveProps(nextProps) {
    const { getUsageDetails } = this.props
    const { period } = nextProps

    if (period.EndDate !== this.props.period.EndDate) {
      getUsageDetails(period.EndDate);
    }
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  }

  render() {
    const { loading, records, count, error } = this.props;
    const { key } = this.state;

    if (error !== null) return <Result type="error" title="Oops!" description={error.message} />

    return (
      <Card
        loading={!count || loading}
        tabList={tabList}
        onTabChange={(key) => { this.onTabChange(key, 'key'); }}
      >
        <Table
          size="small"
          columns={columns}
          dataSource={
            records.map((record, idx) => ({
              key: idx,
              date: moment(record.Date).format('MMMM Do YYYY'),
              onpeak: record[`OnPeak${tabList[key].tab}`],
              offpeak: record[`OffPeak${tabList[key].tab}`],
              total: numeral(record[`OnPeak${tabList[key].tab}`]).add(record[`OffPeak${tabList[key].tab}`]).value()
            }))
          }
        />
        <Meta description="* Between the hours of 2:00 am and 8:00 am downloads are always free. Downloads performed outside of these hours count toward your usage. Remember uploads are always free, and don't count toward your usage!" />
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsageDetails
}, dispatch)

const mapStateToProps = state => state.details

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsTable);
