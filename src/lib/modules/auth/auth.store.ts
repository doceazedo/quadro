import { writable } from 'svelte/store';
import type { User } from '@prisma/client';

export const USER = writable<User | null>(null);
