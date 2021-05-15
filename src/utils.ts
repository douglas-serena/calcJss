import calc from './calc'
import { Settings } from './calc.domain'
import { ROUND } from './math'

function isInstance(value: any) {
  return value instanceof calc
}

function isNumeric(value: any) {
  return !isNaN(parseInt(value)) && isFinite(value)
}

function isString(value: any) {
  return typeof value === 'string'
}

function isUndefined(value: any) {
  return typeof value === 'undefined'
}

function isFloat(value: any) {
  return isNumeric(value) && !Number.isInteger(value)
}

function rounding(value: any, settings: Settings) {
  if (settings?.increment > 0) {
    return ROUND(value / settings.increment) * settings.increment
  }
  return value
}

export { isInstance, isNumeric, isString, isUndefined, isFloat, rounding }
