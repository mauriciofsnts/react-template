const getExpiresTime = (): number => {
  // get current date and 5 minutes
  const date = new Date()
  date.setMinutes(date.getMinutes() + 5)

  // return date as timestamp
  return Math.round(+date / 1000)
}

const token = {
  accessToken: '#',
  refreshToken: '#',
  expiresIn: 300,
  expiresAt: getExpiresTime()
}

export {
  token
}
