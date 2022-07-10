/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { User } from '@prisma/client';

declare global {
  declare namespace App {
    interface Locals {
      user: User?;
    }
    // interface Platform {}
    interface Session {
      user: User?;
    }
    // interface Stuff {}
  }
}
