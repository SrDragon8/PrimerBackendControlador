const { sum } = require('../helpers')

describe('Helpers', () =>
{
    it('should', () =>{
        const result = sum(2, 2);
        expect(result).toBe(4);
    })

    it('should', () =>{
        const result = sum(3, 2);
        expect(result).not.toBe(4);
    })

})