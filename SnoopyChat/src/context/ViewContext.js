import React, {createContext} from "react";

export const ViewContext = createContext();

const ViewProvider = ({children}) => {
    const [test,setTest] = useState('Test');
    return (
        <ViewContext.Provider value={{test}}>
            {children}
        </ViewContext.Provider>
    );
}