import * as fs from 'fs'

export class FileService {
  async checkFileExists(path: string) {
    return fs.promises
      .access(path, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)
  }

  async folderExistenceCheck(folderPath: string) {
    if (!(await this.checkFileExists(folderPath))) {
      fs.mkdirSync(folderPath, { recursive: true })
    }
  }

  async createFile(path: string, data: Buffer | string) {
    await fs.promises.writeFile(path, data)
  }
}
