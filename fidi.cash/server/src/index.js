import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import api from './routes/api.js';
import { port, databaseUri } from './config.js';

try {
  await mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1', api);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

const listener = app.listen(port, () => {
  console.log(`Listening on port ${listener.address().port}`);
});
