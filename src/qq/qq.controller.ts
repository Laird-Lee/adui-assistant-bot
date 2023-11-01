import { Controller, Get, Post } from '@nestjs/common';
import { QQService } from './qq.service';

@Controller('qq')
export class QQController {
  constructor(private readonly qqService: QQService) {}

  @Post()
  getToken() {
    return this.qqService.getToken();
  }

  @Get()
  getGateway() {
    return this.qqService.getGateway();
  }
}
