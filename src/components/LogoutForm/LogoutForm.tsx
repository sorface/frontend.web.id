import {FunctionComponent} from 'react';
import {Form, FormProps} from '../Form/Form';
import {Captions} from '../../constants';
import { ApiEndpoint } from '../../types/apiContracts';
import { useLogout } from '../../hooks/useLogout';

import './LogoutForm.css';

export interface LogoutFormProps {
  submitCaption?: FormProps['submitCaption'];
  children?: FormProps['children'];
}

export const LogoutForm: FunctionComponent<LogoutFormProps> = ({
  submitCaption,
  children,
}) => {
  const { logout } = useLogout();

  return (
    <Form
      htmlMethod='POST'
      htmlAction={ApiEndpoint.AccountsLogout}
      className='form-logout'
      fields={[]}
      fieldErrors={{ '': '' }}
      submitCaption={submitCaption ?? Captions.Logout}
      children={children}
      onSubmit={logout}
    />
  );
};
