import PropTypes from 'prop-types';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import { AttachFile as AttachFileIcon } from '../icons/attach-file';
import { DotsVertical as DotsVerticalIcon } from '../icons/dots-vertical';

export const AttachmentListItem = (props) => {
  const { subtitle, title, withActions, withAvatar, ...other } = props;

  return (
    <ListItem
      disableGutters
      {...other}
    >
      <ListItemAvatar
        sx={{
          display: 'flex',
          minWidth: 'inherit',
          mr: 1.5
        }}
      >
        {withAvatar
          ? (
            <Avatar>
              <AttachFileIcon />
            </Avatar>
          ) : (
            <AttachFileIcon />
          )}
      </ListItemAvatar>
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          variant: 'subtitle2'
        }}
        secondary={subtitle}
      />
      {withActions && (
        <ListItemSecondaryAction>
          <IconButton>
            <DotsVerticalIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

AttachmentListItem.defaultProps = {
  withActions: false,
  withAvatar: false
};

AttachmentListItem.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  withActions: PropTypes.bool,
  withAvatar: PropTypes.bool
};
