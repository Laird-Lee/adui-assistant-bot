import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import moment from 'moment';
import { Exclude } from 'class-transformer';

@Entity('sys_qq_token')
export class QQ extends EntityHelper {
  @PrimaryColumn()
  id: string;

  @Column({
    default: true,
  })
  has: boolean;

  @Column({
    type: 'text',
  })
  token: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  wsUrl: string;

  @CreateDateColumn({
    transformer: {
      to(value: any): any {
        return value;
      },
      from(value: any): any {
        return moment(value).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    transformer: {
      to(value: any): any {
        return value;
      },
      from(value: any): any {
        return moment(value).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  })
  updatedAt: Date;
}
