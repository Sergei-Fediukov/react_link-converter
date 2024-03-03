import webpack from 'webpack'

import { BuildOptions } from './types'

export const buildResolvers = ({ paths }: BuildOptions): webpack.Configuration['resolve'] => ({
  extensions: ['.tsx', '.ts', '.js'],
  alias: {
    src: paths.src
  }
})
