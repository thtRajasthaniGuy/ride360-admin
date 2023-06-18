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

const searchRideFaresData = async (method, url) => {
  const result = await axios({
    method: method,
    url: url,
  })
    .then((response) => {
      console.log('searchRideFaresData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('searchRideFaresData error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const addRideFare = async (method, url, payload) => {
  const result = await axios({
    method: method,
    url: url,
    data: payload,
    headers: {
      'Content-type': 'multipart/form-data;',
    },
  })
    .then((response) => {
      console.log('addRideFare response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('addRideFare error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const updateRideFaresData = async (method, url, payload) => {
  const result = await axios({
    method: method,
    url: url,
    data: payload,
    headers: {
      'Content-type': 'multipart/form-data;',
    },
  })
    .then((response) => {
      console.log('updateRideFaresData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('updateRideFaresData error :::====>>' + JSON.stringify(error))
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
  const result = await axios({
    method: method,
    url: url,
    data: payload,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
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

const deleteCoupon = async (method, url, payload) => {
  const result = await axios({
    method: method,
    url: url,
    data: payload,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => {
      console.log('deleteCoupon response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('deleteCoupon error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const getDriverLicenseData = async (method, url) => {
  const result = await axios({
    method: method,
    url: url,
  })
    .then((response) => {
      console.log('getDriverLicenseData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('getDriverLicenseData error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const getDriverVehicleData = async (method, url) => {
  const result = await axios({
    method: method,
    url: url,
  })
    .then((response) => {
      console.log('getDriverVehicleData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('getDriverVehicleData error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const updateDriverAccountStatus = async (method, url, payload) => {
  const result = await axios({
    method: method,
    url: url,
    data: payload,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => {
      console.log('updateDriverAccountStatus response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('updateDriverAccountStatus error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const driverBasicUpdate = async (method, url, payload) => {
  const result = await axios({
    method: method,
    url: url,
    data: payload,
    headers: {
      'Content-type': 'multipart/form-data;',
    },
  })
    .then((response) => {
      console.log('driverBasicUpdate response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('driverBasicUpdate error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const updateDriverVehicleData = async (method, url, payload) => {
  const result = await axios({
    method: method,
    url: url,
    data: payload,
    headers: {
      'Content-type': 'multipart/form-data;',
    },
  })
    .then((response) => {
      console.log('updateDriverVehicleData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('updateDriverVehicleData error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const updateDriverLicenseData = async (method, url, payload) => {
  const result = await axios({
    method: method,
    url: url,
    data: payload,
    headers: {
      'Content-type': 'multipart/form-data;',
    },
  })
    .then((response) => {
      console.log('updateDriverLicenseData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('updateDriverLicenseData error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const getInviteReferralHistoryData = async (method, url) => {
  const result = await axios({
    method: method,
    url: url,
  })
    .then((response) => {
      console.log('getInviteReferralHistoryData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('getInviteReferralHistoryData error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

const getRideHistoryData = async (method, url, payload) => {

  const result = await axios({
    method: method,
    url: url
  })
    .then((response) => {
      console.log('getRideHistoryData response :::====>>' + JSON.stringify(response))
      return response
    })
    .catch((error) => {
      console.log('getRideHistoryData error :::====>>' + JSON.stringify(error))
      return error
    })
  return result
}

export {
  getDriversData,
  getRideFaresData,
  getRidersData,
  getCouponsData,
  addNewCoupon,
  deleteCoupon,
  getDriverLicenseData,
  getDriverVehicleData,
  updateDriverAccountStatus,
  driverBasicUpdate,
  updateDriverVehicleData,
  updateDriverLicenseData,
  searchRideFaresData,
  addRideFare,
  updateRideFaresData,
  getInviteReferralHistoryData,
  getRideHistoryData
}
