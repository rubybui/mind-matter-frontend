declare module 'react-native-crypto' {
  import { Buffer } from 'buffer';

  export function randomBytes(size: number): Buffer;
  export function createCipheriv(algorithm: string, key: Buffer, iv: Buffer): {
    update: (data: string, inputEncoding: string, outputEncoding: string) => string;
    final: (outputEncoding: string) => string;
  };
} 