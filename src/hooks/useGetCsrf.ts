import { useCallback, useReducer } from "react";
import { REACT_APP_PASSPORT_URL } from "../config";
import { CsrfToken } from "../types/сsrf";
import { HttpResponseCode } from "../constants";
import { handleUnauthorized } from '../utils/handleUnauthorized';

interface CsrfConfigState {
    process: {
        csrfConfigLoading: boolean;
        csrfConfigError: string | null;
    };
    csrfConfig: CsrfToken | null;
}

const initialState: CsrfConfigState = {
    process: {
        csrfConfigLoading: false,
        csrfConfigError: null,
    },
    csrfConfig: null,
};

type GetCsrfAction = {
    name: 'startLoad';
} | {
    name: 'setCsrfConfig';
    payload: CsrfToken;
} | {
    name: 'setError';
    payload: string;
};

const getCsrfConfigReducer = (state: CsrfConfigState, action: GetCsrfAction): CsrfConfigState => {
    switch (action.name) {
        case 'startLoad':
            return {
                process: {
                    csrfConfigLoading: true,
                    csrfConfigError: null,
                },
                csrfConfig: null,
            };
        case 'setError':
            return {
                ...state,
                process: {
                    csrfConfigLoading: false,
                    csrfConfigError: action.payload
                }
            };
        case 'setCsrfConfig':
            return {
                process: {
                    csrfConfigLoading: false,
                    csrfConfigError: null,
                },
                csrfConfig: action.payload
            };

        default:
            return state;
    }
};

export const useCsrfApi = () => {
    const [csrfConfigState, dispatch] = useReducer(getCsrfConfigReducer, initialState);

    const loadCsrfConfig = useCallback(async () => {
        dispatch({ name: 'startLoad' });

        try {
            const response = await fetch(
                `${REACT_APP_PASSPORT_URL}/api/csrf`,
                { credentials: 'include' },
            );
            console.log(response);
            if (response.status === HttpResponseCode.Unauthorized) {
                return await handleUnauthorized(response);
            }
            if (!response.ok) {
                throw new Error('UserApi error');
            }
            const responseJson = await response.json();
            dispatch({ name: 'setCsrfConfig', payload: responseJson });
        } catch (err: any) {
            dispatch({
                name: 'setError',
                payload: err.message || 'Failed to get csrf config',
            });
        }
    }, []);

    return {
        csrfConfigState,
        loadCsrfConfig,
    };
};
