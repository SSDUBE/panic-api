const {NODE_ENV} = process.env;

export default {
  dialect: 'pg' as 'pg',
  minify: NODE_ENV === 'production',
};
