const baseURL = 'https://api.github.com';
const perPage = 20;
const maxTotal = 1000;

// Github invalidate tokens found in repo files so we encode it
const token = atob('ZDM2NmZhZTBjNjM2NGZmZjEzMzkwODMzNTlmMTk1OTZkZjcxMjE2Yg==');

const searchParams = params => {
  let searchQuery = new URLSearchParams(params);
  searchQuery.append('access_token', token);
  return searchQuery.toString();
};

const parseQuery = (string) => {
  const params = new URLSearchParams(string);
  const search = params.get('search') || '';
  let page = params.get('page') || 1;
  page = parseInt(page);
  return {search, page};
};

const fetchData = (endpoint, args = {}) => {
  let url = `${baseURL}${endpoint}`;
  if (Object.keys(args).length) {
    const {date, license, name, page} = args;
    const created = `+created:">${date.toISOString().slice(0, 10)}"`;
    const lang = `+language:javascript`;
    const filter = license.length ? `+license:${license}` : '';
    const query = `${name}${created}${lang}${filter}`;
    const params = {
      sort: 'stars',
      order: 'desc',
      per_page: perPage,
      page: page
    };
    url = `${url}?q=${query}&${searchParams(params)}`;
  }
  return fetch(url)
    .then(response => response.json())
    .catch(error => error.message);
};

const fetchLicenses = async () => {
  const data = await fetchData('/licenses');
  return data;
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
