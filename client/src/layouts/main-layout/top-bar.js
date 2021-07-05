import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
// import Logo from 'src/common/logo'
import AppUser from 'src/components/app/app-user'

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    height: theme.spacing(8),
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  spacer: {
    flexGrow: 1,
  },
}))

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles()

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to='/' className={classes.link}>
          {/* <Logo /> */}
          <Typography variant='h4' noWrap>
            A2 billing
          </Typography>
        </RouterLink>
        <div className={classes.spacer}></div>
        <AppUser />
      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string,
}

export default TopBar
