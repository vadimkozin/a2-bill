import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import SvgIcon from '@material-ui/core/SvgIcon'
import TextField from '@material-ui/core/TextField'
import CardContent from '@material-ui/core/CardContent'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'
import { Search as SearchIcon } from 'react-feather'
import { Link as RouterLink } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  search: {
    flexGrow: 1,
  },
  buttons: {
    // outline: '1px dotted green',
  },
  icon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: 16,
  },
}))

const Toolbar = ({ className, onSearch, selectedCust, ...rest }) => {
  const classes = useStyles()

  const handleChange = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.container}>
        <div className={classes.search}>
          <Card>
            <CardContent style={{ padding: 0 }}>
              {/* <Box maxWidth={320} width={320}> */}
              <Box>
                <TextField
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon fontSize='small' color='action'>
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Поиск по названию, типу, ИНН, ...'
                  variant='outlined'
                />
              </Box>
            </CardContent>
          </Card>
        </div>
        <div className={classes.buttons}>
          <Card>
            <IconButton
              aria-label='add customer'
              className={classes.icon}
              component={RouterLink}
              to='add'
            >
              <PersonAddOutlinedIcon fontSize={'default'} />
            </IconButton>
            <IconButton
              aria-label='edit customer'
              className={classes.icon}
              disabled={selectedCust === null ? true : false}
              component={RouterLink}
              to={selectedCust === null ? `#` : `edit/${selectedCust.custId}`}
            >
              <EditOutlinedIcon fontSize={'default'} />
            </IconButton>
          </Card>
        </div>
      </div>
    </div>
  )
}

Toolbar.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  selectedCust: PropTypes.object,
}

export default Toolbar
