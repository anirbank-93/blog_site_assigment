import { createContext, useState } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({
    username: '',
    name: '',
    user_id: 0,
  });

  return (
    <DataContext.Provider value={{ account, setAccount }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
