import './env';
import 'reflect-metadata';
import app from './app';
import connectionOptions from './database';
import { createConnection } from 'typeorm';
import client from './client';

const { PORT = String(5000) } = process.env;
const { TOKEN = String() } = process.env;

createConnection(connectionOptions).then(() =>
  console.log('Database connected')
);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

client.login(TOKEN).then(() => console.log(`Bot is running now`));
