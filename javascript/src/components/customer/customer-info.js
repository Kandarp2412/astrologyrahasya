import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { Avatar, Box, Button, Card, CardHeader, Divider, IconButton } from "@material-ui/core";
import { useDialog } from "../../hooks/use-dialog";
import { ExternalLink as ExternalLinkIcon } from "../../icons/external-link";
import { Eye as EyeIcon } from "../../icons/eye";
import { Trash as TrashIcon } from "../../icons/trash";
import { ActionList } from "../action-list";
import { ActionListItem } from "../action-list-item";
import { ConfirmationDialog } from "../confirmation-dialog";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import GlobalState from "../../contexts/GlobalState";
import { globalContext } from "../../contexts/Context";

export const CustomerInfo = (props) => {
  const { customer, onEdit, ...other } = props;
  console.log(onEdit);
  const [deleteDialogOpen, handleOpenDeleteDialog, handleCloseDeleteDialog] = useDialog();

  const { oneUser, setOneUser } = useContext(globalContext);

  // const [oneUser, setOneUser] = useState([]);

  const handlePreview = () => {
    toast.error("This action is not available on demo");
  };

  let { customerId } = useParams();
  // console.log(customerId);

  const handleDelete = () => {
    handleCloseDeleteDialog();
    toast.error("This action is not available on demo");
  };

  useEffect(() => {
    axios.get(`http://localhost:9003/api/profile/get/${customerId}`).then((res) => {
      console.log(res.data.data);
      setOneUser(res.data.data);
    });
  }, []);

  return (
    <>
      <Card variant="outlined" {...other}>
        <CardHeader
          action={
            <Button color="primary" onClick={onEdit} variant="text">
              Edit
            </Button>
          }
          title="Contact Info"
        />
        <Divider />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            px: 3,
            py: 1.5,
          }}
        >
          {/* <Avatar
            alt={customer.name}
            src={oneUser.avatar}
            sx={{
              height: 64,
              mr: 1,
              width: 64,
            }}
            variant="rounded"
          /> */}
          <IconButton color="inherit">
            <ExternalLinkIcon />
          </IconButton>
        </Box>
        {/* {oneUser.map((user) => { */}
        <PropertyList>
          {/* {console.log(user.name)} */}
          <PropertyListItem divider label="Full Name" value={oneUser.name} />
          <PropertyListItem divider label="Email address" value={oneUser.email} />
          <PropertyListItem divider label="Phone" value={oneUser.phoneNumber} />
          <PropertyListItem divider label="Birth Date" value={oneUser.date} />
          <PropertyListItem divider label="Birth Time " value={oneUser.time} />
          <PropertyListItem divider label="Birth Place" value={oneUser.birthPlace} />
          <PropertyListItem divider label="Latitude" value={oneUser.latitude} />
          <PropertyListItem divider label="Longitude" value={oneUser.longitude} />
          <PropertyListItem divider label="Time zone" value={oneUser.timezone} />

          {/* <PropertyListItem divider label="Full Address" value={customer.address} /> */}
          {/* <PropertyListItem label="Location" value={customer.country} /> */}
        </PropertyList>
        {/* })} */}
        <Divider />
        <ActionList>
          <ActionListItem icon={EyeIcon} onClick={handlePreview} label="Preview" />
          <ActionListItem
            icon={TrashIcon}
            label="Delete User Data"
            onClick={handleOpenDeleteDialog}
          />
        </ActionList>
      </Card>
      <ConfirmationDialog
        message="Are you sure you want to delete the user data? This can't be undone."
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        open={deleteDialogOpen}
        title="Delete user data"
        variant="error"
      />
    </>
  );
};

CustomerInfo.propTypes = {
  onEdit: PropTypes.func,
  customer: PropTypes.object.isRequired,
};
