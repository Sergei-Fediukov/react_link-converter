import type { Configuration } from 'webpack-dev-server'

import { BuildOptions } from './types'

export const buildDevServer = ({ port, url }: BuildOptions): Configuration => ({
  port,
  open: true,
  // Enable client routing for dev server
  historyApiFallback: {
    rewrites: [{ from: /./, to: '/index.html' }],
    index: 'index.html'
  },
  // Refresh content without reloading page
  hot: true,
  compress: true,
  client: {
    logging: 'info',
    overlay: false
  },
  proxy: {
    '/api': {
      target: url,
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  }
})
