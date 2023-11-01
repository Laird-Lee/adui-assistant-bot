import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import WsClient from 'ws';
import { OpcodeEnum } from './common/opcode.enum';
import { QQService } from '../qq/qq.service';
import { PayloadType } from './common/payload.type';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';

@Injectable()
export class WebsocketsService {
  private wsClient: WsClient;
  constructor(
    @Inject(forwardRef(() => QQService))
    private readonly qqService: QQService,

    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async connectToWebSocket() {
    const qq = await this.qqService.getNewToken();
    this.wsClient = new WsClient(qq.wsUrl);

    this.wsClient.on('open', () => {
      console.log('[SUCCESS] 连接服务成功');
    });

    this.wsClient.on('message', (data) => {
      // Handle incoming messages as needed
      const jsonData = JSON.parse(data.toString());
      switch (jsonData.op) {
        case OpcodeEnum.Hello:
          console.log('[MESSAGE] 消息接收:', JSON.parse(data.toString()));
          void this.getSession();
          break;
        case OpcodeEnum['Invalid Session']:
          console.log('[ERROR] 鉴权失败:', jsonData);
          break;
        default:
          console.log('[MESSAGE] 消息接收:', JSON.parse(data.toString()));
          return;
      }
    });

    this.wsClient.on('close', () => {
      console.log('[CLOSE] 连接关闭');
      // Implement reconnection logic if necessary
    });

    this.wsClient.on('error', (error) => {
      console.error('[ERROR] 事件接收:', error);
      // Handle errors as needed
    });
    // 消息监听
    this.wsClient.on('READY', (wsdata) => {
      console.log('[READY] 事件接收 :', wsdata);
    });

    this.wsClient.on('ERROR', (data) => {
      console.log('[ERROR] 事件接收 :', data);
    });

    this.wsClient.on('GUILDS', (data) => {
      console.log('[GUILDS] 事件接收 :', data);
    });

    this.wsClient.on('GUILD_MEMBERS', (data) => {
      console.log('[GUILD_MEMBERS] 事件接收 :', data);
    });

    this.wsClient.on('GUILD_MESSAGES', (data) => {
      console.log('[GUILD_MESSAGES] 事件接收 :', data);
    });

    this.wsClient.on('GUILD_MESSAGE_REACTIONS', (data) => {
      console.log('[GUILD_MESSAGE_REACTIONS] 事件接收 :', data);
    });

    this.wsClient.on('DIRECT_MESSAGE', (data) => {
      console.log('[DIRECT_MESSAGE] 事件接收 :', data);
    });

    this.wsClient.on('INTERACTION', (data) => {
      console.log('[INTERACTION] 事件接收 :', data);
    });

    this.wsClient.on('MESSAGE_AUDIT', (data) => {
      console.log('[MESSAGE_AUDIT] 事件接收 :', data);
    });

    this.wsClient.on('FORUMS_EVENT', (data) => {
      console.log('[FORUMS_EVENT] 事件接收 :', data);
    });

    this.wsClient.on('AUDIO_ACTION', (data) => {
      console.log('[AUDIO_ACTION] 事件接收 :', data);
    });

    this.wsClient.on('PUBLIC_GUILD_MESSAGES', (data) => {
      console.log('[PUBLIC_GUILD_MESSAGES] 事件接收 :', data);
    });
  }

  async getSession() {
    const qq = await this.qqService.getNewToken();
    if (qq?.token) {
      const data: PayloadType = {
        op: OpcodeEnum.Identify,
        d: {
          token: `QQBot ${qq.token}`,
          intents: 513,
          shard: [0, 1],
          properties: {},
        },
      };
      console.log(JSON.stringify(data));
      this.wsClient.send(JSON.stringify(data));
    }
  }
  create(createWebsocketDto: CreateWebsocketDto) {
    return 'This action adds a new websocket';
  }

  findAll() {
    return `This action returns all websockets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} websocket`;
  }

  update(id: number, updateWebsocketDto: UpdateWebsocketDto) {
    return `This action updates a #${id} websocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} websocket`;
  }
}
