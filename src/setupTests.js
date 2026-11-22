import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

// Top-level mock for react-router-dom matching Jest __mocks__ behavior
vi.mock('react-router-dom', () => ({
  useNavigate: () => () => {},
  useLocation: () => ({ pathname: '/admin/login', state: {} }),
  useSearchParams: () => [new URLSearchParams(), () => {}],
  Link: ({ children, to, ...props }) => React.createElement('a', { href: to, ...props }, children),
  Navigate: ({ to }) => React.createElement('div', { 'data-testid': 'navigated-to' }, to),
  BrowserRouter: ({ children }) => React.createElement('div', null, children),
  Routes: ({ children }) => React.createElement('div', null, children),
  Route: ({ element }) => element,
}));

// Bridge Jest APIs to Vitest vi in Vitest environments for backward compatibility
if (typeof jest === 'undefined') {
  globalThis.jest = vi;
}
