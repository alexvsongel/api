import { Hono } from "hono";
// import { database, schema, eq } from '../lib/database';

const authentication = new Hono();

authentication.post("/login", async (context) => {
  // https://medium.com/@sahilattar87860/secure-your-node-js-and-express-js-api-with-jwt-authentication-f25f1ebc4435
  // Este es el tutorial para hacerlo

  // aqui recuperas los datos de la request con
  const request = await context.req.json();

  // VALIDACION DE DATOS (IMPORTANTE)
  if (!request.user || !request.password) {
    return context.json(
      { error: "No has puesto el usuario o contraseña" },
      401,
    );
  }

  // 1. Buscar el usuario en la base de datos
  // drizzle esto eh!!
  // const user = await database.query.users.findFirst({
  //  where: () => eq(schema.users.name, request.user)
  // })

  // 2. Si existe, continuamos, de lo contrario, devolvemos
  // if (!user) {
  //  return context.json({ error: "El usuario no existe" }, 404);
  // }

  // 3. Hacemos la comparacion de la contraseña que tenemos y la del usuario con bcrypt
  // const userIsValid = await bcrypt.compare(password, user.password)

  // 4. generamos un token, is el usuario es valido
  // if(!userIsValid) {
  //  return context.json({ error: "El usuario o contrasena no son validos" }, 401);
  // }

  // token = newToken()
  // const token = jwt.sign({ username: user.username }, 'secretKey', { expiresIn: '1h' });

  // Fin del codigo del login

  return context.json({ miau: "miau" });
});

export { authentication };
