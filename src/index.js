// Imports de hono
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { Hono } from "hono";

// Rutas
import { calendar } from "./routes/calendar";
import { documents } from "./routes/documents";
import { authentication } from "./routes/auth";
import { suggestions } from "./routes/suggestions";

const app = new Hono();
app.use("*", cors());

app.get("/", (c) => c.text("Bienvenido a la api!!"));
app.route("/calendar", calendar);
app.route("/documents", documents);
app.route("/suggestions", suggestions);
app.route("/authentication", authentication);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  },
);
