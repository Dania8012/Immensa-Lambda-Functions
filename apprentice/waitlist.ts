import apiClient from '../base'

export const joinWaitlist = (event: string) => {
  return apiClient.post(`/waitlist`, {
    event
  })
}

export const jobApply = (job: string) =>
  apiClient.post('/job-enrollments', {
    job
  })
