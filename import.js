import { PrismaClient } from '@prisma/client';
import * as csv from 'fast-csv';
import * as fs from 'fs';
const prisma = new PrismaClient()

prisma.$queryRaw`DELETE FROM Paper`.then(() => {
    fs.createReadStream('./all_papers.csv')
    .pipe(csv.parse({headers: true, delimiter: ';'}))
    .on('data', async(row) => {
        /**
         *   publishedAt DateTime
                pmid      Int
                doi       String?
                title     String 
                authors   String
                abstract   String?
                journal   String?
         */
        let dt;
        if(row['Create Date'])
        {
             let [d, m, y] = row['Create Date'].split('/');
             dt = new Date(y, m, d); 
        }
        let o = {
            publishedAt: dt,
            doi: row['DOI'],
            title: row['Title'],
            authors: row['Authors'],
            journal: row['Journal/Book'],
            pmid: row['PMID'],
        };
        await prisma.paper.create({
            data: o,
        });
    })
    .on('error', (err) => {console.error(err)})
    .on('end', async (r) => {console.log(r); await prisma.$disconnect()});
});

