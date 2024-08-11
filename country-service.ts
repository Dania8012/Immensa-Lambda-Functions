import apiClient from './base'
//get dialing codes
export const getDialingCodes = () => {
  return apiClient.get('/country/dial-codes').then(resp => resp.data)
}
