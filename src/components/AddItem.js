import { Button, Form, Select, Input, InputNumber } from "antd";
import { useState } from "react";
export default function AddItem(props) {
    const [form] = Form.useForm();
    const [type, setType] = useState();
    const handleSelect = (typeValue) => {
        form.setFieldsValue({ category: null });
        setType(typeValue);
    };
    const handleClear = () => {
        form.setFieldsValue({ category: null });
        setType(null);
    };
    const optionsCategory = {
        expense: [
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
        ],
        income: [
            {
                value: "salary",
                label: "เงินดือน",
            },
            {
                value: "genaral",
                label: "ทั่วไป",
            },
        ],
    };

    return (
        <Form layout="inline" onFinish={props.onItemAdded} form={form} requiredMark={false}>
            <Form.Item name="type" label="ชนิด" rules={[{ required: true }]}>
                <Select
                    onSelect={handleSelect}
                    onClear={handleClear}
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
            <Form.Item name="category" label="ประเภท" rules={[{ required: true }]}>
                <Select allowClear style={{ width: "100px" }} options={type ? optionsCategory[type] : []} />
            </Form.Item>

            <Form.Item name="amount" label="จํานวนเงิน" rules={[{ required: true }]}>
                <InputNumber placeholder="จํานวนเงิน" min={0} />
            </Form.Item>
            <Form.Item name="note" label="หมายเหตุ" rules={[{ required: true }]}>
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
