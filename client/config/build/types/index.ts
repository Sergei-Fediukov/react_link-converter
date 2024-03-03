export interface BuildPaths {
  entry: string
  html: string
  output: string
  public: string
  src: string
}

export const enum BuildMode {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development'
}
export const enum BuildPlatform {
  MOBILE = 'mobile',
  DESKTOP = 'desktop'
}

export interface BuildOptions {
  port: number
  paths: BuildPaths
  mode: BuildMode
  platform: BuildPlatform
  analyzer?: boolean
  url: string
}
