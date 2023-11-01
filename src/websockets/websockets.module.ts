import { forwardRef, Module } from '@nestjs/common';
import { WebsocketsService } from './websockets.service';
import { WebsocketsGateway } from './websockets.gateway';
import { QQModule } from '../qq/qq.module';

@Module({
  imports: [forwardRef(() => QQModule)],
  providers: [WebsocketsGateway, WebsocketsService],
  exports: [WebsocketsService],
})
export class WebsocketsModule {}
