import { notify } from '@qureos/modules-lib'
import axios from 'axios'
import { CohortDTO, CohortMentorshipSession } from 'types/cohort'
import {
  feedbackFromMentorDTO,
  TaskDTO,
  taskFilter,
  finalSubmissionFeedbackDTO
} from 'types/task'
import apiClient from './base'

interface UserDto {
  _id: string
  firstName: string
  lastName: string
  email: string
}

interface ProficiencyDto {
  _id: string
  title: string
}

interface SkillDto {
  _id: string
  title: string
}

interface CohortInterestDto {
  skill: SkillDto
  proficiency: ProficiencyDto
  user: UserDto
}

export const sendInterest = (dto: CohortInterestDto) => {
  return apiClient.post('/cohort/interest', dto).then(resp => resp.data)
}

/**
 * To create new cohort
 * @param dto - an object of cohort being created
 */
export const createCohort = (dto: CohortDTO) => {
  return apiClient.post('/cohort', dto).then(resp => resp.data)
}

/**
 * To update the existing cohort
 * @param cohortId - an ID of the cohort
 * @param dto - an object of the cohort data
 */
export const updateCohort = (cohortId: string, { ...dto }: CohortDTO) => {
  delete dto['tasks']
  delete dto['mentorshipSession']
  delete dto['emailNotificationStatus']
  delete dto['icsUrl']
  delete dto['isEmailSent']
  delete dto['createdBy']
  delete dto['updatedBy']
  delete dto['createdDateTime']
  delete dto['updatedDateTime']
  return apiClient.put(`/cohort/${cohortId}`, dto).then(resp => resp.data)
}

export const updateCohortTasks = (cohortId: string, dto: TaskDTO[]) => {
  return apiClient.put(`/cohort/tasks/${cohortId}`, dto).then(resp => {
    return resp.data
  })
}

export const updateCohortMentorshipSession = (
  cohortId: string,
  dto: CohortMentorshipSession[]
) => {
  return apiClient
    .put(`/cohort/mentorshipSession/${cohortId}`, dto)
    .then(resp => {
      if (resp.status === 200) {
        notify({
          message: 'Mentorship Session update successfully',
          type: 'success'
        })
      }
      return resp.data
    })
}

//cohort management
export const getMentorCohortList = () => {
  return apiClient.get(`/cohort/mentor`).then(resp => {
    return resp.data
  })
}
// cohort company
export const getCohortCompany = (cohortId: string) => {
  return apiClient.get(`/cohort/company/${cohortId}`).then(resp => {
    return resp.data
  })
}
// cohort Apprentices
export const getCohortApprentices = (cohortId: string) => {
  return apiClient.get(`/cohort/apprentice-list/${cohortId}`).then(resp => {
    return resp.data
  })
}
// cohort Tasks
export const getCohortTasks = (cohortId: string) => {
  return apiClient.get(`/cohort/tasks/${cohortId}`).then(resp => {
    return resp.data
  })
}
// cohort Earnings
export const getCohortEarning = (cohortId: string) => {
  return apiClient.get(`/cohort/earning/${cohortId}`).then(resp => {
    return resp.data
  })
}
// cohort Cohort Count
export const getCohortApprenticesCount = (cohortId: string) => {
  return apiClient.get(`/cohort/apprentice-count/${cohortId}`).then(resp => {
    return resp.data
  })
}
// cohort Mentorship Session
export const getCohortMentorshipSession = (cohortId: string) => {
  return apiClient.get(`/cohort/mentorship-session/${cohortId}`).then(resp => {
    return resp.data
  })
}
// cohort Top Countries
export const getCohortTopCountries = (cohortId: string) => {
  return apiClient.get(`/cohort/top-countries/${cohortId}`).then(resp => {
    return resp.data
  })
}
// update cohort Task
export const updateCohortTask = (cohortId: string, dto: TaskDTO) => {
  return apiClient
    .put(`/cohort/single-task/${cohortId}`, { task: dto })
    .then(resp => {
      return resp.data
    })
}
// get apprentices Profile
export const getApprenticeProfile = apprenticeId => {
  const url = process.env.API_URI
  return axios.get(`${url}/public-apprentice/${apprenticeId}`).then(resp => {
    return resp.data
  })
}
// get cohort feedbacks
export const getCohortFeedbacks = (cohortId: string, filter: taskFilter[]) => {
  return apiClient
    .post(`/cohort/feedback-requests/${cohortId}`, { taskFilters: filter })
    .then(resp => {
      return resp.data
    })
}

export const getCohortSchedule = (cohortId: string) => {
  return apiClient.get(`/cohort/schedule/${cohortId}`).then(resp => {
    return resp.data
  })
}

export const updateFeedbackRequestByMentor = (
  feedbackRequestId: string,
  dto: feedbackFromMentorDTO
) => {
  return apiClient
    .put(`/cohort/mentor/feedback/${feedbackRequestId}`, dto)
    .then(resp => {
      if (resp.status === 200) {
        notify({
          message: 'Feedback submitted successfully',
          type: 'success'
        })
      }
      return resp
    })
}
export const getFeedbackTaskDetails = (cohortId: string, taskId: string) => {
  return apiClient
    .get(`/cohort/task-details/${cohortId}/${taskId}`)
    .then(resp => {
      return resp.data
    })
}
export const getReviewsOfCohort = (cohortId: string) => {
  return apiClient.get(`/cohort/reviews/${cohortId}`).then(resp => {
    return resp.data
  })
}
export const getReviewsRatingOfCohort = (cohortId: string) => {
  return apiClient.get(`/cohort/review-ratings/${cohortId}`).then(resp => {
    return resp.data
  })
}
export const getReviewsCountOfCohort = (cohortId: string) => {
  return apiClient.get(`/cohort/reviews/count/${cohortId}`).then(resp => {
    return resp.data
  })
}
export const getCohortSubmissionFeedBack = (
  cohortId: string,
  filter: taskFilter[]
) => {
  return apiClient
    .post(`/cohort/submissions/${cohortId}`, { taskFilters: filter })
    .then(resp => {
      return resp.data
    })
}
export const updateFinalSubmissionFeedBack = (
  cohortId: string,
  taskId: string,
  apprenticeId: string,
  dto: finalSubmissionFeedbackDTO
) => {
  return apiClient
    .put(
      `/cohort/mentor/submission-feedback/${cohortId}/${taskId}/${apprenticeId}`,
      dto
    )
    .then(resp => {
      if (resp.status === 200) {
        notify({
          message: 'Final Feedback submitted successfully',
          type: 'success'
        })
      }
      return resp
    })
}

// To get list of pending reviews

export const getPendingReviews = (cohortId: string) => {
  return apiClient.get(`/cohort/pending-reviews/${cohortId}`).then(resp => {
    return resp.data
  })
}

// To send review request
export const sendRatingRequest = (cohortId: string, apprenticeId: string) => {
  return apiClient
    .post(`/cohort/send-review-request/${cohortId}/${apprenticeId}`)
    .then(resp => {
      if (resp.status === 201) {
        notify({
          message: 'Request Sent',
          type: 'success'
        })
      }
      return resp
    })
}

// To send review request to all
export const sendReviewRequestAll = (cohortId: string) => {
  return apiClient
    .post(`/cohort/send-review-request-all/${cohortId}`)
    .then(resp => {
      if (resp.status === 201) {
        notify({
          message: 'Request Sent to all',
          type: 'success'
        })
      }
      return resp
    })
}
export const getMentorSupport = () => {
  return apiClient.get(`/mentor-support`).then(resp => {
    return resp.data
  })
}

/**
 * To get all cohorts
 */
export const getAllCohorts = () => {
  return apiClient.get('/cohort').then(resp => resp.data)
}

/**
 * Get cohort details by ID
 * @param cohortId - an ID of the cohort
 */
export const getCohortDetails = (cohortId: string) => {
  return apiClient.get(`/cohort/${cohortId}`).then(resp => resp)
}

/**
 * Get Companies
 *
 */
export const getDummyCompanies = () => {
  return apiClient.get(`/company/dummy`).then(resp => resp)
}

/**
 * For Admin to approve a cohort
 *
 */
export const approveCohort = async (cohortId: string) => {
  return apiClient.post(`/cohort/approve?cohortId=${cohortId}`)
}

/**
 * For Admin to delete a cohort
 *
 */
export const deleteCohort = async (cohortId: string) => {
  return apiClient.delete(`/cohort/${cohortId}`).then(resp => resp.data)
}

/**
 * Get only approved cohorts
 *
 */
export const getApprovedCohortList = () => {
  return apiClient.get(`/cohort/approved`).then(resp => {
    return resp.data
  })
}

export const getNotifications = (cohortId: string) => {
  return apiClient
    .get(`/cohort/${cohortId}/notifications`)
    .then(resp => resp.data)
}
/**
 * Get Task Updates
 *
 */
export const getTaskUpdates = (taskId: string) => {
  return apiClient.get(`/cohort/task-update/${taskId}`).then(resp => resp)
}
/**
 * Post Task Updates
 *
 */
export const postTaskUpdates = (cohortId: string, taskId: string, data) => {
  return apiClient
    .post(`/cohort/task-update/${cohortId}/${taskId}`, data)
    .then(resp => resp)
}
/**
 * Update Task Update
 *
 */
export const updateTaskUpdates = (taskUpdateId: string, data) => {
  return apiClient
    .put(`/cohort/task-update/${taskUpdateId}`, data)
    .then(resp => resp)
}
/**
 * Delete Task Update
 *
 */
export const deleteTaskUpdates = (taskUpdateId: string) => {
  return apiClient
    .put(`/cohort/task-update/delete/${taskUpdateId}`)
    .then(resp => resp)
}
