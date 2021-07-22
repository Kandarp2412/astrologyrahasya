import PropTypes from 'prop-types';
import { Box, Divider, Drawer, IconButton } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon } from '../icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '../icons/chevron-right';
import { Cog as CogIcon } from '../icons/cog';
import { CustomChartPie as ChartPieIcon } from '../icons/custom-chart-pie';
import { CustomCube as CubeIcon } from '../icons/custom-cube';
import { CustomShoppingCart as ShoppingCartIcon } from '../icons/custom-shopping-cart';
import { CustomUsers as UsersIcon } from '../icons/custom-users';
import { OfficeBuilding as OfficeBuildingIcon } from '../icons/office-building';
import { DashboardSidebarSection } from './dashboard-sidebar-section';

const primaryItems = [
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
  }
];

const secondaryItems = [
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

export const DashboardSidebar = (props) => {
  const { onPin, pinned } = props;

  return (
    <Drawer
      open
      sx={{ zIndex: 1000 }}
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 64px)',
          overflowX: 'hidden',
          p: 1,
          top: 64,
          transition: 'width 250ms ease-in-out',
          width: pinned ? 295 : 73,
          '&:hover': {
            width: 295,
            '& span': {
              display: 'block'
            }
          }
        }
      }}
    >
      <DashboardSidebarSection
        items={primaryItems}
        pinned={pinned}
      />
      <Box sx={{ flexGrow: 1 }} />
      <DashboardSidebarSection
        items={secondaryItems}
        pinned={pinned}
      />
      <Divider />
      <Box sx={{ p: 1 }}>
        <IconButton onClick={onPin}>
          {pinned ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onPin: PropTypes.func,
  pinned: PropTypes.bool
};
