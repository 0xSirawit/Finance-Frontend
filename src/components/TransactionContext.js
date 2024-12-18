import React, { createContext, useState } from "react";

export const TransactionContext = createContext(null);

export default function TransactionContextProvider({ children }) {
    const [transactionData, setTransactionData] = useState([]);
    return (
        <TransactionContext.Provider value={{ transactionData, setTransactionData }}>
            {children}
        </TransactionContext.Provider>
    );
}
