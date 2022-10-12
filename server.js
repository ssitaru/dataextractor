import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { createServer } from 'vite';
const prisma = new PrismaClient()

let app = express();
app.use(cors({origin: '*'}));

app.use(express.json({limit: '100mb'})) // for parsing application/json
app.use(express.urlencoded({ limit: '100mb', extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/list', async(req, res, next) => {
  const l = await prisma.paper.findMany({include: {structuredData: true}});
  res.send(l);
});

app.get('/change/:id', async(req, res, next) => {
  try {
    const p = await prisma.structuredData.update({data: req.body, where: {paperId: req.params.id}});
    res.send(p);
  } 
  catch(err)
  {
    const p = await prisma.structuredData.create({data: req.body});
    res.send(p);
  }
  
})

const viteMiddleware = await createServer({root: process.cwd(), server: { middlewareMode: true}});
  app.use(viteMiddleware.middlewares);
  app.use('*', async (req, res) => {
      const template = fs.readFileSync(
              path.resolve(__dirname, './index.html'),
              'utf-8'
      );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
  });

app.listen(8182, () => {
  console.log("listening on :8182");
});