import TransactionList from "../components/TransactionList";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import AddItem from "../components/AddItem";
import { Divider, Typography, Spin } from "antd";
import axios from "axios";
const URL_TXACTIONS = "/api/txactions";

function FinanceScreen() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL_TXACTIONS);
      setTransactionData(
        response.data.data.map((data) => ({
          id: data.id,
          key: data.key,
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
    console.log(transactionData);
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
        transaction.note = transaction.id === id ? note : transaction.note;
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

  const handleAddItem = async (itemData) => {
    try {
      setIsLoading(true);
      console.log(itemData);
      const params = {
        ...itemData,
        action_datetime: dayjs(),
      };
      const response = await axios.post(URL_TXACTIONS, { data: params });
      const { id, attributes } = response.data.data;
      console.log(response.data.data);
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
        <Divider plain>
          <h3>Transactions</h3>
        </Divider>
        <TransactionList
          data={transactionData}
          onNoteChanged={handleNoteChaged}
          onTransactionDelete={handleTransactionDelete}
        />
      </Spin>
    </>
  );
}

export default FinanceScreen;
