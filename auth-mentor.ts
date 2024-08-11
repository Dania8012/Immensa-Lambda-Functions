import { SignupDto } from 'pages/mentor/signup'
import apiClient from './base'

export const registerMentor = async (body: SignupDto) => {
  const resp = await apiClient.post('auth/register', {
    name: `${body.firstName} ${body.lastName}`,
    email: body.email,
    password: body.password,
    role: 'MENTOR'
  })
  return resp.data
}

export const resendEmailVerification = async (email: string) => {
  const resp = await apiClient.post('auth/resend-verification', {
    email
  })
  return resp.data
}

export const verifyMentor = async (email: string, code: number) =>
  apiClient.post('/auth/verify', {
    email,
    verificationCode: code
  })

export const signInMentor = async (email: string, password: string) => {
  const resp = await apiClient.post('auth/signin', {
    email,
    password
  })
  return resp.data
}

export const signInWithGoogle = async (token: string, role?: string) => {
  const resp = await apiClient.post('auth/google-signin', {
    token,
    role
  })
  return resp.data
}

export const signInWithLinkedin = async (token: string) => {
  const resp = await apiClient.post('auth/linkedin-login', {
    token
  })
  return resp.data
}
