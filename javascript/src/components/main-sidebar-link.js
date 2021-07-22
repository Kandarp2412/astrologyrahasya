import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

export const MainSidebarLink = (props) => {
  const { label, sx, ...other } = props;

  return (
    <li>
      <Button
        color="inherit"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          width: '100%',
          ...sx
        }}
        variant="text"
        {...other}
      >
        {label}
      </Button>
    </li>
  );
};

MainSidebarLink.propTypes = {
  label: PropTypes.string,
  sx: PropTypes.object
};
