import { PartialType } from '@nestjs/swagger';
import { CreateQqDto } from './create-qq.dto';

export class UpdateQqDto extends PartialType(CreateQqDto) {}
