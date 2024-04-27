import { createContext, useState } from "react";

export const TransactionsPageContext = createContext({})

function TransactionsPageProvider({ children }) {

    const [listWallets, setListWallets] = useState([])
    const [selectedWallet, setSelectedWallet] = useState()
    const [listTransactions, setListTransactions] = useState([])
    const [selectedTransaction, setSelectedTransaction] = useState()
    const [dicCategories, setDicCategories] = useState()
    const [openDetail, setOpenDetail] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [addNewTransaction, setAddNewTransaction] = useState(true)
    const [centerMonth, setCenterMonth] = useState(new Date())

    const value = {
        centerMonth, setCenterMonth,
        listWallets, setListWallets,
        selectedWallet, setSelectedWallet,
        listTransactions, setListTransactions,
        selectedTransaction, setSelectedTransaction,
        dicCategories, setDicCategories,
        openDetail, setOpenDetail,
        openEditDialog, setOpenEditDialog,
        addNewTransaction, setAddNewTransaction
    }

    return (
        <TransactionsPageContext.Provider value={value}>
            {children}
        </TransactionsPageContext.Provider>
    );
}

export default TransactionsPageProvider;