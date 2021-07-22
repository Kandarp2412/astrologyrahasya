import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  InputAdornment,
  Typography
} from '@material-ui/core';
import { InputField } from '../input-field';

export const ProductPricing = (props) => {
  const { formik, ...other } = props;

  return (
    <Card
      variant="outlined"
      {...other}
    >
      <CardHeader title="Pricing" />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={2}
          sx={{ pt: 3 }}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.price && formik.errors.price)}
              fullWidth
              helperText={formik.touched.price && formik.errors.price}
              label="Price"
              name="price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.price}
              InputProps={{
                startAdornment: <InputAdornment position="start">EUR</InputAdornment>
              }}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.compareAtPrice && formik.errors.compareAtPrice)}
              fullWidth
              helperText={(formik.touched.compareAtPrice && formik.errors.compareAtPrice)
              || 'To show a reduced price, move the product\'s original price into Compare at price. Enter a lower value into Price.'}
              label="Compare at price"
              name="compareAtPrice"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.compareAtPrice}
              InputProps={{
                startAdornment: <InputAdornment position="start">EUR</InputAdornment>
              }}
            />
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
            xs={12}
          >
            <Checkbox
              checked={formik.values.chargeTax}
              onChange={(event) => { formik.setFieldValue('chargeTax', event.target.checked); }}
            />
            <Typography
              color="textPrimary"
              variant="body1"
            >
              Charge tax on this product
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ProductPricing.propTypes = {
  formik: PropTypes.object.isRequired
};
