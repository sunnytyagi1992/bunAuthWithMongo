import Elysia, { t } from "elysia";

import { prisma } from "../../libs/prisma";



export const auth = (app: Elysia) =>

    app.group("/auth", (app) =>
        app
            .post("/singup", async ({ body, set }) => {
                const { username, password } = body;

                const usernameExists = await prisma.user.findUnique({
                    where: {
                        username: username,
                    },
                    select: {
                        id: true,
                    },
                });


                if (usernameExists) {
                    set.status = 400;

                    return {
                        success: false,
                        data: null,
                        message: "Username already exists",
                    };
                }

                const hash = await Bun.password.hash(password);

                const newUser = await prisma.user.create({
                    data: {
                        username,
                        hash,
                        password,
                    },
                });


                return {
                    success: true,
                    message: 'User created successfully',
                    data: {
                        user: newUser,
                    },
                };
            },
            {
                body: t.Object ({
                    username: t.String(),
                    password: t.String(),

                }),
            }
            
            
            )






    )