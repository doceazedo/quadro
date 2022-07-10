import * as cookie from 'cookie';

export const setCookieHeaders = (token: string, days = 90) => ({
  'Set-Cookie': cookie.serialize('token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * days,
    sameSite: 'strict',
    path: '/',
  }),
});
