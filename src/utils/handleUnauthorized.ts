import {REACT_APP_GATEWAY_URL, REACT_APP_PASSPORT_URL} from '../config';

export const handleUnauthorized = async (response: Response) => {
  try {
    const response = await fetch(`${REACT_APP_PASSPORT_URL}/api/accounts/authenticated`, {
      credentials: 'include'
    });

    if (response.status !== 200) {
      console.log('Access denied');
    }

    const responseJson = await response.json();

    window.location.href = `${REACT_APP_GATEWAY_URL}/oauth2/authorization/passport?redirect-location=${encodeURIComponent(window.location.href)}`;
    return;
  } catch { }
};
