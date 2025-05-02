import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", cors());




app.get("/calendario", (c) => {
  return c.json([
    {
      title: "Día de cine",
      start: "2025-04-21",
      end: "2025-04-25",
      ubicacion: "",
      descripcion: "",
    },
    {
      title: "Taller de cocina",
      start: "2025-04-19T14:30:00",
      end: "2025-04-19T17:30:00",
      ubicacion: "",
      descripcion: "",
    },
    {
      title: "Taller de cocina",
      start: "2025-04-19",
      ubicacion: "",
      descripcion: "",
    },
    {
      title: "Patinaje",
      start: "2025-04-20",
      ubicacion: "",
      descripcion: "",
    },
  ]);
});

app.post("/calendario", async (c) => {
  const nuevoEvento = await c.req.json();
  
  // Aquí normalmente guardarías en una base de datos
  console.log("Nuevo evento recibido:", nuevoEvento);
  
  return c.json({
    success: true,
    message: "Evento añadido correctamente",
    data: nuevoEvento
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
