import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

let app = express();
app.use(cors({origin: '*'}));

app.use(express.json({limit: '100mb'})) // for parsing application/json
app.use(express.urlencoded({ limit: '100mb', extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/list', async(req, res, next) => {
  const l = await prisma.paper.findMany();
  console.log(l);
});

app.listen(8082, () => {
  console.log("listening on :8182");
  sess_store.sync();
});