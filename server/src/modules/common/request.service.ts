import https from 'https'

export class RequestService {
  checkEndpointAvailability(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const request = https.get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers['location']) {
          // If received status code is 301 and there is a new URL in the Location header, confirm the new URL
          resolve(this.checkEndpointAvailability(response.headers['location']))
        } else {
          // Or validate status code from response
          resolve(response.statusCode >= 200 && response.statusCode < 300)
        }
      })

      request.on('error', () => {
        resolve(false)
      })

      request.end()
    })
  }
}
