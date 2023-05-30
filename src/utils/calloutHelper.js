import axios from 'axios'

const getDriversData = async (method, url) => {
  const result = await axios({
    method: method,
    url: url,
  })
    .then((response) => {
      console.log('getDriversData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('getDriversData error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const getRideFaresData = async (method, url) => {
  const result = await axios({
    method: method,
    url: url,
  })
    .then((response) => {
      console.log('getRideFaresData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('getRideFaresData error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const getRidersData = async (method, url) => {
  const result = await axios({
    method: method,
    url: url,
  })
    .then((response) => {
      console.log('getRidersData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('getRidersData error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const getCouponsData = async (method, url) => {
  const result = await axios({
    method: method,
    url: url,
  })
    .then((response) => {
      console.log('getCouponsData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('getCouponsData error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const addNewCoupon = async (method, url, payload) => {
  console.log('payload>>>>>>' + payload)

  const result = await axios({
    method: method,
    url: url,
    data: payload,
  })
    .then((response) => {
      console.log('addNewCoupon response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('addNewCoupon error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

export { getDriversData, getRideFaresData, getRidersData, getCouponsData, addNewCoupon }
