// src/__tests__/setup.js
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Remove the Blob import from 'node:buffer' - jsdom provides it globally.
// Remove 'whatwg-fetch' - jsdom provides fetch globally.

afterEach(() => {
    cleanup();
});
