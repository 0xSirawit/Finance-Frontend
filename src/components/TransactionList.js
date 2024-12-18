import { Table, Button, Tag, Flex } from "antd";
import dayjs from "dayjs";

export default function TransactionList(props) {
    const columns = [
        {
            title: "Date-Time",
            width: "20%",
            dataIndex: "action_datetime",
            key: "action_datetime",
            sorter: (a, b) => dayjs(a.action_datetime).unix() - dayjs(b.action_datetime).unix(),
            defaultSortOrder: "descend",
            render: (_, record) => dayjs(record.action_datetime).format("DD/MM/YYYY - HH:mm"),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            width: "10%",
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
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: "10%",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            width: "20%",
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
            width: "22%",
        },
        {
            title: "Action",
            key: "action",
            width: "18%",
            render: (_, record) => (
                <Flex wrap gap="small">
                    <Button color="primary" variant="outlined" onClick={() => props.onTransactionEdit(record)}>
                        Edit
                    </Button>
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
