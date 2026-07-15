import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { useResources } from "../context/ResourceContext";

function DeleteResourceDialog({ onClose, resource, onDeleted }) {
  const { deleteResource } = useResources();
  async function handleDelete() {
    await deleteResource(resource.id);
    onDeleted(resource.title);
  }

  return (
    <Dialog
      open
      onClose={onClose}
    >
      <DialogTitle>Delete this item?</DialogTitle>
      <DialogContent>
        <DialogContentText>{resource.title} will be permanently removed.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteResourceDialog;
