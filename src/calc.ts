import * as maths from './math'
import { isInstance, isNumeric, isString, rounding } from './utils'
import { Any, Settings, Calc } from './calc.domain'

const _settings = {
  precision: 2,
  errors: false,
  decimal: '.',
  separator: ',',
  increment: 0,
  round: 'DOWN'
}

function calcJs(value?: Any, settings?: Settings): Calc {
  if (this === undefined || !(this instanceof calcJs)) {
    return new (calcJs as any)(value, settings)
  }

  this.settings = Object.assign({}, _settings, settings)

  let precision = maths.POW(this.settings.precision)
  let val = this._parse(value, false)

  this.initValue = this._parse(val / precision)
  this.value = this._parse(rounding(val / precision, this.settings))
}

// PARSE VALUE
calcJs.prototype._parse = function(value, rounding = true) {
  const { precision: decimals, decimal, errors, round } = this.settings

  let val: number = 0
  let precision = maths.POW(decimals)

  if (isInstance(value) || isNumeric(value)) {
    val = isNumeric(value) ? value : (value as any).value
  } else if (isString(value)) {
    let regex = new RegExp(`[^-\\d${decimal}]`, 'g')
    let decimalStr = new RegExp(`\\${decimal}`, 'g')

    let valTmp = (value as string)
      .replace(/\((.*)\)/, '-$1')
      .replace(regex, '')
      .replace(decimalStr, '')

    val = Number(valTmp) || 0
  } else {
    if (errors) new Error('Invalid Input.')
  }

  val *= precision
  val = Number(val.toFixed(4))

  return rounding ? maths[round](val) / precision : maths[round](val)
}

// SUM VALUE
calcJs.prototype.add = function(value: Any, val?: Any | Settings, settings?: Settings) {
  if (typeof val === 'string' || typeof val === 'number' || isInstance(val)) {
    Object.assign(this.settings, settings)
    return this._parse(this._parse(value) + this._parse(val))
  }
  Object.assign(this.settings, val)

  this.initValue = this._parse(this.initValue + this._parse(value))

  return calcJs(this.initValue, this.settings)
}

// SUBTRACT VALUE
calcJs.prototype.subtract = function(value: Any, val?: Any | Settings, settings?: Settings) {
  if (typeof val === 'string' || typeof val === 'number' || isInstance(val)) {
    Object.assign(this.settings, settings)
    return this._parse(this._parse(value) - this._parse(val))
  }
  Object.assign(this.settings, val)
  this.initValue = this._parse(this.initValue - this._parse(value))

  return calcJs(this.initValue, this.settings)
}

// SUBTRACT VALUE
calcJs.prototype.multiply = function(value: Any, val?: Any | Settings, settings?: Settings) {
  if (typeof val === 'string' || typeof val === 'number' || isInstance(val)) {
    Object.assign(this.settings, settings)
    return this._parse(this._parse(value) * this._parse(val))
  }
  Object.assign(this.settings, val)

  this.initValue = this._parse(this.initValue * this._parse(value))

  return calcJs(this.initValue, this.settings)
}

// DIVIDE VALUE
calcJs.prototype.divide = function(value: Any, val?: Any | Settings, settings?: Settings) {
  if (typeof val === 'string' || typeof val === 'number' || isInstance(val)) {
    Object.assign(this.settings, settings)
    return this._parse(this._parse(value) / this._parse(val))
  }
  Object.assign(this.settings, val)

  this.initValue = this._parse(this.initValue / this._parse(value))

  return calcJs(this.initValue, this.settings)
}

// PERCENT VALUE
calcJs.prototype.percent = function(percentage: Any, val?: Any | Settings, settings?: Settings) {
  if (typeof val === 'string' || typeof val === 'number' || isInstance(val)) {
    Object.assign(this.settings, settings)
    return this.divide(this.multiply(this._parse(percentage), this._parse(val)), 100)
  }
  Object.assign(this.settings, val)

  this.initValue = this.divide(this.multiply(this.initValue, percentage), 100)

  return calcJs(this.initValue, this.settings)
}

// Increment percent
calcJs.prototype.increment = function(percentage: Any, settings?: Settings) {
  Object.assign(this.settings, settings)

  this.initValue = this.add(this.percent(this.initValue, percentage), this.initValue)

  return calcJs(this.initValue, this.settings)
}

// DISCOUNT VALUE
calcJs.prototype.discount = function(percentage: Any, settings?: Settings) {
  Object.assign(this.settings, settings)

  this.initValue = this.subtract(this.initValue, this.percent(this.initValue, percentage))

  return calcJs(this.initValue, this.settings)
}

calcJs.prototype.distribute = function(number: Any, settings?: Settings) {
  Object.assign(this.settings, settings)

  number = this._parse(number) as number

  let array: number[] = []
  let index = number

  let value = this.divide(this.initValue, number)
  for (; index > 0; index--) {
    if (index === 1) {
      array.push(this.subtract(this.initValue, this.multiply(value, number - 1)))
    } else {
      array.push(value)
    }
  }

  return array
}

// CONVERT TO STRING
calcJs.prototype.toString = function() {
  const { precision } = this.settings
  return this.initValue.toFixed(precision)
}

// CONVERT TO JSON
calcJs.prototype.toJSON = function() {
  return this.value
}

export default calcJs
