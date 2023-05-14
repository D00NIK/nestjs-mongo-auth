import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const MongoStore = require('connect-mongo');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(
    session({
      name: 'SESSION_ID',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        crypto: {
          secret: process.env.SESSION_STORE_SECRET,
        },
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
}
bootstrap();
