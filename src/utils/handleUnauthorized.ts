import { REACT_APP_LOGIN_URL } from '../config';

const redirectToLogin = () => {
  window.location.href = REACT_APP_LOGIN_URL;
};

export const handleUnauthorized = async (response: Response) => {
  try {
    const responseJson = await response.json();
    if (responseJson.authentication) {
      const response = await fetch(`oauth2/authorization/passport?redirect-location=${encodeURIComponent(window.location.href)}`);
      if (response.status !== 302) {
        return redirectToLogin();
      }
      const locationHeader = response.headers.get('location');
      if (!locationHeader) {
        return redirectToLogin();
      }
      window.location.href = locationHeader;
      return;
    }
  } catch { };
  redirectToLogin();
};
