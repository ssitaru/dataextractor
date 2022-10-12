import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { createServer } from 'vite';
const prisma = new PrismaClient()

let app = express();
app.use(cors({origin: '*'}));

app.use(express.json({limit: '100mb'})) // for parsing application/json
app.use(express.urlencoded({ limit: '100mb', extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/api/list', async(req, res, next) => {
  const l = await prisma.paper.findMany({include: {structuredData: true}});
  for(let i = 0; i<l.length; i++)
  {
    let p = l[i];
    if(p.structuredData)
    {
      p.structuredData.reportedMetrics = p.structuredData.reportedMetrics ? JSON.parse(p.structuredData.reportedMetrics) : [];
    }
  }
  
  
  res.send(l);
});

app.post('/api/change/:id', async(req, res, next) => {
  if(!req.params.id)
    {
      console.error('no paper id');
      res.sendStatus(400);
      return;
    }
    req.body.reportedMetrics = (typeof req.body.reportedMetrics !== "undefined") ? JSON.stringify(req.body.reportedMetrics) : [];
    req.body.id = undefined;
  try {
    req.body.paper = undefined;
    const p = await prisma.structuredData.update({data: req.body, where: {paperId: Number.parseInt(req.params.id)}});
    res.send(p);
  } 
  catch(err)
  {
    req.body.paper = {connect: {id: Number.parseInt(req.params.id)}};
    req.body.paperId = undefined;
    const p = await prisma.structuredData.create({data: req.body});
    res.send(p);
  }
  
})
if(process.env.PROD)
{
  app.use((req, res, next) => {
    console.log('static file: ' +req.url);
    next();
  })
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    if(req.url.indexOf('/api/') == -1)
    {
      res.sendFile('dist/' + 'index.html');
    }
  })

} else {
const viteMiddleware = await createServer({root: process.cwd(), server: { middlewareMode: true}});
  app.use(viteMiddleware.middlewares);
  app.use('*', async (req, res) => {
      const template = fs.readFileSync(
              path.resolve('./index.html'),
              'utf-8'
      );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
  });
}

app.listen(8182, () => {
  console.log("listening on :8182");
});