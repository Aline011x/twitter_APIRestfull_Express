const withErrorStack = require('./schemas/withErrorStack');

describe("[ utils / withErrorStack]", () => {
    it ("should return the error with stack", () => {
        // Arrange
        const error  = { message : "Error" }
        const stack  = { TypeError : "Line 32" }
        const expected = { message : "Error", stack : {TypeError: "Line 32"} }

        // Act 
        const result = withErrorStack(error, stack, true)

        // Assert
        expect(result).toEqual(expected)
        })
    
    it ("should return the without stack", () => {

        const error  = { message : "Error" }
        const stack  = { TypeError : "Line 32" }
        const expected = { message : "Error"}

        // Act 
        const result = withErrorStack(error, stack, false)


        // Assert
        expect(result).toEqual(expected)
    })
})