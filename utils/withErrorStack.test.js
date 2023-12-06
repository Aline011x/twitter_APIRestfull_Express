const withErrorStack = require('./schemas/withErrorStack')

describe("[ utils / withErrorStack ]", () => {
    it ("should return the error with stack", () => {
        // Arrange
        const err  = { message : "Error" }
        const stack  = { TypeError : "Line 32" }
        const expected = { message : "Error", stack : {TypeError: "Line 32"} }

        // Act 
        const result = withErrorStack(err, stack, true)

        // Assert
        expect(result).toEqual(expected)
        })
    
    it ("should return the without stack", () => {

        const err  = { message : "Error" }
        const stack  = { TypeError : "Line 32" }
        const expected = { message : "Error"}

        // Act 
        const result = withErrorStack(err, stack, false)


        // Assert
        expect(result).toEqual(expected)
    })
})