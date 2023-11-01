import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { firstValueFrom } from 'rxjs';
import { QQ } from './entities/qq.entity';
import { Repository } from 'typeorm';
import generatUUid from '../utils/generat-uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { WebsocketsService } from '../websockets/websockets.service';

@Injectable()
export class QQService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => WebsocketsService))
    private readonly websocketsService: WebsocketsService,
    private readonly configService: ConfigService<AllConfigType>,
    @InjectRepository(QQ)
    private readonly qqRepository: Repository<QQ>,
  ) {
    void this.getToken();
  }

  async getToken(): Promise<any> {
    const params = {
      appId: this.configService.getOrThrow('qq.id', { infer: true }),
      clientSecret: this.configService.getOrThrow('qq.secret', { infer: true }),
    };
    const { data } = await firstValueFrom(
      this.httpService.post(
        `https://bots.qq.com/app/getAppAccessToken`,
        params,
      ),
    );

    await this.qqRepository.remove(await this.qqRepository.find());

    await this.qqRepository.save(
      this.qqRepository.create({
        id: generatUUid(),
        token: data['access_token'],
      }),
    );
    void this.getGateway();
    return data;
  }

  async getGateway() {
    const qq = await this.getNewToken();
    this.httpService.axiosRef.interceptors.request.use((config) => {
      config.headers['X-Union-Appid'] = this.configService.getOrThrow('qq.id', {
        infer: true,
      });
      config.headers['Authorization'] = `QQBot ${qq.token}`;
      return config;
    });
    const { data } = await firstValueFrom(
      this.httpService.get(`https://api.sgroup.qq.com/gateway`),
    );
    await this.qqRepository.update({ id: qq.id }, { wsUrl: data.url });
    void this.websocketsService.connectToWebSocket();
    return data;
  }

  async getNewToken() {
    return await this.qqRepository.findOne({
      where: {
        has: true,
      },
      order: {
        createdAt: 'desc',
      },
    });
  }
}
