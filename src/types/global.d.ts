// src/types/session.d.ts
import * as session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      _id: string;
      username: string;
      email: string;
      role: string;
      password: string;
    };
    admin?: {
      _id: string;
      username: string;
      email: string;
      role: string;
      password: string;
    };
  }
}
