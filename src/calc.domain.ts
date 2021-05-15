export type Any = string | number | Calc

export interface Settings {
  precision?: number
  errors?: boolean
  decimal?: string
  separator?: string
  increment?: number
  round?: 'DOWN' | 'ROUND' | 'UP'
}

export interface Calc {
  constructor(value?: Any, settings?: Settings): Calc

  value: number
  initValue: number

  _parse(value: Any, rounding?: boolean): number

  add(value: Any, valOrSettings?: Any | Settings, settings?: Settings): Calc
  subtract(value: Any, valOrSettings?: Any | Settings, settings?: Settings): Calc
  multiply(value: Any, valOrSettings?: Any | Settings, settings?: Settings): Calc
  divide(value: Any, valOrSettings?: Any | Settings, settings?: Settings): Calc
  percent(percentage: Any, valOrSettings?: Any | Settings, settings?: Settings): Calc
  increment(percentage: Any, settings?: Settings): Calc
  discount(percentage: Any, settings?: Settings): Calc
  distribute(number: Any, settings?: Settings): number[]
  toString(): string
  toJSON(): number
}
