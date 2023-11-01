import { forwardRef, Module } from '@nestjs/common';
import { QQService } from './qq.service';
import { QQController } from './qq.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QQ } from './entities/qq.entity';
import { WebsocketsModule } from '../websockets/websockets.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([QQ]),
    forwardRef(() => WebsocketsModule),
  ],
  controllers: [QQController],
  providers: [QQService],
  exports: [QQService],
})
export class QQModule {}
