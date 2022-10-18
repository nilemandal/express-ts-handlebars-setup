import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';

const app: Application = express();

app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello');
});

app.listen(3000, () => {
	console.log('Server Running');
});
