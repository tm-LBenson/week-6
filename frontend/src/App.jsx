import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import "./App.css";
import { useResources } from "./context/ResourceContext";
import { useState } from "react";

function App() {
  const { resources, createResource } = useResources();
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await createResource({ title });
    setTitle("")
  }

  return (
    <>
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
              <Typography
                variant="h5"
                component="p"
              >
                {resource.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
}

export default App;
