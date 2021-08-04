import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { usePopover } from "../../hooks/use-popover";
import { DotsVertical as DotsVerticalIcon } from "../../icons/dots-vertical";
import PropTypes from "prop-types";
import axios from "axios";
import { useContext, useState } from "react";
import { globalContext } from "../../contexts/Context";
import { CustomerDialog } from "./customer-dialog";
import { CustomerInfo } from "./customer-info";

export const CustomerMenu = (props) => {
  const navigate = useNavigate();
  const { customer, onEdit } = props;
  console.log(onEdit);

  const { refreshUserTable, setRefreshUserTable } = useContext(globalContext);

  const [editModal, setEditModal] = useState(false);

  // console.log(customer);

  const [anchorRef, open, handleOpen, handleClose] = usePopover();

  const handleEdit = () => {
    handleClose();
    navigate(`/dashboard/customers/${customer._id}`);
  };

  const handleReport = () => {
    handleClose();
    // toast.error("This action is not available on demo");
  };

  const handleDelete = () => {
    handleClose();
    axios.post(`http://localhost:9003/api/profile/delete/${customer._id}`).then((res) => {
      toast.success("successfully deleted");
      setRefreshUserTable(!refreshUserTable);
    });
  };

  return (
    <>
      <IconButton onClick={handleOpen} ref={anchorRef} {...props}>
        <DotsVerticalIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onEdit={(e) => setEditModal(true)}>Edit</MenuItem>
        <MenuItem onClick={handleEdit}>Edit +</MenuItem>
        <MenuItem onClick={handleReport}>View</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      {editModal ? <CustomerInfo /> : null}
    </>
  );
};

CustomerMenu.propTypes = {
  customer: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
};
