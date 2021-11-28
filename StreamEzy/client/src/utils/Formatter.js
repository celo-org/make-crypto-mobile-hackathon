function Formatter() {
    return new Intl.NumberFormat(
        'en-US',
        {
            style: 'currency',
            currency: 'USD',
            minimumIntegerDigits: 2
        }
    )
}

export default Formatter;