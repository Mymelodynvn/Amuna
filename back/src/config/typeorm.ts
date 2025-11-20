import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({path: '.env.development'});

const config: DataSourceOptions ={
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*{.ts, .js}'],
    logging: true, //muestra en la consola la interacción con la db
    synchronize: true, // sincroniza las entidades con la db
    dropSchema: true, //limpia, borra y crea nuevamente las entidades. Siempre en false porque puede borrar la DB
};

export default registerAs('typeorm',() => config);
export const connectionSource = new DataSource(config);