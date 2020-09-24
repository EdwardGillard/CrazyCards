import axios from 'axios'

//! Exported function to use axios to send a great request and return the JSON response.
export const getAllCards = () => {
  return axios.get('https://5f6b8831f2e1370016ca2ce9.mockapi.io/api/availablecards/availablecards')
}