import { CorporateSignupDto } from 'pages/corporate/signup'
import apiClient from '../base'

export const registerCorporateUser = async (body: CorporateSignupDto) => {
  const response = await apiClient.post('auth/register', {
    name: body.fullName,
    email: body.email,
    password: body.password,
    country: body.country,
    companyName: body.company,
    role: 'PROFESSIONAL'
  })
  return response
}

export const verifyCorporateUser = async (
  email: string,
  verificationCode: number
) => {
  const response = await apiClient.post('auth/verify', {
    email,
    verificationCode
  })

  return response.status === 201 ? true : false
}

export const loginWithGoogle = async (token: string, role) => {
  const response = await apiClient.post('auth/google-signin', {
    token,
    role
  })
  return response
}

export const loginCorporateUser = async (email: string, password: string) => {
  const response = await apiClient.post('auth/signin', {
    email,
    password
  })

  return response
}

export const resetPassword = async (email: string) => {
  const response = await apiClient.post('auth/reset-password', { email })
  return response
}

export const changePassword = async (
  email: string,
  password: string,
  verificationCode: number
) => {
  const response = await apiClient.patch('auth/reset-password', {
    email,
    password,
    verificationCode
  })
  return response
}

export const updateUserPassword = async (
  oldPassword: string,
  password: string
) => {
  const response = await apiClient.post('auth/change-password', {
    oldPassword,
    password
  })
  return response
}
