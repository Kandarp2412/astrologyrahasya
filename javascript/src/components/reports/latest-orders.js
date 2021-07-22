import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, CardHeader, Divider } from '@material-ui/core';
import { OrderPreviewItem } from '../order/order-preview-item';
import { OrderPreviewList } from '../order/order-preview-list';

const orders = [
  {
    id: '5273',
    courier: 'DHL',
    createdAt: '2021-06-02T14:32:45.475Z',
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      city: 'New York',
      country: 'USA',
      firstName: 'Devon',
      lastName: 'Lane'
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: 'USD',
        currencySymbol: '$',
        discountAmount: 0,
        image: '/static/product-01.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentMethod: 'debit',
    status: 'complete',
    trackingCode: 'KDO020021',
    subtotalAmount: 160,
    taxAmount: 32.5,
    totalAmount: 192.5,
    updatedAt: '2021-06-02T14:32:45.475Z'
  },
  {
    id: '9265',
    courier: 'DHL',
    createdAt: '2021-05-12T20:10:45.475Z',
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      city: 'Berlin',
      country: 'Germany',
      firstName: 'Livia',
      lastName: 'Louthe'
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: 'USD',
        currencySymbol: '$',
        discountAmount: 0,
        image: '/static/product-01.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    status: 'delivered',
    totalAmount: 631,
    updatedAt: '2021-05-12T20:10:45.475Z'
  },
  {
    id: '9266',
    courier: 'UPS',
    createdAt: '2021-02-21T12:12:45.475Z',
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      city: 'Hamburg',
      country: 'Germany',
      firstName: 'Peri',
      lastName: 'Ottawell'
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: 'USD',
        currencySymbol: '$',
        discountAmount: 0,
        image: '/static/product-01.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    status: 'placed',
    totalAmount: 631,
    updatedAt: '2021-02-21T12:12:45.475Z'
  },
  {
    id: '1090',
    courier: 'UPS',
    createdAt: '2021-09-09T10:10:45.475Z',
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      city: 'Madrid',
      country: 'Spain',
      firstName: 'Thadeus',
      lastName: 'Jacketts'
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: 'USD',
        currencySymbol: '$',
        discountAmount: 0,
        image: '/static/product-01.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    status: 'processed',
    totalAmount: 100,
    updatedAt: '2021-09-09T10:10:45.475Z'
  },
  {
    id: '1111',
    courier: 'Purolator',
    createdAt: '2021-05-21T02:02:45.475Z',
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      city: 'Barcelona',
      country: 'Spain',
      firstName: 'Rad',
      lastName: 'Jose'
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: 'USD',
        currencySymbol: '$',
        discountAmount: 0,
        image: '/static/product-01.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    status: 'placed',
    totalAmount: 60,
    updatedAt: '2021-05-21T02:02:45.475Z'
  }
];

export const LatestOrders = (props) => (
  <Card
    variant="outlined"
    {...props}
  >
    <CardHeader
      action={(
        <Button
          color="primary"
          component={RouterLink}
          to="/dashboard/orders"
          variant="text"
        >
          Go to orders
        </Button>
      )}
      title="Latest Orders"
    />
    <Divider />
    <OrderPreviewList>
      {orders.map((order, index) => (
        <OrderPreviewItem
          divider={orders.length > index + 1}
          key={order.id}
          order={order}
        />
      ))}
    </OrderPreviewList>
  </Card>
);
