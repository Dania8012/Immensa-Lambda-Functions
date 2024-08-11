import apiClient from '../base'

export const getApprenticeProfile = (apprenticeId: string) => {
  return apiClient.get(`/apprentice/${apprenticeId}`)
}

export const getApprenticeBasicProfile = (apprenticeId: string) => {
  return apiClient.get(`/apprentice/basic-info/${apprenticeId}`)
}
