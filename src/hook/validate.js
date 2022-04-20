function useValidator(value, validates) {
    const errors = {};
    for (const validate of validates) {
        if (errors[validate.key]) {
            continue;
        }
        const result = validate.test(value[validate.key]);
        if (result) {
            errors[validate.key] = result;
        }
    }

    return errors;
}

useValidator.isRequired = function (key, message, active=true) {
    return {
        key,
        test: function (value = "") {
            return String(value).trim().length || !active ? null : message;
        }
    }
};
useValidator.isEmail = function (key, message = null) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return {
        key,
        test: function (value = "") {
            return regex.test(value) ? undefined : message
        }
    }
}

useValidator.isConfirm = function (key, password, message = null) {
    return {
        key,
        test: function (value) {
            /* Check Password Input Password_Confirm And Password */
            return value === password ? undefined : message
        }
    }
}
useValidator.max = function (key, maxValue, message = null) {
    return {
        key,
        test: function (value) {
            return String(value).length < maxValue ? undefined : message;
        }
    }
}

useValidator.min = function (key, minValue, message = null) {
    return {
        key,
        test: function (value) {
            return String(value).length > minValue ? undefined : message;
        }
    }
}
useValidator.isPhone = function (key, message = null) {
    return {
        key,
        test: function (value) {
            const regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            return !value || regex.test(value) ? undefined : message;
        }
    }
}

useValidator.isNumber = function (key, message) {
    return {
        key,
        test: function (value) {
            return !isNaN(value) ? undefined : message
        }
    }
}

useValidator.maxValue = function (key, message, maxValue) {
    return {
        key,
        test: function (value) {
            return value > maxValue ? message : undefined;
        }
    }
}

/**
 * @param int key 
 * @param string message 
 * @param array values 
 */
useValidator.in = function (key, message, values) {
    return {
        key,
        test: function (value) {
            return values.includes(value) ? undefined : message;
        }
    }
}

/**
 * 
 * @param {integer} key 
 * @param {string} message 
 * @returns object {key,test}
 */
useValidator.isImage = function (key, message) {
    return {
        key,
        test: function (file) {
            return ["image/jpeg", "image/png"].includes(file.type) ? undefined : message;
        }
    }
}

/**
 * 
 * @param {string} key 
 * @param {string} message 
 * @param {integer} maxSize is Byte = kb*1080 
 * @returns object {key,test}
 */
useValidator.maxSize = function (key, message, maxSize) {
    return {
        key,
        test: function (file) {
            return file.size > maxSize ? message : undefined;
        }
    }
}
export default useValidator;