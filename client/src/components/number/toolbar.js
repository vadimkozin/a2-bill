import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import SvgIcon from '@material-ui/core/SvgIcon';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Toolbar = ({ className, onSearch, placeholder='Поиск', ...rest }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={0}>
        <Card>
          <CardContent style={{padding: 0}} >
          <Box>
            <TextField
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder={placeholder}
              variant="outlined"
            />
          </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Toolbar;
