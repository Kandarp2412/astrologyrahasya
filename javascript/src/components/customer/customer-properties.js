import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import { Card, CardHeader, Divider } from '@material-ui/core';
import { PropertyList } from '../property-list';
import { PropertyListItem } from '../property-list-item';
import { globalContext } from '../../contexts/Context';
import { useContext } from 'react';

export const CustomerProperties = (props) => {
  const { oneUser, setOneUser } = useContext(globalContext);
  const { customer, ...other } = props;

   console.log(customer)

  return (
    <Card
      variant="outlined"
      {...other}
    >
      <CardHeader title="Customer Properties" />
      <Divider />
      <PropertyList>
        <PropertyListItem
          divider
          label="sun"
          value={oneUser.sun}
        />
         <PropertyListItem
          divider
          label="moon"
          value={oneUser.moon}
        />
         <PropertyListItem
          divider
          label="mars"
          value={oneUser.mars}
        />
         <PropertyListItem
          divider
          label="rahu"
          value={oneUser.rahu}
        />
         <PropertyListItem
          divider
          label="jupitor"
          value={oneUser.jupitor}
        />
         <PropertyListItem
          divider
          label="saturn"
          value={oneUser.saturn}
        />
         <PropertyListItem
          divider
          label="mercury"
          value={oneUser.mercury}
        />
         <PropertyListItem
          divider
          label="ketu"
          value={oneUser.ketu}
        />
 
          <PropertyListItem
          divider
          label="venus"
          value={oneUser.venus }
        />
        {/* <PropertyListItem
          divider
          label="Store Credit"
          value={`${numeral(customer.storeCredit).format('$0,0.00')} USD`}
        />
        <PropertyListItem
          divider
          label="Status"
          value={customer.status}
        />
        <PropertyListItem
          label="Signup"
          value={format(customer.createdAt, 'dd MM yyyy HH:mm')}
        /> */}
      </PropertyList>
    </Card>
  );
};

CustomerProperties.propTypes = {
  customer: PropTypes.object.isRequired
};
