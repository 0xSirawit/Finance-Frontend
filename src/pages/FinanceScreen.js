import TransactionList from "../components/TransactionList";
import EditItem from "../components/EditItem";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import AddItem from "../components/AddItem";
import { Divider, Spin } from "antd";
import axios from "axios";
const URL_TXACTIONS = "/api/txactions";

function FinanceScreen() {
    const [amount, setAmount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState(null);
    const [transactionData, setTransactionData] = useState([]);

    const fetchItems = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(URL_TXACTIONS);
            setTransactionData(
                response.data.data.map((data) => ({
                    id: data.id,
                    ...data.attributes,
                }))
            );
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        setAmount(
            transactionData.reduce(
                (sum, transaction) =>
                    transaction.type === "income"
                        ? (sum += transaction.amount)
                        : (sum -= transaction.amount),
                0
            )
        );
    }, [transactionData]);

    const handleNoteChaged = (id, note) => {
        setTransactionData(
            transactionData.map((transaction) => {
                transaction.note =
                    transaction.id === id ? note : transaction.note;
                return transaction;
            })
        );
    };

    const handleTransactionDelete = async (id) => {
        try {
            setIsLoading(true);
            await axios.delete(`${URL_TXACTIONS}/${id}`);
            fetchItems();
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTransactionEdit = (data) => {
        setItem(data);
        setIsOpen(true);
    };
    const handleUpdateOpen = (data) => {
        setIsOpen(data);
    };
    const updateItem = async (itemData) => {
        try {
            await axios.put(`${URL_TXACTIONS}/${item.id}`, {
                data: itemData,
            });
            const updatedTransactionData = transactionData.map((record) =>
                record.id === item.id
                    ? {
                          ...record,
                          amount: itemData.amount,
                          type: itemData.type,
                          note: itemData.note,
                      }
                    : record
            );
            setTransactionData(updatedTransactionData);
            setItem(null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddItem = async (itemData) => {
        try {
            setIsLoading(true);
            const params = {
                ...itemData,
                action_datetime: dayjs(),
            };
            const response = await axios.post(URL_TXACTIONS, { data: params });
            const { id, attributes } = response.data.data;
            setTransactionData([
                ...transactionData,
                {
                    id: id,
                    key: id,
                    ...attributes,
                },
            ]);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Spin spinning={isLoading}>
                <h1>Current Amount {amount} THB</h1>
                <AddItem onItemAdded={handleAddItem} />
                <EditItem
                    isOpen={isOpen}
                    updateIsOpen={handleUpdateOpen}
                    item={item}
                    onItemEdited={updateItem}
                />
                <Divider plain>
                    <h3>Transactions</h3>
                </Divider>
                <TransactionList
                    data={transactionData}
                    onNoteChanged={handleNoteChaged}
                    onTransactionDelete={handleTransactionDelete}
                    onTransactionEdit={handleTransactionEdit}
                />
            </Spin>
        </>
    );
}

export default FinanceScreen;
