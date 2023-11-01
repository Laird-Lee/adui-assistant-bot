import { OpcodeEnum } from './opcode.enum';

// op 指的是 opcode，参考连接维护 opcode 列表
// s 下行消息都会有一个序列号，标识消息的唯一性，客户端需要再发送心跳的时候，携带客户端收到的最新的 s。
// t 和 d 主要是用在 op 为 0 Dispatch 的时候。
// t 代表事件类型。
// d 代表事件内容，不同事件类型的事件内容格式都不同，请注意识别。

export type PayloadType = {
  op: OpcodeEnum;
  d: any;
  s?: number;
  t?: string;
};
