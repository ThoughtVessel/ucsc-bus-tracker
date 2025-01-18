// src/lib/debug.ts

const isProduction = process.env.NODE_ENV === 'production';

// Define a type for acceptable console arguments
type ConsoleArgument = string | number | boolean | null | undefined | object | Error;

export const debug = {
  log: (message: string, ...args: ConsoleArgument[]) => {
    if (!isProduction) {
      console.log(message, ...args);
    }
  },
  error: (message: string, ...args: ConsoleArgument[]) => {
    if (!isProduction) {
      console.error(`❌ ${message}`, ...args);
    }
  }
};