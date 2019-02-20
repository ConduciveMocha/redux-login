
export function makeLengthValidator(minLen, maxLen = -1) {

    if (maxLen < 0) {
        if (minLen < 0) throw Error("minLen must be positive");
        else return function (input) {
            return { value: input, isValid: minLen <= input.length };
        };
    }
    else {
        if (maxLen <= minLen) throw Error("Argument minLen is greater than argument maxLen")
        else return function (input) {
            return { value: input, isValid: minLen <= input.length && input.length <= maxLen }
        };
    }
}
export function makeRegexValidator(regex){
    return function(s) {
        return s.match(regex)
    }
}

export function formStateValidator(formState) {
    return formState.includes('')
}
