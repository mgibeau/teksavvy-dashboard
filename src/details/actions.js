import moment from 'moment';
import numeral from 'numeral';

import * as d from './actionTypes';

// Mock data to avoid hammering the API
// import json from './sample/usageRecords.json';

function receiveDetails(json) {
  return {
    type: d.GET,
    records: json.value,
    count: json['odata.count']
  }
}

function computeTrends(json) {
  const records = json.value;

  // Calculate trend for past 24h
  const yesterday = records[0].OnPeakDownload || 0;
  const thedaybefore = records[1].OnPeakDownload || 0;

  const percentagePreviousDay = thedaybefore > yesterday ? numeral(thedaybefore / yesterday).format('0%') : numeral(yesterday / thedaybefore).format('0%');
  const trendPreviousDay = thedaybefore > yesterday ? 'down' : 'up';

  // Calculate the trend for the past 7 days
  const past7days = records.slice(0, 7).map(record => (record.OnPeakDownload));
  const next7days = records.slice(7, 14).map(record => (record.OnPeakDownload));
  const past7daysAvg = numeral(past7days.reduce((a, b) => (a + b)) / past7days.length).format('0.00');
  const next7daysAvg = numeral(next7days.reduce((a, b) => (a + b)) / next7days.length).format('0.00');
  const percentage7days = next7daysAvg > past7daysAvg ? numeral(next7daysAvg / past7daysAvg).format('0%') : numeral(past7daysAvg / next7daysAvg).format('0%');
  const trend7days = next7daysAvg > past7daysAvg ? 'down' : 'up';

  const effectiveRange = `${moment(records[records.length - 1].Date).format('MMMM Do')} - ${moment(records[0].Date).format('MMMM Do')}`

  return {
    type: d.GET_TRENDS,
    trends: {
      daily: trendPreviousDay,
      dailyAmount: percentagePreviousDay,
      weekly: trend7days,
      weeklyAmount: percentage7days,
    },
    range: effectiveRange
  }
}

function error(err) {
  return {
    type: d.ERROR,
    error: err
  }
}

export const updateUsageDetails = () => {
  return dispatch => {
    dispatch({ type: d.LOADING })
  }
}

export const getUsageDetails = (periodEnd, skip) => {
  return dispatch => {
    dispatch({ type: d.LOADING })

    const past30Days = moment(periodEnd).subtract(1, 'months').format()

    // Return the mock data
    // dispatch(computeTrends(json))
    // return dispatch(receiveDetails(json))

    let filters = []

    filters.push(`Date ge DateTime'${past30Days}'`)
    periodEnd && filters.push(`Date le DateTime'${periodEnd}'`)

    return fetch(`/api/UsageRecords?$orderby=Date desc&$filter=${filters.join(' and ')}&$inlinecount=allpages`)
      .then(res => res.json())
      .then(json => {
        dispatch(receiveDetails(json))
        dispatch(computeTrends(json))
      })
      .catch(err => dispatch(error(err)))
  }
};
