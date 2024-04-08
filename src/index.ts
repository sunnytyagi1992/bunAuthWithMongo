import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { auth } from "./modules/auth";
import jwt from "@elysiajs/jwt";




const app = new Elysia().use(cors()).use(swagger()).get("/", () => "Hello Elysia")

.group("/api",(app)=>

app
// .use(
//    jwt({
//         name: "jwt",
//         secret: Bun.env.JWT_SECRET!,
//       })
// )
.use(auth)
)



.listen(3006);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
