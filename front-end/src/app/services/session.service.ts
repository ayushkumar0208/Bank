import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {}

  storeEncodedSession(key: string, data: any): void {
    const jsonStr = JSON.stringify(data);
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
    const sessionData = {
      value: encoded,
      expiry: Date.now() + 10 * 60 * 1000 // 10 min expiry
    };
    sessionStorage.setItem(key, JSON.stringify(sessionData));
  }

  getDecodedSession(key: string): any | null {
    const item = sessionStorage.getItem(key);
    if (!item) return null;

    try {
      const sessionData = JSON.parse(item);
      if (Date.now() > sessionData.expiry) {
        sessionStorage.removeItem(key);
        console.warn(`${key} session expired`);
        return null;
      }

      const decodedStr = decodeURIComponent(escape(atob(sessionData.value)));
      return JSON.parse(decodedStr);
    } catch (err) {
      console.error('Failed to decode session data', err);
      return null;
    }
  }

  clearExpiredSessions(): void {
    const keysToRemove: string[] = [];

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        const item = sessionStorage.getItem(key);
        if (item) {
          try {
            const sessionData = JSON.parse(item);
            if (Date.now() > sessionData.expiry) {
              keysToRemove.push(key);
            }
          } catch {
            // Ignore items not in expected format
          }
        }
      }
    }

    keysToRemove.forEach(k => {
      console.warn(`Removing expired session: ${k}`);
      sessionStorage.removeItem(k);
    });
  }

  removeSessionKeyIfExists(key: string): void {
    if (sessionStorage.getItem(key)) {
        sessionStorage.removeItem(key);
        console.log(`Removed session key: ${key}`);
    }
    }
}