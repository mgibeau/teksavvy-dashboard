import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Spin, Icon, Tooltip } from 'antd';
import { ChartCard, MiniBar } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import Result from 'ant-design-pro/lib/Result';
import moment from 'moment';

class DetailsBarChart extends Component {
  renderContent() {
    const { loading, error, records, trends } = this.props;

    switch (true) {
      // Catch errors and display message
      case error !== null:
        return <Result type="error" title="Oops!" description={error.message} />

      // Show loading spinner while records are being loaded
      case !trends || loading:
        return <Spin size="large" style={{ width: '100%', height: 120 }} />

      default:
        // Parse values as X,Y for chart
        const values = records.map((record, idx) => ({
          x: moment(record.Date).format('YYYY-MM-DD'),
          y: record.OnPeakDownload
        }));

        return <MiniBar
                height={163}
                data={values}
               />
    }
  }

  render() {
    const { trends, range } = this.props;

    return (
      <div className="DetailsBarChart">
        <ChartCard
          title="Usage Details"
          action={<Tooltip title={range}><Icon type="info-circle-o" /></Tooltip>}
          total={"On Peak Downloads"}
          contentHeight={160}
          footer={
            <div>
              <span>
                Last Day
                <Trend flag={trends.daily} style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>{trends.dailyAmount}</Trend>
              </span>
              <span style={{ marginLeft: 16 }}>
                Last 7 days
                <Trend flag={trends.weekly} style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>{trends.weeklyAmount}</Trend>
              </span>
            </div>
          }
        >
          {this.renderContent()}
        </ChartCard>
      </div>
    );
  }
}

const mapStateToProps = state => state.details

export default connect(
  mapStateToProps
)(DetailsBarChart);
