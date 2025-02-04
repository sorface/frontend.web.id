const getFromEnv = (varName: string) => {
    const value = process.env && process.env[varName];
    if (!value) {
        throw new Error(`process.env.${varName} are not defined`);
    }
    return value;
};

export const REACT_APP_GATEWAY_URL = getFromEnv('REACT_APP_GATEWAY_URL');

export const REACT_APP_PASSPORT_URL = REACT_APP_GATEWAY_URL + getFromEnv('REACT_APP_PASSPORT_PREFIX');

export const REACT_APP_VERSION = getFromEnv('REACT_APP_VERSION');

