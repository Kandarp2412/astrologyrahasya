import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { usePopover } from "../../hooks/use-popover";
import { DotsVertical as DotsVerticalIcon } from "../../icons/dots-vertical";
import PropTypes from "prop-types";
import axios from "axios";
import { useContext } from "react";
import { globalContext } from "../../contexts/Context";

export const CustomerMenu = (props) => {
  const navigate = useNavigate();
  const { customer } = props;
  // console.log(props);

  const { refreshUserTable, setRefreshUserTable } = useContext(globalContext);

  // console.log(customer);

  const [anchorRef, open, handleOpen, handleClose] = usePopover();

  const handleEdit = () => {
    handleClose();
    navigate(`/dashboard/customers/${customer.id}`);
  };

  const handleReport = () => {
    handleClose();
    // toast.error("This action is not available on demo");
  };

  const handleDelete = () => {
    handleClose();
    axios.post(`http://localhost:9003/api/profile/delete/${customer.id}`).then((res) => {
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
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleReport}>View</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

CustomerMenu.propTypes = {
  customer: PropTypes.object.isRequired,
};
