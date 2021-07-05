import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import { NavLink as RouterLink } from 'react-router-dom'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const NavItem = ({ className, href, icon: Icon, text, onClick, ...rest }) => {
  return (
    <ListItem
      button
      component={RouterLink}
      to={href}
      onClick={onClick}
      {...rest}
    >
      <ListItemIcon>{<Icon />}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  text: PropTypes.string,
}

export default NavItem
