import '@testing-library/jest-dom';

// Mock fetch globally
global.fetch = jest.fn();

// Reset all mocks after each test
afterEach(() => {
  jest.resetAllMocks();
});

// Mock window.crypto for quantum operations
Object.defineProperty(window, 'crypto', {
  value: {
    subtle: {
      digest: jest.fn().mockImplementation(async () => new Uint8Array(32)),
      importKey: jest.fn().mockImplementation(async () => ({})),
      deriveKey: jest.fn().mockImplementation(async () => ({})),
      encrypt: jest.fn().mockImplementation(async () => new Uint8Array(32)),
      decrypt: jest.fn().mockImplementation(async () => new Uint8Array(32))
    },
    getRandomValues: jest.fn().mockImplementation(() => new Uint8Array(32))
  }
});

// Suppress console errors during tests
console.error = jest.fn();
