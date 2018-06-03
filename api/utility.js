module.exports = {
  formatDate: formatDate,
  pad: pad,
  validatePayment: validatePayment,
  isNumeric: isNumeric
}

function formatDate (date) {
  var day = date.getDate()
  var month = date.getMonth()
  var year = date.getFullYear()

  // we need this since months in Date() start from 0
  var fixMonth = 1

  return year + '-' + pad(month + fixMonth) + '-' + pad(day)
}

function pad (d) {
  return (d < 10) ? '0' + d.toString() : d.toString()
}

function validatePayment (price, userPaymentData) {
  let validCards = [
    '4242-4242-4242-4242',
    '1111-1111-1111-1111',
    '2222-2222-2222-2222',
    '3333-3333-3333-3333',
    '3333-3333-3333-3333'
  ]

  let validCvv = [
    '111',
    '222',
    '333',
    '444',
    '555',
    '666',
    '777',
    '888',
    '999'
  ]
  if (validCards.indexOf(userPaymentData.card) === -1 || validCvv.indexOf(userPaymentData.cvv) === -1) {
    return false
  }
  return true
}

function isNumeric (x) {
  return !(isNaN(x)) && (typeof x !== 'object') &&
    (x != Number.POSITIVE_INFINITY) && (x != Number.NEGATIVE_INFINITY)
}
