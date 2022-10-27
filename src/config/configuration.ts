export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  ipfs: process.env.IPFS || 'https://lens.infura-ipfs.io/ipfs/',
  lensApi: process.env.LENS_API || 'https://api.lens.dev/',
})
