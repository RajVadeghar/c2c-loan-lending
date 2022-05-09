import axios from 'axios'
import { server } from '../config'
import { getValue } from './common'

export const registeruser = async (payload) => {
  try {
    const res = await axios.post('/api/signup', payload)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    if (typeof errorMsg.errorMessage === 'object') {
      if (
        errorMsg.errorMessage.code === 11000 &&
        'username' in errorMsg.errorMessage.keyValue
      ) {
        return { hasError: true, errorMessage: 'Username already exists' }
      }
      if (
        errorMsg.errorMessage.code === 11000 &&
        'email' in errorMsg.errorMessage.keyValue
      ) {
        return { hasError: true, errorMessage: 'Email already exists' }
      }
      return { hasError: true, errorMessage: 'Invalid data' }
    }
    return errorMsg
  }
}

export const updateuser = async (payload) => {
  try {
    const res = await axios.put(`/api/user/${payload.id}`, payload)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const deleteuser = async (id) => {
  try {
    const res = await axios.delete(`/api/user/${id}`)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const getuser = async (id) => {
  try {
    const res = await axios.get(`${server}/api/user/${id}`)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const requestALoan = async (payload) => {
  try {
    const res = await axios.post(`/api/loan`, payload)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const deleteloan = async (id) => {
  try {
    const res = await axios.delete(`${server}/api/loan/${id}`)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const updateloan = async (payload) => {
  try {
    const res = await axios.put(`${server}/api/loan/${payload.id}`, payload)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const getLoans = async () => {
  try {
    const res = await axios.get(`${server}/api/loan`)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const getLoansByUser = async (id) => {
  try {
    const res = await axios.get(`${server}/api/loan/postedby/${id}`)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const getUserClassLinks = async (id) => {
  try {
    const res = await axios.get(`${server}/api/user/classlink/${id}`)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const updateClassLink = async (payload) => {
  try {
    const res = await axios.put(
      `${server}/api/classlink/${payload.id}`,
      payload
    )
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const deleteClassLink = async (payload) => {
  try {
    const res = await axios.delete(`${server}/api/classlink/${payload.id}`, {
      data: payload,
    })
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const getAssignments = async () => {
  try {
    const res = await axios.get(`${server}/api/assignments`)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const getAssignment = async (id) => {
  try {
    const res = await axios.get(`${server}/api/assignments/${id}`)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const postAssignment = async (payload) => {
  try {
    const res = await axios.post(`/api/assignments`, payload)
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const updateAssignment = async (payload) => {
  try {
    const res = await axios.put(
      `${server}/api/assignments/${payload.id}`,
      payload
    )
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}

export const deleteAssignment = async (payload) => {
  try {
    const res = await axios.delete(`${server}/api/assignments/${payload.id}`, {
      data: payload,
    })
    return res.data
  } catch (error) {
    const errorMsg = getValue(error, ['response', 'data'])
    return errorMsg
  }
}
