export type AppConfig = {
  nodeEnv: string;
  name: string;
  port: number;
  apiPrefix: string;
  docPort: number;
};

export type DatabaseConfig = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
};

export type QQConfig = {
  id: string;
  token: string;
  secret: string;
};

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  qq: QQConfig;
};
