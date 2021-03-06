export function validateKeyExists(ethofsKey) {
    if (!ethofsKey || ethofsKey === '') {
        return false;
    }
    return true;
}

export function validateEthofsKey(ethofsKey) {
    if (!ethofsKey || ethofsKey === '') {
        throw new Error('No ethoFS private key provided! Please provide your ethoFS private key as an argument when you start this script');
    }
}

export function validateEthofsDataFilter(data) {
    if (data.name) {
        if (!(typeof data.name === 'string' || data.name instanceof String)) {
            throw new Error('ethofsData name must be of type string');
        }
    }

    if (data.keyvalues) {
        if (!(typeof data.keyvalues === 'object')) {
            throw new Error('ethofsData keyvalues must be an object');
        }

        let i = 0;

        Object.entries(data.keyvalues).forEach(function (keyValue) {
            if (i > 9) {
                throw new Error('No more than 10 keyvalues can be provided for ethofsData entries');
            }
            //  we want to make sure that the input is a string, a boolean, or a number, so we don't get an object passed in by accident
            if (!(typeof keyValue[1] === 'string' || typeof keyValue[1] === 'boolean' || !isNaN(keyValue[1]))) {
                throw new Error('EthofsData keyvalue values must be strings, booleans, or numbers');
            }
            i++;
        });
    }
}

export function validateEthofsData(data) {
    if (data.name) {
        if (!(typeof data.name === 'string' || data.name instanceof String)) {
            throw new Error('ethofsData name must be of type string');
        }
    }

    if (data.keyvalues) {
        if (!(typeof data.keyvalues === 'object')) {
            throw new Error('ethofsData keyvalues must be an object');
        }

        let i = 0;

        Object.entries(data.keyvalues).forEach(function (keyValue) {
            if (i > 9) {
                throw new Error('No more than 10 keyvalues can be provided for ethofsData entries');
            }
            //  we want to make sure that the input is a string, a boolean, or a number, so we don't get an object passed in by accident
            if (!(typeof keyValue[1] === 'string' || typeof keyValue[1] === 'boolean' || !isNaN(keyValue[1]))) {
                throw new Error('EthofsData keyvalue values must be strings, booleans, or numbers');
            }
            i++;
        });
    }
}

export function validateEthofsOptions(options) {
    if (typeof options !== 'object') {
        throw new Error('options must be an object');
    }

    if (options.hostingContractDuration) {
        if (options.hostingContractDuration < 6646 || typeof options.hostingContractDuration !== 'number') {
            throw new Error('incorrect hosting contract duration');
        }
    }

/*    if (options.cidVersion) {
        // eslint-disable-next-line eqeqeq
        if (options.cidVersion != 0 && options.cidVersion != 1) {
            throw new Error('unsupported or invalid cidVersion');
        }
    }
    if (options.wrapWithDirectory) {
        // eslint-disable-next-line eqeqeq
        if (options.wrapWithDirectory !== true && options.wrapWithDirectory !== false) {
            throw new Error('wrapWithDirectory must be a boolean value of true or false');
        }
    }*/
}
