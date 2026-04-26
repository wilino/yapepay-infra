import * as cdk from 'aws-cdk-lib';

import { devConfig } from '../lib/config/dev.js';

/**
 * Smoke test: garantiza que la configuración base se carga y que un App CDK
 * vacío puede sintetizarse sin errores. Se irán agregando tests reales por
 * stack a medida que cada uno se implemente.
 */
test('devConfig se carga con valores esperados', () => {
  expect(devConfig.projectName).toBe('yapepay');
  expect(devConfig.envName).toBe('dev');
  expect(devConfig.region).toBe('us-east-1');
  expect(devConfig.tags.ManagedBy).toBe('cdk');
});

test('cdk.App sintetiza sin stacks', () => {
  const app = new cdk.App();
  const assembly = app.synth();
  expect(assembly.stacks.length).toBe(0);
});
