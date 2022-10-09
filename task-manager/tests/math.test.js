const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test('should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toEqual(13)
    // if (total !== 13) {
    //     throw new Error('total should be 13, got ' + total)
    // }
})

test('should calculate total with string parameter', () => {
    const total = calculateTip(10, '.3')
    expect(total).toEqual(13)
})

test('should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toEqual(12.5)
})

test('should calculate fahrenheit to celsius', () => {
    const temp = fahrenheitToCelsius(50, '.3')
    expect(temp).toEqual(10)
})

test('should calculate celsius to fahrenheit', () => {
    const temp = celsiusToFahrenheit(10)
    expect(temp).toEqual(50)
})