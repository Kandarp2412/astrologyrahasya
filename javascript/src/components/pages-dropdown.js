import {
  Box,
  Grid,
  Link,
  List,
  ListItem,
  ListSubheader,
  Paper,
  Typography
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }

  return res;
};

const sections = [
  {
    title: 'Products',
    items: [
      {
        title: 'List',
        href: '/dashboard/products'
      },
      {
        title: 'Summary',
        href: '/dashboard/products/1'
      },
      {
        title: 'Inventory Management',
        href: '/dashboard/products/1/inventory'
      },
      {
        title: 'Insights',
        href: '/dashboard/products/1/analytics'
      }
    ]
  },
  {
    title: 'Orders',
    items: [
      {
        title: 'List',
        href: '/dashboard/orders'
      },
      {
        title: 'Sumary',
        href: '/dashboard/orders/1'
      }
    ]
  },
  {
    title: 'Customers',
    items: [
      {
        title: 'List',
        href: '/dashboard/customers'
      },
      {
        title: 'Summary',
        href: '/dashboard/customers/1'
      },
      {
        title: 'Orders',
        href: '/dashboard/customers/1/orders'
      },
      {
        title: 'Activity',
        href: '/dashboard/customers/1/orders'
      }
    ]
  },
  {
    title: 'Dashboards',
    items: [
      {
        title: 'Overview',
        href: '/dashboard'
      },
      {
        title: 'Reports',
        href: '/dashboard/sales'
      }
    ]
  },
  {
    title: 'Account',
    items: [
      {
        title: 'General',
        href: '/dashboard/account'
      },
      {
        title: 'Notifications',
        href: '/dashboard/account/notifications'
      }
    ]
  },
  {
    title: 'Organization',
    items: [
      {
        title: 'General',
        href: '/dashboard/organization'
      },
      {
        title: 'Team',
        href: '/dashboard/organization/team'
      },
      {
        title: 'Billing',
        href: '/dashboard/organization/billing'
      }
    ]
  }
];

const PagesDropdownSection = (props) => {
  const { section } = props;

  return (
    <List
      subheader={(
        <ListSubheader
          disableGutters
          disableSticky
        >
          <Typography
            color="textSecondary"
            variant="overline"
          >
            {section.title}
          </Typography>
        </ListSubheader>
      )}
    >
      {section.items.map((item) => (
        <ListItem
          disableGutters
          key={item.title}
          sx={{ p: 0 }}
        >
          <Link
            color="textPrimary"
            variant="body2"
            component={RouterLink}
            to={item.href}
            underline="none"
            sx={{
              py: 2,
              width: '100%',
              '&:hover': {
                color: 'primary.main'
              }
            }}
          >
            {item.title}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

PagesDropdownSection.propTypes = {
  section: PropTypes.object.isRequired
};

export const PagesDropdown = () => (
  <Box
    sx={{
      display: 'none',
      left: 0,
      p: 3,
      position: 'absolute',
      top: 32,
      width: '100%'
    }}
  >
    <Paper
      elevation={10}
      sx={{
        p: 3,
        overflow: 'hidden',
        display: 'flex'
      }}
    >
      <Box
        sx={{
          backgroundColor: 'neutral.100',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: 320,
          '& > img': {
            height: 'auto',
            width: '100%'
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            color="textPrimary"
            sx={{ mb: 1.25 }}
            variant="h4"
          >
            Pages
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            Carpatin - Retail &amp; Back Office Dashboard includes 5 unique user-flows with a total
            of 20 screens. We think the value is in the quality and not quantity.
          </Typography>
        </Box>
        <img
          alt=""
          src="/static/feature-auth.png"
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          px: 3
        }}
      >
        <Grid
          container
          spacing={3}
        >
          {sliceIntoChunks(sections, 2).map((sectionArr, index) => (
            <Grid
              item
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              xs={4}
            >
              {sectionArr.map((section) => (
                <PagesDropdownSection
                  key={section.title}
                  section={section}
                />
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  </Box>
);
