import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '//localhost:3030/api/'

const axios = Axios.create({
  withCredentials: true
})

export const httpService = {
  get,
  post,
  put,
  delete: _delete,
}
async function get(endpoint, data) {
  return await ajaxWithAsyncAwait(endpoint, 'GET', data)
}

async function post(endpoint, data) {
  return await ajaxWithAsyncAwait(endpoint, 'POST', data)
}

async function put(endpoint, data) {
  return await ajaxWithAsyncAwait(endpoint, 'PUT', data)
}

async function _delete(endpoint, data) {
  return await ajaxWithAsyncAwait(endpoint, 'DELETE', data)
}

async function ajaxWithAsyncAwait(endpoint, method = 'GET', data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: (method === 'GET') ? data : null
    })
    return res.data
  } catch (err) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
    console.dir(err)
    if (err.response && err.response.status === 401) {
      sessionStorage.clear()
      window.location.assign('/')
    }
    throw err
  }
}