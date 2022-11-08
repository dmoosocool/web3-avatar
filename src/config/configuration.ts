export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  ipfs: process.env.IPFS || 'https://lens.infura-ipfs.io/ipfs/',
  lensApi: process.env.LENS_API || 'https://api.lens.dev/',
  alchemyKey: process.env.ALCHEMY_KEY || '',
  graphql: {
    debug: process.env.GRAPHQL_DEBUG || false,
    playground: process.env.GRAPHQL_PLAYGROUND || false,
  },
  mongodb: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/myFirstDatabase?retryWrites=true&w=majority',
    ssl: process.env.MONGODB_SSL || false,
  },
})
