const response = {
    success: (res, code, data, message) => {
        const result = {
            message,
            success: true,
            code,
            data
        };

        res.status(code).json(result)
    },
    failed: (res, code, data, message) => {
        const result = {
            message,
            success: false,
            code,
            data
        };

        res.status(code).json(result)
    }

};

module.exports = response