const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

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

test('async test demo', (done) => {
        expect(1).toBe(1)
        done()
})

test('should add 2 numbers', (done) => {
    add(2, 5).then((sum) => {
        expect(sum).toEqual(7)
        done()
    })
})

test('should add 2 numbers async/await', async () => {
    const sum = await add(12, 5)
    expect(sum).toEqual(17)
})