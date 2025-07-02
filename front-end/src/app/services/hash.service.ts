import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor() {}
    hashPassword(password: string): string{
        const salt = "$2a$10$1234567890123456789012";
        const hash = bcrypt.hashSync(password,salt);
        return hash;
      }
  
}