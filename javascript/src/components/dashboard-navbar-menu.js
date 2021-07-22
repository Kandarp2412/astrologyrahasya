import { Fragment } from 'react';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { Cog as CogIcon } from '../icons/cog';
import { CustomChartPie as ChartPieIcon } from '../icons/custom-chart-pie';
import { CustomCube as CubeIcon } from '../icons/custom-cube';
import { CustomShoppingCart as ShoppingCartIcon } from '../icons/custom-shopping-cart';
import { CustomUsers as UsersIcon } from '../icons/custom-users';
import { OfficeBuilding as OfficeBuildingIcon } from '../icons/office-building';

const items = [
  {
    href: '/dashboard/reports',
    icon: ChartPieIcon,
    title: 'Reports'
  },
  {
    href: '/dashboard/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/dashboard/products',
    icon: CubeIcon,
    title: 'Products'
  },
  {
    href: '/dashboard/orders',
    icon: ShoppingCartIcon,
    title: 'Orders'
  },
  {
    href: '/dashboard/organization',
    icon: OfficeBuildingIcon,
    title: 'Organization'
  },
  {
    href: '/dashboard/account',
    icon: CogIcon,
    title: 'Account'
  }
];

export const DashboardNavbarMenu = (props) => {
  const { open, onClose } = props;
  const location = useLocation();

  return (
    <Drawer
      anchor="top"
      onClose={onClose}
      open={open}
      transitionDuration={0}
      ModalProps={{
        BackdropProps: {
          invisible: true
        }
      }}
      PaperProps={{
        sx: {
          backgroundColor: '#2B2F3C',
          color: '#B2B7C8',
          display: 'flex',
          flexDirection: 'column',
          top: 64,
          width: '100vw'
        }
      }}
    >
      <List>
        {items.map(({ title, href, icon: Icon }, index) => {
          const active = matchPath({ path: href, end: false }, location.pathname);

          return (
            <Fragment key={title}>
              <ListItemButton
                component={RouterLink}
                onClick={onClose}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  px: 3,
                  py: 1.5,
                  ...active && ({
                    backgroundColor: '#383D4D',
                    color: '#ffffff'
                  }),
                  '&:hover': {
                    backgroundColor: '#383D4D',
                    color: '#ffffff'
                  }
                }}
                to={href}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 0,
                    mr: 1
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{
                    color: 'inherit',
                    variant: 'caption'
                  }}
                />
              </ListItemButton>
              {items.length > index + 1 && (<Divider sx={{ borderColor: '#3F455A' }} />)}
            </Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

DashboardNavbarMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};
