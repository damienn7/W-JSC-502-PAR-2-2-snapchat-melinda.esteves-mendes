import React, {createContext} from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [test,setTest] = useState('Test');
    return (
        <AuthContext.Provider value={{test}}>
            {children}
        </AuthContext.Provider>
    );
}