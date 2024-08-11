import apiClient from '../base'

export type AlertsDto = {
  notifications?: boolean
  messages?: boolean
}

export type CorporateUserProfileDto = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  phoneCountryCode?: string
  phonePrefix?: string
  photo?: string
  isProfileCompleted?: boolean
  alerts?: AlertsDto
}

export const updateUserProfile = async (dto: CorporateUserProfileDto) => {
  const response = apiClient.post('/profile', { ...dto })

  return response
}

export const getUserProfile = async () => {
  const response = await apiClient.get('/profile')
  return response
}

export const inviteCompanyMember = async (email: string, jobTitle: string) => {
  const response = await apiClient.post('/company-member', {
    email,
    jobTitle
  })

  return response
}

export const getAllMembers = async () => {
  const response = await apiClient.get('/company-member')

  return response
}

export const getInviteDetails = async (inviteId: string) => {
  const response = await apiClient.get(`/company-member/${inviteId}`)

  return response
}

export const acceptInvite = async (inviteId: string) => {
  const response = await apiClient.put(`/company-member/accept/${inviteId}`)

  return response
}

export const rejectInvite = async (inviteId: string) => {
  const response = await apiClient.put(`/company-member/reject/${inviteId}`)

  return response
}

export const deleteMember = async (inviteId: string) => {
  const response = await apiClient.delete(`/company-member/${inviteId}`)

  return response
}

export const deleteMembers = async (inviteIds: string[]) => {
  const response = await apiClient.post('/company-member/delete-members', {
    inviteIds
  })

  return response
}
