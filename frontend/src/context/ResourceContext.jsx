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
    setResources((current)=> [...current, createResource])
  }

  useEffect(() => {
    loadResources();
  }, []);

  return <ResourceContext.Provider value={{ resources, createResource }}>{children}</ResourceContext.Provider>;
}

export function useResources() {
  return useContext(ResourceContext);
}
