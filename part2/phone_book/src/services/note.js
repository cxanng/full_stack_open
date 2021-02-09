import axios from 'axios'

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(res => res.data)
}

const createNewPerson = newPerson => {
  const request = axios.post(baseURL, newPerson)
  return request.then(res => res.data)
}

const deletePerson = id => axios.delete(`${baseURL}/${id}`)

const updatePerson = ( id, newPerson ) => {
  const request = axios.put(`${baseURL}/${id}`, newPerson)
  return request.then(res => res.data)
}

export default { getAll, createNewPerson, deletePerson, updatePerson }