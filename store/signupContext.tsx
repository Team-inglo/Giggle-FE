import React, { useState } from 'react';

interface SignupContextType {
  topik_score: string;
  social_integration_program_score: string;
  sejong_institute_score: string;
  university: string;
  degree: number;
  address: string;
  updateSignupData: (data: Partial<SignupContextType>) => void;
}

const initialSignupData: SignupContextType = {
  topik_score: "",
  social_integration_program_score: "",
  sejong_institute_score: "",
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