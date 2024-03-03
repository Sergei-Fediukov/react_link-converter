import path from 'path'

import dotenv from 'dotenv'
import webpack from 'webpack'

import { buildWebpack } from './config/build/buildWebpack'
import { BuildPaths, BuildMode, BuildPlatform } from './config/build/types'

export interface EnvVariable {
  MODE?: (typeof BuildMode)[keyof typeof BuildMode]
  ANALYZER: boolean
  PLATFORM?: BuildPlatform
  PORT?: number
  API_URL: string
}

export default (env: EnvVariable) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'dist'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src')
  }
  dotenv.config()
  const config: webpack.Configuration = buildWebpack({
    port: Number(process.env.PORT) || 5031,
    mode: env.MODE || BuildMode.DEVELOPMENT,
    paths,
    analyzer: env.ANALYZER,
    platform: env.PLATFORM || BuildPlatform.DESKTOP,
    url: process.env.API_URL
  })
  return config
}
