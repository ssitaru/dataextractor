import { PrismaClient } from '@prisma/client';
import * as csv from 'fast-csv';
import * as fs from 'fs';
const prisma = new PrismaClient()

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
        let y,m,d;
        if(row['CreateData'])
        {
             [y, m, d] = row['CreateDate'].split('/');
        }
        let o = {
            publishedAt: (y ? new Date(y, m, d) : undefined),
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