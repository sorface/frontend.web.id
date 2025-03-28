import React, {ChangeEvent, FunctionComponent, useContext, useEffect, useState} from 'react';
import {Captions, IconNames} from "../../constants";
import {Icon} from '../../components/Icon/Icon';
import {AuthContext} from '../../context/AuthContext';
import {useApiMethodCsrf} from '../../hooks/useApiMethodCsrf';
import {accountsApiDeclaration, EditAccountBody} from '../../apiDeclarations';
import {Loader} from '../../components/Loader/Loader';
import {UserAvatar} from '../../components/UserAvatar/UserAvatar';
import {getUserAvatarCaption} from '../../utils/getUserAvatarCaption';

import './Account.css';
import {AccountRole} from "../../types/account";
import {ApiEndpoint} from "../../types/apiContracts";
import {REACT_APP_GATEWAY_URL, REACT_APP_POST_LOGOUT_REDIRECT_URL} from "../../config";

interface ProfileField {
    name: string;
    caption: string;
    value: string | undefined;
    editable: boolean;
}

export const AccountPage: FunctionComponent = () => {
    const {account, loadAccount} = useContext(AuthContext);
    const {fetchData, apiMethodState} = useApiMethodCsrf<unknown, EditAccountBody>(accountsApiDeclaration.edit);
    const {data, process: {error, loading}} = apiMethodState;
    const [editedFieldName, setEditedFieldName] = useState('');
    const [editedFieldValue, setEditedFieldValue] = useState('');

    const handleEditField = (fieldName: string, initialValue: string) => {
        setEditedFieldName(fieldName);
        setEditedFieldValue(initialValue);
    };

    const handleEditedFieldChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedFieldValue(e.target.value);
    };

    const handleEditedFieldCancel = () => {
        setEditedFieldName('');
    };

    useEffect(() => {
        if (!data) {
            return;
        }
        loadAccount();
    }, [data, loadAccount]);

    useEffect(() => {
        if (apiMethodState.data == null) {
            return;
        }
        console.log('post', apiMethodState.data);
        loadAccount();
    }, [apiMethodState.data, loadAccount]);

    const handleEditedFieldSave = () => {
        if (!account) {
            console.warn('Account is empty')
            return;
        }
        handleEditedFieldCancel();
        fetchData({
            id: account.id,
            [editedFieldName]: editedFieldValue,
        });
    };

    const convertRole = (role: AccountRole): string => {
        return AccountRole[role.toString() as keyof typeof AccountRole];
    };

    const fields: ProfileField[] = [
        {
            name: 'id',
            caption: Captions.Id,
            value: account?.id,
            editable: false,
        },
        {
            name: 'username',
            caption: Captions.Username,
            value: account?.nickname,
            editable: false,
        },
        {
            name: 'email',
            caption: Captions.Email,
            value: account?.email,
            editable: false,
        },
        {
            name: 'firstname',
            caption: Captions.FirstName,
            value: account?.firstName,
            editable: true,
        },
        {
            name: 'lastname',
            caption: Captions.LastName,
            value: account?.lastName,
            editable: true,
        },
        {
            name: 'roles',
            caption: Captions.Roles,
            value: account?.roles?.map(role => convertRole(role)).join(', '),
            editable: false,
        },
    ];

    return (
        <div className='account-page'>
            <UserAvatar
                nickname={`${account?.nickname}`}
                caption={getUserAvatarCaption(account)}
                src={account?.avatar}
            />
            {!!error && (<div>{Captions.Error}: {error}</div>)}
            {!!loading && (<div><Loader/></div>)}
            <table className="user-data-table">
                {fields.map(({name, caption, value, editable}) => (
                    <tr key={name}>
                        <td className="bold left">{caption}</td>
                        {name !== editedFieldName ? (
                            <td className="right">
                                <div className="field-value">{value || Captions.Unknown}</div>
                                {editable && (
                                    <div className="field-action" onClick={() => handleEditField(name, value || '')}>
                                        <Icon name={IconNames.Create}/>
                                    </div>
                                )}
                            </td>
                        ) : (
                            <td className="right">
                                <input className="field-value" type="text" value={editedFieldValue}
                                       onChange={handleEditedFieldChangeValue}/>
                                <div className="field-action" onClick={handleEditedFieldSave}>
                                    <Icon name={IconNames.Checkmark}/>
                                </div>
                                <div className="field-action" onClick={handleEditedFieldCancel}>
                                    <Icon name={IconNames.Close}/>
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
            </table>
            <form method={'POST'}
                  action={`${REACT_APP_GATEWAY_URL}${ApiEndpoint.AccountsLogout}?redirect-location=${encodeURIComponent(REACT_APP_POST_LOGOUT_REDIRECT_URL)}`}>
                <input type={'submit'} value={'Выйти'}/>
            </form>
        </div>
    );
};
