import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { serve } from "@hono/node-server";
import * as schema from "../db/schema";
import { cors } from "hono/cors";
import { Hono } from "hono";

// Importante para que reconozca el archivo .env
import dotenv from "dotenv";
dotenv.config();

// Aqui creas el cliente sql de Neon (postgres)
const sql = neon(process.env.DATABASE_URL);
// Aqui inicializas drizzle, con el schema de las tablas de ../db/schema.js
const database = drizzle({ client: sql, schema });

const app = new Hono();
app.use("*", cors());

app.get("/calendario", async (c) => {
  const resultado = await database.query.calendar.findMany({});

  if (resultado.length === 0) {
    return c.json({ error: "NO HAY EVENTOS" });
  }

  return c.json(resultado);

  /*
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
  */
});

app.post("/calendario", async (c) => {
  const nuevoEvento = await c.req.json();

  // aqui valida que los campos del object esten bien
  // IIMPORTANTE, SI NO VAS A MORIR !!!!

  // Aquí guardas en una base de datos
  database
    .insert(schema.calendar)
    .values(nuevoEvento)
    .then((data) => console.log(data));

  return c.json({
    success: true,
    message: "Evento añadido correctamente",
    data: nuevoEvento,
  });
});

app.put("/calendario", async (c) => {
  return c.json("Aqui podrias usar el put para editar el evento");
});

app.delete("/calendario", async (c) => {
  return c.json("Aqui podrias usar el delete para borrar el evento");
});

// Esto no tocar, se encarga de ejecutar el servidor
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
