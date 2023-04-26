import 'whatwg-fetch';
import 'setimmediate';
import '@testing-library/jest-dom/extend-expect';

require('dotenv').config({
  path: '.env'
});
jest.mock('./__tests__/__helpers__/getEnviroments', () => ({
  getEnviroments: () => ({ ...process.env })
}));

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return null;
  }

  unobserve() {
    return null;
  }
};
