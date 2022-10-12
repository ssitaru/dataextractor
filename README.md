# data extractor for systematic reviews

## quick start
`docker build . -t data-extractor:latest`
`docker run -d -p 8182:8182 data-extractor`

## dev
    npx prisma migrate dev
    node server.js
    

## import papers
check all_papers.csv for format etc.
`node import.js`