import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Spin, Icon, Tooltip } from 'antd';
import { ChartCard, Gauge, Field } from 'ant-design-pro/lib/Charts';
import Result from 'ant-design-pro/lib/Result';
import moment from 'moment';

import { getUsageSummary } from '../actions';

class Chart extends Component {
  componentDidMount() {
    const { getUsageSummary } = this.props

    getUsageSummary();
  }

  componentWillReceiveProps(nextProps) {
    const { getUsageSummary } = this.props
    const { period } = nextProps

    if (period.EndDate !== this.props.period.EndDate) {
      getUsageSummary(period.EndDate);
    }
  }

  renderPlaceHolder() {
    const { loading, error, count } = this.props;

    switch (true) {
      // Catch errors and display message
      case error !== null:
        return <Result type="error" title="Oops!" description={error.message} />

      // Show loading spinner while records are being loaded
      case !error && (!count || loading):
        return <Spin size="large" style={{ width: '100%', height: 120 }} />

      default:
        return false
    }
  }

  render() {
    const { period, limit, loading, error, count } = this.props;

    const periodUsagePercentage = Math.floor(period.OnPeakDownload / limit * 100);
    const footer = period.IsCurrent ? `${Math.floor(limit - period.OnPeakDownload)} GB REMAINING` : ''

    return (
      <div className="UsageChart">
        <ChartCard
          title="Current Usage"
          contentHeight={200}
          action={<Tooltip title={`${moment(period.StartDate).format('MMMM Do')} - ${moment(period.EndDate).format('MMMM Do')}`}><Icon type="info-circle-o" /></Tooltip>}
          footer={<Field style={{ textAlign: 'center' }} label={footer} />}
        >
          {this.renderPlaceHolder()}

          <div className={(error || !count || loading) ? 'hidden' : ''}>
            <Gauge
              style={{display: 'none'}}
              percent={periodUsagePercentage}
              title={Math.ceil(period.OnPeakDownload) + 'GB'}
              total={periodUsagePercentage + '%'}
              height={200}
            />
          </div>
        </ChartCard>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsageSummary
}, dispatch)

const mapStateToProps = state => state.summary

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
