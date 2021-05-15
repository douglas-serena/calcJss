function DOWN(value: number) {
  return Math.floor(value)
}
function ROUND(value: number) {
  return Math.round(value)
}
function UP(value: number) {
  return Math.ceil(value)
}
function SING(value: number) {
  return Math.sign(value)
}
function TRUNC(value: number) {
  return Math.trunc(value)
}
function POW(precision: number) {
  return Math.pow(10, precision)
}

export { DOWN, ROUND, UP, SING, POW, TRUNC }
