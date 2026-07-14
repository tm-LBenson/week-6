import { Button, Card, CardContent, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import "./App.css";
import { useResources } from "./context/ResourceContext";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditResourceDialog from "./components/EditResourceDialog";

function App() {
  const { resources, createResource } = useResources();
  const [title, setTitle] = useState("");
  const [editingResource, setEditingResource] = useState(null);

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
        {console.log(resources)}
        <Stack spacing={1}>
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardContent>
                <Stack
                  direction="row"
                  spacing={1}
                >
                  <IconButton
                    onClick={() => setEditingResource(resource)}
                    aria-label={`Edit ${resource.title}`}
                  >
                    <EditIcon />
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
      </Container>
    </>
  );
}

export default App;
