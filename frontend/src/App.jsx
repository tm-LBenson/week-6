import { Button, Snackbar, Alert, Card, CardContent, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import "./App.css";
import { useResources } from "./context/ResourceContext";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import EditResourceDialog from "./components/EditResourceDialog";
import DeleteResourceDialog from "./components/DeleteResourceDialog";

function App() {
  const { resources, createResource } = useResources();
  const [title, setTitle] = useState("");
  const [editingResource, setEditingResource] = useState(null);
  const [deleteResource, setDeletingResource] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await createResource({ title });
    setTitle("");
  }

  return (
    <>
      <Container>
        <Typography variant="h1">Hello!</Typography>
        <Stack
          component="form"
          direction="row"
          spacing={1}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Resource Title"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
          >
            Create
          </Button>
        </Stack>
        <Stack spacing={1}>
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardContent>
                <Stack
                  direction="row"
                  spacing={1}
                >
                  <IconButton
                    color="warning"
                    onClick={() => setEditingResource(resource)}
                    aria-label={`Edit ${resource.title}`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => setDeletingResource(resource)}
                    aria-label={`Delete ${resource.title}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography
                    variant="h5"
                    component="p"
                  >
                    {resource.title}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {editingResource && (
          <EditResourceDialog
            resource={editingResource}
            onClose={() => setEditingResource(null)}
          />
        )}

        {deleteResource && (
          <DeleteResourceDialog
            resource={deleteResource}
            onClose={() => setDeletingResource(null)}
            onDeleted={(title) => {
              setDeletingResource(null);
              setSnackbarMessage(`${title} deleted!`);
            }}
          />
        )}
        <Snackbar
          open={Boolean(snackbarMessage)}
          autoHideDuration={6000}
          onClose={() => setSnackbarMessage("")}
        >
          <Alert
            onClose={() => setSnackbarMessage("")}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default App;
