import axios from 'axios'

const websitesApi = '/api/websites'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.timeout = 10000

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllWebsites = async (): Promise<any> => {
  const websiteRepsponseDtos = await axios.get(websitesApi)

  console.info(websiteRepsponseDtos)
  return websiteRepsponseDtos.data ?? null
}
