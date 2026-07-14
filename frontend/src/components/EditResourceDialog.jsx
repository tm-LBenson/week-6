import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useResources } from "../context/ResourceContext";

function EditResourceDialog({ resource, onClose }) {
  const { updateResource } = useResources();
  const [title, setTitle] = useState(resource.title);
  async function handleSubmit(e) {
    e.preventDefault();
    await updateResource(resource.id, { title });
    onClose();
  }

  return (
    <Dialog
      open
      onClose={onClose}
    >
      <Stack
        component="form"
        onSubmit={handleSubmit}
      >
        <DialogTitle>Edit resource</DialogTitle>

        <DialogContent>
          <TextField
            size="small"
            sx={{ mt: 1 }}
            label="Resource title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}

export default EditResourceDialog;
