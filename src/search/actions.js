const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
const SET_NAME = 'SEARCH/SET_NAME';

const setName = ({value, which}) => ({
  type: SET_NAME,
  name: value,
});

export {
  LOCATION_CHANGE,
  SET_NAME,
  setName
};
