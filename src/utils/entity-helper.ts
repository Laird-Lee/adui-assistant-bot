import { AfterLoad, BaseEntity } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

export class EntityHelper extends BaseEntity {
  __entity?: string;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
