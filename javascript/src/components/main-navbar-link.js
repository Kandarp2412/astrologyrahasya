import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';

// NOTE: Dropdown is a div element, we display it on list item hover

export const MainNavbarLink = (props) => {
  const { label, dropdown, ...other } = props;

  return (
    <Box
      component="li"
      sx={{
        '&:hover > div': {
          display: 'block'
        }
      }}
    >
      <Button
        color="inherit"
        variant="text"
        {...other}
      >
        {label}
      </Button>
      {dropdown}
    </Box>
  );
};

MainNavbarLink.propTypes = {
  dropdown: PropTypes.element,
  label: PropTypes.string
};
