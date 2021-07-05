module.exports = (res, error) => {
  res.status(500).json({
      success: false,
      message: error.message ? error.message + more(error) : error
  })
}

function more (error) {
  const delimiter = ', '
  if (error.code === 'ETIMEDOUT') {
    return `${delimiter}MySQL server is unavailable`
  }
  return ''
}