import React from 'react'
import clsx from 'clsx'
import { Outlet } from 'react-router-dom'
import List from '@material-ui/core/List'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import CssBaseline from '@material-ui/core/CssBaseline'
import { NavLink as RouterLink } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import HomeOutlinedIcon  from '@material-ui/icons/HomeOutlined';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AppHeader from 'src/components/app/app-header'
import AppUser from 'src/components/app/app-user'
import itemsRouting from 'src/routing/items-routing'
import NavItem from './nav-item'


const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // необходимо, чтобы контент был ниже app bar
    // ...theme.mixins.toolbar,
    minHeight: theme.spacing(5) + 4,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
  },
  spacer: {
    flexGrow: 2,
  },
}))

const DashboardLayout = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(null)
  const isSmallDevice = !useMediaQuery('(min-width:1024px)')

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
    if (open && isSmallDevice) {
      handleDrawerClose()
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          
          <IconButton
            color='inherit'
            aria-label='go home'
            component={RouterLink}
            to={'/'}
          >
            <HomeOutlinedIcon />
          </IconButton>


          <AppHeader />
          <div className={classes.spacer}></div>
          <AppUser />
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRightIcon fontSize='large' />
            ) : (
              <KeyboardArrowLeftIcon fontSize='large' />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {itemsRouting.map((item, index) => (
            <NavItem
              key={item.text}
              href={item.href}
              text={item.text}
              icon={item.icon}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            />
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
