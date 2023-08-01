import axios, { AxiosInstance } from 'axios'

const httpClient: AxiosInstance = axios.create({
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

export { httpClient }
