import { Numeric } from './baseValue'

export type Rule =
  | { type: 'add'; value: Numeric }
  | { type: 'multiply'; value: Numeric }
  | { type: 'timeBonus'; maxPoints: Numeric; timeElapsed: Numeric; penalty: Numeric };

export type Bonus = {
  value: Numeric;
  condition?: (score: Numeric) => boolean;
};

