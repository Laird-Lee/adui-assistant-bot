import { customAlphabet } from 'nanoid';

export default function generatUUid() {
  const nanoid = customAlphabet('1234567890', 14);
  return `1404${nanoid()}`;
}
