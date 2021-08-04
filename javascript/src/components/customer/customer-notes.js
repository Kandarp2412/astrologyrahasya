// import {  useState } from "react";
import PropTypes from "prop-types";
import { Box, TextareaAutosize, Typography } from "@material-ui/core";
import { generateResourceId } from "../../utils/generate-resource-id";
import { Avatar, Button, Card } from "@material-ui/core";
import React from "react";
import { CustomerNote } from "./customer-note";
import { CustomerNoteAdd } from "./customer-note-add";
import { globalContext } from "../../contexts/Context";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { makeStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
// import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./modal.css";
import { useRef } from "react";
// import {
//   FormControl,
//   FormLabel,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   useDisclosure,
// } from "@chakra-ui/react";

const useStyles = makeStyles((theme) =>
  // console.log(abc),
  ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "transparent",
    },
    paper: {
      backgroundColor: "white",
      border: "2px solid #000",
      //boxShadow: theme.shadows[5],
      padding: (2, 4, 3),
    },
  })
);

export const CustomerNotes = (props) => {
  const { className } = props;
  const classes = useStyles();
  // const { content, createdAt, id, onDelete, senderAvatar, senderName, deletable, sx, ...other } =
  //   props;
  const {
    notes: notesProp,
    content,
    createdAt,
    id,
    onDelete,
    senderAvatar,
    senderName,
    deletable,
    sx,
    ...other
  } = props;
  const [notes, setNotes] = useState(notesProp || []);

  // let allNotes = useRef([]);

  const [allNotes, setAllNotes] = useState([]);
  const [deleteNotesFlag, setDeleteNotesFlag] = useState(false);
  const [editNotesFlag, setEditNotesFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [userNotesId, setUserNotesId] = useState("");

  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);

  const [editedNotes, setEditedNotes] = useState("");

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  let { customerId } = useParams();

  const { oneUser, addNotesFlag } = useContext(globalContext);

  // console.log(notes);

  const handleNoteSend = (content) => {
    setNotes((prevNotes) => [
      {
        id: generateResourceId(),
        senderId: "1",
        senderName: "Chen Simmons",
        senderAvatar: "/static/user-chen_simmons.png",
        content,
        createdAt: new Date(),
      },
      ...prevNotes,
    ]);
  };

  useEffect(() => {
    axios.post(`http://localhost:9003/api/profile/allnotes/${customerId}`).then((res) => {
      console.log("hii");
      // console.log(res.data.data[0].notes);
      setAllNotes(res.data.data);
    });
  }, [deleteNotesFlag, addNotesFlag]);
  // console.log(allNotes);

  const handleNoteDelete = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const handleNotesDelete = (id) => {
    // console.log(id);
    axios.post(`http://localhost:9003/api/profile/notes/delete/${id}`).then((res) => {
      setDeleteNotesFlag(!deleteNotesFlag);
      console.log(res);
    });
  };

  const handleEditNotes = () => {
    setEditNotesFlag(true);
  };

  const handleClickOpen = (notesId) => {
    setUserNotesId(notesId);
    setOpen(true);
  };

  const handleClose = (notesId, notes) => {
    console.log(notesId);
    console.log(editedNotes ? editedNotes : notes);
    axios
      .post(`http://localhost:9003/api/profile/notes/edit/${userNotesId}`, {
        notes: editedNotes ? editedNotes : notes,
      })
      .then((res) => {
        setDeleteNotesFlag(!deleteNotesFlag);

        console.log(res);
      });
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  useEffect(() => {
    setNotes(notesProp);
  }, [notesProp]);

  return (
    <Box {...other}>
      {/* <Typography
        color="textPrimary"
        variant="h6"
        sx={{ mb: 3 }}
      >
        Team Notes
      </Typography> */}
      <Box
        sx={{
          display: "grid",
          gap: 3,
        }}
      >
        <CustomerNoteAdd onSend={handleNoteSend} />
        {allNotes &&
          allNotes.map((i) => {
            return (
              <>
                <Card
                  sx={{
                    display: "flex",
                    p: 3,
                    ...sx,
                  }}
                  variant="outlined"
                  {...other}
                >
                  <Box
                    sx={{
                      flex: 1,
                      ml: 2,
                    }}
                  >
                    <Typography color="textPrimary" variant="h6">
                      {oneUser.name}
                    </Typography>
                    <Typography color="textPrimary" sx={{ my: 1 }} variant="body2">
                      {i.notes}
                    </Typography>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {console.log(i)}
                      <Typography color="textSecondary" variant="caption">
                        {moment(i.createdAt).format("DD/MM/YYYY hh:mm:ss")}
                        {/* {`${(createdAt)} ago`} */}
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Button
                        color="primary"
                        onClick={() => handleClickOpen(i._id)}
                        size="small"
                        variant="text"
                      >
                        Edit
                      </Button>
                      <Dialog
                        style={{ width: "100%" }}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">Edit Notes</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            <TextareaAutosize
                              style={{ width: "400px" }}
                              // width="100px"
                              minRows={4}
                              aria-label="empty textarea"
                              // placeholder="Empty"
                              defaultValue={i.notes}
                              onChange={(e) => setEditedNotes(e.target.value)}
                            />
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleClose(i._id, i.notes)}
                            color="primary"
                            autoFocus
                          >
                            Update
                          </Button>
                        </DialogActions>
                      </Dialog>
                      {/* {modal ? console.log(i._id === i._id ? console.log(i._id) : null) : null} */}
                      {/* 
                      <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen}
                        onClose={onClose}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Create your account</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody pb={6}>
                            <FormControl>
                              <FormLabel>First name</FormLabel>
                              <Input ref={initialRef} placeholder="First name" />
                            </FormControl>

                            <FormControl mt={4}>
                              <FormLabel>Last name</FormLabel>
                              <Input placeholder="Last name" />
                            </FormControl>
                          </ModalBody>

                          <ModalFooter>
                            <Button colorScheme="blue" mr={3}>
                              Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal> */}

                      <Button
                        color="primary"
                        onClick={() => handleNotesDelete(i._id)}
                        size="small"
                        variant="text"
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </>
            );
          })}
        {/* <CustomerNote /> */}
        {notes.map((note) => (
          <CustomerNote
            content={note.content}
            createdAt={note.createdAt}
            deletable={note.senderId === "1"} // NOTE: ID 1 is the logged in user
            id={note.id}
            key={note.id}
            onDelete={handleNoteDelete}
            senderAvatar={note.senderAvatar}
            senderName={note.senderName}
          />
        ))}
      </Box>
    </Box>
  );
};

CustomerNotes.defaultProps = {
  notes: [],
};

CustomerNotes.propTypes = {
  className: PropTypes.string,
  notes: PropTypes.array,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  deletable: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  senderAvatar: PropTypes.string.isRequired,
  senderName: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
