import { api } from '@nft/services/api';
import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useModal } from './modal.context';

interface IUser {
  name: string;
  id: string;
  address: string;
  description: string;
  profilePicture: string;
  balance: number;
}

interface IAuthProps {
  user: IUser;
  signIn: (walletAddress: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthProps);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({} as IUser);

  const { closeModal } = useModal();

  useEffect(() => {
    async function loadUser(): Promise<void> {
      const userStoraged = await AsyncStorage.getItem('@hipa:user');

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as IUser;
        setUser(userLogged);
      }
    }

    loadUser();
  }, []);

  const signIn = useCallback(async (walletAddress, walletName) => {
    const request = {
      address: walletAddress,
      name: walletName,
    };
    await api
      .post('user/authentication', request)
      .then((response) => {
        const { name, id, address, description, profilePicture, balance } = response.data.user;

        const user: IUser = {
          name,
          id,
          address,
          description,
          profilePicture,
          balance,
        };
        AsyncStorage.setItem('@hipa:user', JSON.stringify(user));

        setUser({ name, id, address, description, profilePicture, balance });
        closeModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  const signOut = useCallback(async () => {
    setUser({} as IUser);
    await AsyncStorage.removeItem('@hipa:user');
  }, []);

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
