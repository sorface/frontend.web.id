import {REACT_APP_GATEWAY_URL} from '../config';

export const handleUnauthorized = async (response: Response) => {
    window.location.href = `${REACT_APP_GATEWAY_URL}/oauth2/authorization/passport?redirect-location=${encodeURIComponent(window.location.href)}`;
};
