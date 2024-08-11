import apiClient from './base'

export const getTemplates = (category: string, proficiency: string) => {
  return apiClient
    .get(`/cohort-template?category=${category}&proficiency=${proficiency}`)
    .then(resp => resp.data)
}
