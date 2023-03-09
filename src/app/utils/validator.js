export default (data, config) => {
    const errors = {};

    const validate = (validateMethod, data, config) => {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
        }

        if (statusValidate) return config.message;
    };

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const hasError = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );

            if (hasError) errors[fieldName] = hasError;
        }
    }

    return errors;
};
