import { DataSource } from 'typeorm';
import { typeormConfig } from './ormconfig';

const options = typeormConfig;

export default new DataSource(options);
