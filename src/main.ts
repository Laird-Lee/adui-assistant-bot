import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService<AllConfigType>);
  app.enableShutdownHooks();
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const options = new DocumentBuilder()
    .setTitle(configService.getOrThrow('app.name', { infer: true }))
    .setDescription('API DOC')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));

  console.log(`
           _____        _                    _     _              _     ____        _              _____ _____  
     /\\   |  __ \\      (_)     /\\           (_)   | |            | |   |  _ \\      | |       /\\   |  __ \\_   _| 
    /  \\  | |  | |_   _ _     /  \\   ___ ___ _ ___| |_ __ _ _ __ | |_  | |_) | ___ | |_     /  \\  | |__) || |   
   / /\\ \\ | |  | | | | | |   / /\\ \\ / __/ __| / __| __/ _\` | '_ \\| __| |  _ < / _ \\| __|   / /\\ \\ |  ___/ | |   
  / ____ \\| |__| | |_| | |  / ____ \\\\__ \\__ \\ \\__ \\ || (_| | | | | |_  | |_) | (_) | |_   / ____ \\| |    _| |_  
 /_/    \\_\\_____/ \\__,_|_| /_/    \\_\\___/___/_|___/\\__\\__,_|_| |_|\\__| |____/ \\___/ \\__| /_/    \\_\\_|   |_____| 

    Api running at:     http://localhost:${configService.getOrThrow(
      'app.port',
      {
        infer: true,
      },
    )}/${configService.getOrThrow('app.apiPrefix', { infer: true })}
    Swagger running at: http://localhost:${configService.getOrThrow(
      'app.port',
      {
        infer: true,
      },
    )}/docs                                                                                                                
`);
}

void bootstrap();
