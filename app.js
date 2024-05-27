import express from 'express'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors';
import indexRouter from './routes/index.js'

const app = express();
const __fileURLToPath =fileURLToPath(import.meta.url);
const __dirname = dirname(__fileURLToPath);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger("dev"))

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials:true
}
app.use(cors(corsOptions))


app.use("/", indexRouter)

export default app;