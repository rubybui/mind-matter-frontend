import 'react-native-get-random-values';

import { config } from '../config';
import CryptoJS from 'crypto-js';
const IV_LENGTH = 16; // AES block size
const KEY_LENGTH = 16; // AES key length
export function encrypt(text: string): string {
  const key = config.encryptionKey;

  // Generate a random IV
  const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
  // Encrypt
  const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key.slice(0,KEY_LENGTH)), {
    iv: iv,
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding,
  });
  // Concatenate iv + ciphertext and base64 encode it
  const combined = iv.concat(encrypted.ciphertext);

  return combined.toString(CryptoJS.enc.Base64);
}