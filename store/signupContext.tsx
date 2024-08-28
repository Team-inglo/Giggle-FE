import React, { useState } from 'react';

interface SignupContextType {
  topik: number;
  societyUniteProgram: number;
  sejong: number;
  university: string;
  degree: number;
  address: string;
  updateSignupData: (data: Partial<SignupContextType>) => void;
}

const initialSignupData: SignupContextType = {
  topik: 0,
  societyUniteProgram: 0,
  sejong: 0,
  university: '',
  degree: 0,
  address: '',
  updateSignupData: () => {},
};

export const SignupContext = React.createContext<SignupContextType>(initialSignupData);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [signupData, setSignupData] = useState<SignupContextType>(initialSignupData);

  const updateSignupData = (newData: Partial<SignupContextType>) => {
    setSignupData(prevData => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <SignupContext.Provider value={{ ...signupData, updateSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};