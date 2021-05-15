import calcJs from '../src/calc'

/**
 * Calc test
 */
describe('Calc.js test', () => {
  it('calc is instantiable', () => {
    expect(calcJs()).toBeInstanceOf(calcJs)
  })

  it('calculate passing string as param', () => {
    const value = calcJs('2.51').add('0.01').value

    expect(value).toEqual(2.52)
  })

  it('calculate passing another instance as param', () => {
    const value = calcJs(calcJs(2.51)).add(calcJs(0.01)).value

    expect(value).toEqual(2.52)
  })

  it('Sum (2.51 + 0.01 = 2.52)', () => {
    const value = calcJs(2.51).add(0.01).value

    expect(value).toEqual(2.52)
  })

  it('Sum with increment 0.05 (2.51 + 0.03 = 2.55)', () => {
    const value = calcJs(2.51, { increment: 0.05 }).add(0.03).value

    expect(value).toEqual(2.55)
  })

  it('Subtract with increment 0.05 (2.53 - 0.01 = 2.50)', () => {
    const value = calcJs(2.53, { increment: 0.05 }).subtract(0.01).value

    expect(value).toEqual(2.5)
  })

  it('Subtract (2.52 - 0.01 = 2.51)', () => {
    const value = calcJs(2.52).subtract(0.01).value

    expect(value).toEqual(2.51)
  })

  it('Multiply - Rounding Down (33.33 * 3.3 = 109.98)', () => {
    const value = calcJs(33.33).multiply(3.3).value

    expect(value).toEqual(109.98)
  })

  it('Multiply - Rounding Up (33.33 * 3.3 = 109.99)', () => {
    const value = calcJs(33.33).multiply(3.3, { round: 'UP' }).value

    expect(value).toEqual(109.99)
  })

  it('Divide - Rounding Down (100 / 3 = 33.33)', () => {
    const value = calcJs(100).divide(3).value

    expect(value).toEqual(33.33)
  })

  it('Divide - Rounding Up (100 / 3 = 33.34)', () => {
    const value = calcJs(100).divide(3, { round: 'UP' }).value

    expect(value).toEqual(33.34)
  })

  it('Percent (25 / 20% = 5)', () => {
    const value = calcJs(25).percent(20).value

    expect(value).toEqual(5)
  })

  it('Increment (25 / 20% = 30)', () => {
    const value = calcJs(25).increment(20).value

    expect(value).toEqual(30)
  })

  it('Discount (25 / 20% = 20)', () => {
    const value = calcJs(25).discount(20).value

    expect(typeof value).toBe('number')
    expect(value).toEqual(20)
  })

  it('Distribute (250 / 12 = [25.33, 25.33, 25.34])', () => {
    const value = calcJs(76).distribute(3)

    expect(value).toEqual([25.33, 25.33, 25.34])
  })

  it('Distribute width instance of Calc (250 / 12 = [25.33, 25.33, 25.34])', () => {
    const number = calcJs(3)
    const value = calcJs(76).distribute(number)

    expect(value).toEqual([25.33, 25.33, 25.34])
  })

  it('Convert to string', () => {
    const value = calcJs(2.51)
      .add(0.01)
      .toString()

    expect(typeof value).toBe('string')
    expect(value).toBe('2.52')
  })

  it('Convert to JSON', () => {
    const value = calcJs(2.51)
      .add(0.01)
      .toJSON()

    expect(typeof value).toBe('number')
    expect(value).toBe(2.52)
  })
})
