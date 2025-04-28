/// <reference types="node" />

export const environment = {
    production: true,
    apiToken: process.env['API_TOKEN'] || ''
  };