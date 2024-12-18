import { Button, Form, Select, Input, InputNumber } from "antd";
import { useState } from "react";
export default function AddItem(props) {
    const [type, setType] = useState();
    const handleSelect = (typeValue) => {
        setType(typeValue);
    };

    return (
        <Form layout="inline" onFinish={props.onItemAdded}>
            <Form.Item name="type" label="ชนิด" rules={[{ required: true }]}>
                <Select
                    onSelect={handleSelect}
                    allowClear
                    style={{ width: "100px" }}
                    options={[
                        {
                            value: "income",
                            label: "รายรับ",
                        },
                        {
                            value: "expense",
                            label: "รายจ่าย",
                        },
                    ]}
                />
            </Form.Item>
            {type === "expense" && (
                <Form.Item
                    name="category"
                    label="ประเภท"
                    rules={[{ required: true }]}
                >
                    <Select
                        allowClear
                        style={{ width: "100px" }}
                        options={[
                            {
                                value: "food",
                                label: "อาหาร",
                            },
                            {
                                value: "shopping",
                                label: "ช้อปปิ้ง",
                            },
                            {
                                value: "travel",
                                label: "เที่ยว",
                            },
                            {
                                value: "entertainment",
                                label: "บังเทิง",
                            },
                            {
                                value: "etc",
                                label: "อิ่นๆ",
                            },
                        ]}
                    />
                </Form.Item>
            )}

            <Form.Item
                name="amount"
                label="จํานวนเงิน"
                rules={[{ required: true }]}
            >
                <InputNumber placeholder="จํานวนเงิน" min={0} />
            </Form.Item>
            <Form.Item
                name="note"
                label="หมายเหตุ"
                rules={[{ required: true }]}
            >
                <Input placeholder="Note" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
}
