function authenticateUser (token) {
  localStorage.setItem('token', token)
}

function isUserAuthenticated () {
  return localStorage.getItem('token') !== null
}

function deauthenticateUser () {
  let basePath = window.location.origin
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

function getToken () {
  return localStorage.getItem('token')
}

function getUser () {
  return JSON.parse(localStorage.getItem('user'))
}

function checkResponse (res) {
  if (res.status === 401) {
    console.log('redirect')
  }
}

module.exports = {
  authenticateUser: authenticateUser,
  isUserAuthenticated: isUserAuthenticated,
  deauthenticateUser: deauthenticateUser,
  getToken: getToken,
  getUser: getUser,
  checkResponse: checkResponse
}
