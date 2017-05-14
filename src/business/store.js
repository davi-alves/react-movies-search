/* eslint-disable */

const store = process.env.NODE_ENV === 'development'
  ? require('./store/store.dev').default
  : require('./store/store.prod').default;

export default store;
