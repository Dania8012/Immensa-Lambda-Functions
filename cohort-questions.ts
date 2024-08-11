import apiClient from './base'

/**
 * To get list of cohort questions
 */
export const getCohortQuestions = (cohortId: string) => {
  return apiClient.get(`/cohort-questions/${cohortId}`).then(resp => resp.data)
}
