import { useContext } from 'react';
import APIContext from '../contexts/APIContext';

export const useAPI = () => useContext(APIContext);