import moment from 'moment';
import numeral from 'numeral';
import ls from 'local-storage';
import * as s from './actionTypes';

// Mock data to avoid hammering the API
// import json from './sample/usageRecordsSummary.json';

function persistData(json) {
  json.fetchedDate = moment();

  ls('summary', json)

  return json
}

function receiveSummary(json) {
  return {
    type: s.GET,
    records: json.value,
    count: numeral(json['odata.count']).value()
  }
}

function error(err) {
  return {
    type: s.ERROR,
    error: err
  }
}

export const getUsageSummary = () => {
  return dispatch => {
    dispatch({ type: s.LOADING })

    // Return the mock data
    // return dispatch(receiveSummary(json))

    const cachedData = ls('summary');

    // Return cached data if it exists and is older than a day
    if (cachedData && !moment().isAfter(cachedData.fetchedDate, 'days')) return dispatch(receiveSummary(cachedData))

    return fetch('/api/UsageSummaryRecords?$inlinecount=allpages')
      .then(res => res.json())
      .then(json => persistData(json))
      .then(json => dispatch(receiveSummary(json)))
      .catch(err => dispatch(error(err)))
  }
};
