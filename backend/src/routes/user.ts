import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, sign, verify} from 'hono/jwt'
import { signupInput } from "@100xdevs/medium-common"

// import { signupInput } from "../../../common/src/zod"


export const UserRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string, 
      JWT_SECRET: string
    }
  }>()

// POST SIGNUP
UserRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL, 
    }).$extends(withAccelerate())
    
    const body = await c.req.json()
    
    const {success} = signupInput.safeParse(body)

    if(!success){
      c.status(411);
      return c.json({
        message: "Inputs not correct"
      })
    }

    const user = await prisma.user.create({
      data: {
        email: body.username, 
        password: body.password, 
        name: body.name
      }
    })
  
    const token = await sign({id: user.id}, c.env.JWT_SECRET)
  
    return c.json({
      jwt: token, 
      name: body.name
    })
  
  })
  
// POST SIGNIN
  UserRouter.post('/signin', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    })
  
    const body = await c.req.json()
  
    const user = await prisma.user.findUnique({
      where: {
        email: body.username, 
        password: body.password
      }, 
      select: {
        id: true, 
        name: true
      }
    })
  
      if(!user) {
        c.status(403);
        return c.json({error: "User not Found"})
      }
  
      const token = await sign({id: user.id}, c.env.JWT_SECRET)
  
    return c.json({
      jwt: token, 
      name: user.name
    })
  })
  