import { Table, Button, Tag, Flex } from "antd";
import dayjs from "dayjs";

export default function TransactionList(props) {
  const columns = [
    {
      title: "Date-Time",
      dataIndex: "action_datetime",
      key: "action_datetime",
      render: (_, record) =>
        dayjs(record.action_datetime).format("DD/MM/YYYY - HH:mm"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        let color = type === "income" ? "green" : "red";
        return (
          <Tag color={color} key={type}>
            {type}
          </Tag>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Action",
      key: "action",
      width: '18%',
      render: (_, record) => (
        <Flex wrap gap="small">
          <Button color="primary" variant="outlined" onClick={()=> props.onTransactionEdit(record)}>Edit</Button>
          <Button danger onClick={() => props.onTransactionDelete(record.id)}>
            Delete
          </Button>
        </Flex>
      ),
    },
  ];
  return (
    <Table
      rowKey={(record) => record.id}
      bordered={true}
      pagination={{ pageSize: 5 }}
      dataSource={props.data}
      columns={columns}
    />
  );
}
