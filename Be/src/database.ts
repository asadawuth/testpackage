import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: 'PG_POOL',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const pool = new Pool({
          host: config.get<string>('DB_HOST'),
          port: Number(config.get<string>('DB_PORT')),
          user: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
        });

        // 🔥 test connection (แนะนำมาก)
        pool
          .connect()
          .then((client) => {
            console.log('✅ PostgreSQL connected');
            client.release();
          })
          .catch((err) => {
            console.error('❌ DB connection failed', err.message);
          });

        return pool;
      },
    },
  ],
  exports: ['PG_POOL'],
})
export class DatabaseModule {}
