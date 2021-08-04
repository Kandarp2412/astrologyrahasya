import PropTypes from "prop-types";
import { format } from "date-fns";
import numeral from "numeral";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  InputLabel,
  NativeSelect,
  TextareaAutosize,
} from "@material-ui/core";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";

export const CustomerProperties = (props) => {
  const { customer, ...other } = props;

  const [open, setOpen] = useState(false);

  const handleClose = (notesId, notes) => {
    setOpen(false);
  };

  return (
    <Card variant="outlined" {...other}>
      <CardHeader
        title="Customer Properties"
        action={
          <Button color="primary" onClick={(e) => setOpen(true)} variant="text">
            Edit
          </Button>
        }
      />
      <Dialog
        // style={{ width: "100%" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
        <InputLabel>Ayanamsha</InputLabel>
        <NativeSelect
          style={{ margin: "30px" }}
          defaultValue="Netal"
          inputProps={{
            name: "name",
            id: "uncontrolled-native",
          }}
          // onChange={(e) => handleChangeChartType(e)}
        >
          <option value="Netal">Kp</option>
          <option value="Event">LAHIRI</option>
          <option value="Horay">DELUCE</option>
        </NativeSelect>
        <InputLabel>Ayanamsha</InputLabel>
        <NativeSelect
          style={{ margin: "30px" }}
          defaultValue="Netal"
          inputProps={{
            name: "name",
            id: "uncontrolled-native",
          }}
          // onChange={(e) => handleChangeChartType(e)}
        >
          <option value="Netal">Kp</option>
          <option value="Event">LAHIRI</option>
          <option value="Horay">DELUCE</option>
        </NativeSelect>
        {/* </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose()} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Button>a</Button> */}
      <Divider />
      <PropertyList>
        <PropertyListItem divider label="sun" value={customer.isTaxExempt ? "Yes" : "No"} />
        <PropertyListItem
          divider
          label="Moon"
          value={`${numeral(customer.storeCredit).format("$0,0.00")} USD`}
        />
        <PropertyListItem divider label="Status" value={customer.status} />
        <PropertyListItem label="Signup" value={format(customer.createdAt, "dd MM yyyy HH:mm")} />
      </PropertyList>
    </Card>
  );
};

CustomerProperties.propTypes = {
  customer: PropTypes.object.isRequired,
};
