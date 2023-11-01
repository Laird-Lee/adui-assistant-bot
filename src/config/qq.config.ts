import { IsString } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { QQConfig } from './config.type';
import validateConfig from '../utils/validate-config';
import * as process from 'process';

class EnvironmentVariablesValidator {
  @IsString()
  QQ_ID: string;

  @IsString()
  QQ_TOKEN: string;

  @IsString()
  QQ_SECRET: string;
}

export default registerAs<QQConfig>('qq', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    id: process.env.QQ_ID,
    token: process.env.QQ_TOKEN,
    secret: process.env.QQ_SECRET,
  };
});
