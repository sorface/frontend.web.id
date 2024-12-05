export const handleUnauthorized = async (response: Response) => {
  try {
    const responseJson = await response.json();
    if (responseJson.authentication) {
      window.location.href = `oauth2/authorization/passport?redirect-location=${encodeURIComponent(window.location.href)}`;
      return;
    }
  } catch { };
  window.location.href = 'please-pass-env-variable-for-login-page-url.com';
};
