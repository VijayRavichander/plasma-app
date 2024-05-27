import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, sign, verify} from 'hono/jwt'


export const BlogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string, 
        JWT_SECRET: string
    }, 
    Variables: {
        userId: string
    }
}>()


// MIDDLEWARE

BlogRouter.use("/*", async (c, next) => {
  
    const header = c.req.header("authorization") || "";
  
    const token = header.split(" ")[1]
    
    try{
        const response = await verify(token, c.env.JWT_SECRET)
  
        if(response){
          c.set("userId", response.id)
          await next()
        }else{
          return c.json({error: "Unauthorized"})
        }
    }catch(e){
        c.status(403);
        return c.json({
            message: "Not Authorized"
        })
    }
  
  })

// POST BLOG
BlogRouter.post('', async (c) => {

    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, 
      }).$extends(withAccelerate())

    
    const blog = await prisma.post.create({
        data: {
            title: body.title, 
            content: body.content, 
            contentHTML: body.contentHMTL,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    })

  })

// PUT BLOG
BlogRouter.put('', async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, 
      }).$extends(withAccelerate())

    
    const blog = await prisma.post.update({
        where: {
            id: body.id
        }, 
        data: {
            title: body.title, 
            content: body.content,
            contentHTML: body.contentHMTL, 
        }   
    })

    return c.json({
        id: blog.id
    })
})

// GET ALL BLOGS
BlogRouter.get('/all', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select: {
            content: true, 
            contentHTML: true,
            title: true, 
            id: true, 
            createdAt: true, 
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })

})



// GET BLOG
BlogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, 
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }, 
            select: {
                id: true, 
                title: true, 
                content: true, 
                contentHTML: true,
                createdAt: true, 
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog
        })

    }catch(e) {
        c.status(411);
        c.json({
            message: "Error while getting the data"
        })
    }
})


