import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import SvgIcon from '@material-ui/core/SvgIcon'
import TextField from '@material-ui/core/TextField'
import CardContent from '@material-ui/core/CardContent'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'
import { Search as SearchIcon } from 'react-feather'
import MySelect from 'src/common/select'
import { tariffsTelList } from 'src/store/tariffs'

const useStyles = makeStyles((theme) => ({
  root: {},
  select: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grid: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  element: {
    [theme.breakpoints.down('415')]: {
      maxWidth: 320,
    },
    [theme.breakpoints.down('321')]: {
      maxWidth: 230,
    },
  },
  cardContent: {
    padding: 0,
  },
}))

const Toolbar = ({
  className,
  onSearch,
  onSelect,
  tariff,
  searchText,
  placeholder = 'Поиск',
  ...rest
}) => {
  const classes = useStyles()

  const handleSelect = (e) => {
    const value = e.target.value
    if (value) {
      onSelect(e.target.value)
    }
  }

  const handleChange = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} sm={6}>
          <Box mt={0} className={classes.element}>
            <Card>
              <CardContent
                style={{ paddingBottom: 8 }}
                className={classes.cardContent}
              >
                <MySelect
                  className={classes.select}
                  name='tarTel'
                  options={tariffsTelList}
                  option_label='label'
                  option_value='tid'
                  value={tariff}
                  label={'тариф телефонии'}
                  placeholder='Введите тариф телефонии'
                  required={false}
                  handleChange={handleSelect}
                />
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mt={0} className={classes.element}>
            <Card>
              <CardContent
                style={{ paddingBottom: 0 }}
                className={classes.cardContent}
              >
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
                    placeholder={placeholder}
                    variant='outlined'
                    value={searchText}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

Toolbar.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  searchText: PropTypes.string,
}

export default Toolbar
