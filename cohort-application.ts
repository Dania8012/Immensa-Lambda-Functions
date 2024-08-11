import apiClient from './base'

/**
 * Creates new cohort application
 * @param data - an object of cohort application
 */
export const createCohortApplication = data => {
  return apiClient.post('/cohort-application', data).then(resp => resp.data)
}

/**
 * Get cohort applications based on logged in user
 */
export const getCohortApplicationByUserId = () => {
  return apiClient.get('/cohort-application').then(resp => resp.data)
}

/**
 * Withdraw cohort application
 */
export const withdrawCohortApplication = (id: string) => {
  return apiClient
    .patch(`/cohort-application/${id}/withdraw`)
    .then(resp => resp.data)
}

/**
 * Get cohort application by cohort ID
 */
export const getCohortApplicationByCohortId = (id: string) => {
  return apiClient.get(`/cohort-application/${id}`).then(resp => resp.data)
}
