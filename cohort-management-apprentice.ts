import apiClient from './base'
import { apprenticeTaskFilter } from 'types/task'
import { feedbackRequest, finalSubmission } from 'types/cohort-apprentice-type'
import { notify } from '@qureos/modules-lib'
export const getApprenticeCohortSchedule = (cohortId: string) => {
  return apiClient.get(`/cohort-apprentice/schedule/${cohortId}`).then(resp => {
    return resp.data
  })
}
export const getApprenticeCohortCompany = (cohortId: string) => {
  return apiClient.get(`/cohort-apprentice/company/${cohortId}`).then(resp => {
    return resp.data
  })
}
// get apprentice Support
export const getApprenticeSupport = () => {
  return apiClient.get(`/apprentice-support`).then(resp => {
    return resp.data
  })
}

// get apprentice cohort resources
export const getApprenticeCohortResources = (cohortId: string) => {
  return apiClient
    .get(`/cohort-apprentice/cohort-resources/${cohortId}`)
    .then(resp => {
      return resp.data
    })
}
/*
 * getting mentor profile
 */
export const getCohortMentorProfile = (cohortId: string) => {
  return apiClient.get(`/profile/mentor/${cohortId}`).then(resp => {
    return resp.data
  })
}

// get tasks of apprentice
export const getTasksOfApprentice = (
  cohortId: string,
  taskFilters: apprenticeTaskFilter
) => {
  return apiClient
    .post(`/cohort-apprentice/tasks/${cohortId}`, { taskFilters })
    .then(resp => {
      return resp.data
    })
}
// update status of apprentice task
export const updateApprenticeTaskStatus = (
  cohortProgressId: string,
  status: string
) => {
  return apiClient
    .put(`/cohort-apprentice/task/${cohortProgressId}`, { status })
    .then(resp => {
      return resp.data
    })
}
// update final submission of a task of apprentice
export const updateApprenticeTaskFinalSubmission = (
  cohortProgressId: string,
  finalSubmission: finalSubmission
) => {
  return apiClient
    .put(`/cohort-apprentice/final-submission/${cohortProgressId}`, {
      finalSubmission
    })
    .then(resp => {
      return resp.data
    })
}
// update feedback request of a task of apprentice
export const updateApprenticeTaskFeedbackRequest = (
  cohortProgressId: string,
  feedbackRequest: feedbackRequest
) => {
  return apiClient
    .put(`/cohort-apprentice/feedback-request/${cohortProgressId}`, {
      feedbackRequest
    })
    .then(resp => {
      return resp.data
    })
}
// get tasks files of apprentice
export const getTasksFilesOfApprentice = (cohortId: string, taskId: string) => {
  return apiClient
    .get(`/cohort-apprentice/task-files/${cohortId}/${taskId}`)
    .then(resp => {
      return resp.data
    })
}
// To get updates related to task by task ID
export const getTaskUpdates = (taskId: string) => {
  return apiClient
    .get(`/cohort-apprentice/task-updates/${taskId}`)
    .then(resp => {
      return resp.data
    })
}

// Give feedback  to mentor
export const giveFeedbackForMentor = (cohortId: string, body) => {
  return apiClient
    .post(`/cohort-apprentice/mentor-feedback/${cohortId}`, {
      mentorFeedback: body
    })
    .then(resp => {
      console.log(resp.status)
      if (resp.status === 201) {
        notify({
          message: 'Mentor feedback submitted successfully',
          type: 'success'
        })
      }
      return resp.data
    })
}

// To get followers count of mentor by cohort ID
export const getMentorFollowersCount = (cohortId: string) => {
  return apiClient
    .get(`/cohort-apprentice/mentor/followers-count/${cohortId}`)
    .then(resp => {
      return resp.data
    })
}

// To get followers count of mentor by cohort ID
export const getStatusOfAllTasksCompleted = (cohortId: string) => {
  return apiClient
    .get(`/cohort-apprentice/all-tasks-completed-status/${cohortId}`)
    .then(resp => {
      return resp.data
    })
}
