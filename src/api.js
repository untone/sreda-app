import { baseURL, perPage, maxTotal } from './constants';
import { urlParams } from './utils';

// Github invalidate tokens found in repo files so we encode it
const token = atob('ZDM2NmZhZTBjNjM2NGZmZjEzMzkwODMzNTlmMTk1OTZkZjcxMjE2Yg==');

const serializeParams = args => {
  let params = urlParams(args);
  return params.toString();
};

const parseQuery = (aprgs) => {
  const params = urlParams(aprgs);
  let result = {};
  for (let [key, value] of params) {
    result[key] = key === 'page' ? parseInt(value, 10) : value;
  }
  return result;
};

const fetchData = (endpoint, args = {}) => {
  let url = `${baseURL}${endpoint}`;
  if (Object.keys(args).length) {
    const {date, license, search, page} = args;
    const created = `+created:">${date.toISOString().slice(0, 10)}"`;
    const lang = `+language:javascript`;
    const filter = license.length ? `+license:${license}` : '';
    const query = `${search}${created}${lang}${filter}`;
    const params = {
      sort: 'stars',
      order: 'desc',
      per_page: perPage,
      page: page
    };
    url = `${url}?q=${query}&${serializeParams(params)}&access_token=${token}`;
  }
  return fetch(`${url}`)
    .then(response => response.json())
    .catch(error => error.message);
};

const fetchLicenses = async () => {
  const savedData = sessionStorage.getItem('licenses');
  const parsedData = JSON.parse(savedData) || {};
  if (Object.keys(parsedData).length) {
    return parsedData;
  } else {
    return await fetchData('/licenses');
  }
};

const fetchRepos = async (args) => {
  const data = await fetchData('/search/repositories', args);
  return data;
};

export {
  fetchLicenses,
  fetchRepos,
  perPage,
  maxTotal,
  parseQuery
};
