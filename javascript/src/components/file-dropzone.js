import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { useDropzone } from 'react-dropzone';
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Link,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import { AttachFile as AttachFileIcon } from '../icons/attach-file';
import { DotsVertical as DotsVerticalIcon } from '../icons/dots-vertical';

export const FileDropzone = (props) => {
  const {
    accept,
    disabled,
    files,
    getFilesFromEvent,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noDragEventsBubbling,
    noKeyboard,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onRemove,
    onRemoveAll,
    onUpload,
    preventDropOnDocument,
    ...other
  } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop
  });

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          border: 1,
          borderColor: 'primary.main',
          borderRadius: 1,
          borderStyle: 'dashed',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          outline: 'none',
          ...(isDragActive && {
            backgroundColor: 'action.active',
            opacity: 0.5
          }),
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',
            opacity: 0.5
          }
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            px: 2,
            py: 6
          }}
        >
          <AttachFileIcon />
          <Link
            color="primary"
            variant="body1"
          >
            Browse your system
            &nbsp;
            <Typography
              color="textSecondary"
              component="span"
              variant="body1"
            >
              or drop it here
            </Typography>
          </Link>
        </Box>
      </Box>
      {files.length && (
        <Card
          sx={{ mt: 2 }}
          variant="outlined"
        >
          <List disablePadding>
            {files.map((file, index) => (
              <ListItem
                divider={files.length > index + 1}
                key={file.url}
                sx={{
                  px: 3,
                  flexDirection: {
                    sm: 'row',
                    xs: 'column'
                  },
                  alignItems:
                    {
                      sm: 'center',
                      xs: 'flex-start'
                    }
                }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: 'neutral.100',
                      mr: 2
                    }}
                  >
                    <AttachFileIcon />
                  </Avatar>
                  <div>
                    <Typography
                      color="textPrimary"
                      sx={{ mb: 0.5 }}
                      variant="subtitle2"
                    >
                      {file.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="caption"
                    >
                      {`${formatDistanceToNowStrict(file.createdAt)} ago`}
                    </Typography>
                  </div>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton edge="end">
                  <DotsVerticalIcon fontSize="small" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </div>
  );
};

FileDropzone.defaultProps = {
  files: []
};

FileDropzone.propTypes = {
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  disabled: PropTypes.bool,
  files: PropTypes.array,
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  preventDropOnDocument: PropTypes.bool
};
