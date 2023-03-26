import { useContext } from 'react';
import APIContext from '../contexts/TestAPIContext';

export const useAPI = () => useContext(APIContext);