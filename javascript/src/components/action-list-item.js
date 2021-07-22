import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

export const ActionListItem = (props) => {
  const { icon: Icon, label, ...other } = props;

  return (
    <ListItem
      button
      {...other}
    >
      <ListItemIcon>
        <Icon
          fontSize="small"
          sx={{ color: 'text.secondary' }}
        />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
};

ActionListItem.propTypes = {
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};
