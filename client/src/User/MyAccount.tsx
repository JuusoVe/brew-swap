import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { Redirect } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import LoginForm from './LoginForm';



const MyAccount: React.FC = () => {

  const loggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    loggedIn ?
    <AccountMenu />
    :
    <Redirect to="/login" />
  );


};

export default MyAccount;