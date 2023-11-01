import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';
import validateConfig from '../utils/validate-config';
import * as process from 'process';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_DOC_PORT: number;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'app',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 9001,
    apiPrefix: process.env.API_PREFIX || 'api',
    docPort: process.env.APP_DOC_PORT
      ? parseInt(process.env.APP_DOC_PORT, 10)
      : 9003,
  };
});
