import { ConnectionOptions } from 'typeorm';
import entities from './entities';

const connectionOptions: ConnectionOptions = {
  entities,
  type: 'postgres',
  port: 5432,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  dropSchema: process.env.TYPEORM_DROPSCHEMA === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
};

export default connectionOptions;
