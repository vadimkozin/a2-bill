import React, { useState, useEffect } from 'react'
// import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const Notify = ({ message = '', show = 0, duration = 2000 }) => {
  const [open, setOpen] = useState(Boolean(show))

  useEffect(() => {
    setOpen(Boolean(show))
  }, [show])

  const handleClose = (event, reason) => {
    setOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      message={message}
      action={
        <IconButton
          size='small'
          aria-label='close'
          color='inherit'
          onClick={handleClose}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      }
    />
  )
}

export default Notify
