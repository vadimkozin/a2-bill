import React from 'react'
import Menu from '@material-ui/core/Menu'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
// import { Search as SearchIcon } from 'react-feather'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { TOOLBAR_SEARCH_TYPE } from 'src/types/types'

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'rgb(38, 50, 56)',
    backgroundColor: 'white',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginRight: theme.spacing(1),
    },
  },
  search: {
    flexGrow: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid',
    borderColor: 'rgba(224, 224, 224, 1)',
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'lightslategrey',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      // width: '20ch',
      width: '100%',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

const ToolbarSearch = ({
  title = '',
  placeholder = 'Search...',
  params,
  onSearch,
}) => {
  const classes = useStyles()
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const navigate = useNavigate()

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleMobileMenuSelect = (to) => (event) => {
    navigate(to)
  }

  const handleChange = (event) => {
    onSearch(event.target.value)
  }

  const mobileMenuId = 'search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {params.buttons.map((btn) => {
        return (
          <MenuItem
            key={btn.id}
            onClick={handleMobileMenuSelect(btn.to)}
            disabled={btn.disabled}
          >
            <IconButton
              aria-label={btn.areaLabel}
              component={RouterLink}
              to={btn.to}
              disabled={btn.disabled}
            >
              {btn.icon}
            </IconButton>
            <p>{btn.text}</p>
          </MenuItem>
        )
      })}
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar variant='dense' className={classes.root}>
          <Typography className={classes.title} variant='h6' noWrap>
            {title}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={placeholder}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {params.buttons.map((btn) => {
              return (
                <Tooltip key={btn.id} title={btn.disabled ? btn.tooltipDisabled : btn.tooltip}>
                  <span>
                  <IconButton
                    aria-label={btn.areaLabel}
                    component={RouterLink}
                    to={btn.to}
                    disabled={btn.disabled}
                  >
                    {btn.icon}
                  </IconButton>
                  </span>
                </Tooltip>
              )
            })}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  )
}

ToolbarSearch.propTypes = TOOLBAR_SEARCH_TYPE
export default ToolbarSearch
