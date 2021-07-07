module.exports = (res, error) => {
  res.status(500).json({
      success: false,
      message: error.message ? error.message + more(error) : error,
      // code: error.code ? error.code : 'NOCODE',
      ecode: error.code ? error.code : 'NOCODE'
  })
}

function more (error) {
  const delimiter = ', '
  if (error.code === 'ETIMEDOUT') {
    return `${delimiter}MySQL server is unavailable`
  }
  return ''
}