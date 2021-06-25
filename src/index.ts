import express, { Request, Response } from 'express';

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('hello peop');
});

app.listen(port, () => {
  console.log('Hello');
});
