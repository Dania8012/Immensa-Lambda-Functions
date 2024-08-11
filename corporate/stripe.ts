import { IPaymentMethod, SetupIntent } from 'types/stripe'
import apiClient from '../base'

export const getSetupIntent = async () => {
  const response = await apiClient.get<SetupIntent>('/payment/intent')
  return response.data
}

export const getPaymentMethods = async () => {
  const response = await apiClient.get<IPaymentMethod[]>('/payment/method')
  return response.data
}
