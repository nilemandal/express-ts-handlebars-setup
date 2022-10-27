import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import 'dotenv/config';
import path from 'path';

const app: Application = express();

app.engine(
	'hbs',
	engine({
		defaultLayout: __dirname + '/views/layouts/index',
		extname: '.hbs',
		layoutsDir: __dirname + '/views/layouts',
		partialsDir: [path.join(__dirname, '/views/partials')],
	})
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);
app.use(
	compression({
		level: 6,
		threshold: 10 * 1000,
		filter: (req, res) => {
			if (req.headers['x-no-compression']) return false;
			return compression.filter(req, res);
		},
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	res.render('index');
});

app.listen(3000, () => {
	console.log('Server Running');
});
