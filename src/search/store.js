import {
  SET_NAME
} from './actions';

const initialState = {
  name: ''
};

const search = (
  state = initialState,
  {
    name,
    type,
  }) => {
  switch (type) {
    case SET_NAME:
      return {
        ...state,
        name
      };
    default:
      return state;
  }
};

export default search;
