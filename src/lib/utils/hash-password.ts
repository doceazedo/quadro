import sha256 from 'crypto-js/sha256';
import 'dotenv/config';

const salt = process.env.PASSWORD_SALT;

export const hashPassword = (password: string) =>
  sha256(`${salt}.${password}`).toString();
