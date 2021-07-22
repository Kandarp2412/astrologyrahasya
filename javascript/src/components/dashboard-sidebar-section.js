import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

export const DashboardSidebarSection = (props) => {
  const { items = [], pinned } = props;
  const location = useLocation();

  return (
    <List sx={{ width: '100%' }}>
      {items.map(({ title, href, icon: Icon }) => {
        const active = matchPath({ path: href, end: false }, location.pathname);

        return (
          <ListItem
            disablePadding
            component={RouterLink}
            key={href}
            to={href}
            sx={{
              color: active ? 'primary.main' : 'text.secondary',
              px: 2,
              py: 1.5,
              '&:hover': {
                color: 'primary.main'
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 'auto',
                color: 'inherit'
              }}
            >
              <Icon />
            </ListItemIcon>
            <ListItemText
              primary={title}
              primaryTypographyProps={{
                variant: 'subtitle2',
                sx: {
                  display: pinned ? 'block' : 'none',
                  ml: 1
                }
              }}
              sx={{ my: 0 }}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

DashboardSidebarSection.propTypes = {
  items: PropTypes.array,
  pinned: PropTypes.bool
};
