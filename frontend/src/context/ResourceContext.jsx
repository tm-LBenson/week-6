import { createContext, useContext, useEffect, useState } from "react";

const ResourceContext = createContext(null);

export function ResourceProvider({ children }) {
  const [resources, setResources] = useState([]);
  const BACKEND = import.meta.env.VITE_BACKEND;

  async function loadResources() {
    const res = await fetch(BACKEND);
    const data = await res.json();
    setResources(data);
  }

  async function createResource(resource) {
    const res = await fetch(BACKEND, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });

    const createdResource = await res.json();
    setResources((current) => [...current, createdResource]);
  }

  useEffect(() => {
    loadResources();
  }, []);

  async function updateResource(id, updates) {
    const url = BACKEND + "/" + id;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    const updatedResource = await res.json();

    setResources((current) =>
      current.map((resource) => {
        if (resource.id === updatedResource.id) {
          return updatedResource;
        }
        return resource;
      }),
    );
  }

  async function deleteResource(id) {
    const url = BACKEND + "/" + id;
    const res = await fetch(url, { method: "DELETE" });
    const data = await res.json();

    setResources((current) => current.filter((resource) => resource.id !== id));
  }

  return <ResourceContext.Provider value={{ resources, createResource, updateResource, deleteResource }}>{children}</ResourceContext.Provider>;
}

export function useResources() {
  return useContext(ResourceContext);
}
