import apiClient from './base'

//get tools
export const getTools = () => {
  return apiClient.get('/categories/tools').then(resp => resp.data)
}
/**
 * To get list of categories
 */
export const getAllCategories = () => {
  return apiClient.get('/categories').then(resp => resp.data)
}
/**
 *
 * @param type
 */
export const getCategoriesBasedOnType = (type: string) => {
  return apiClient.get('/categories/:type').then(resp => resp.data)
}
