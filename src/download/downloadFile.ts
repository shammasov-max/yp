import * as download from 'download'
import * as path from 'path'
export default async (url: string, directory: string, filename?: string) => {

  await download(url, directory, {filename})

}
