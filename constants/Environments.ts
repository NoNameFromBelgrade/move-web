export const Environments = {
  DEV: 'dev',
  TEST: 'test',
  PROD: 'prod',
} as const;

export type Environment =
  (typeof Environments)[keyof typeof Environments];