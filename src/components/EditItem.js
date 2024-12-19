import React, { useEffect, useState } from "react";
import { Form, Select, Input, InputNumber } from "antd";
import { Modal } from "antd";

export default function EditItem(props) {
    const [form] = Form.useForm();
    const [type, setType] = useState("");

    useEffect(() => {
        if (props.isOpen) {
            setType(props.item.type);
            form.setFieldsValue(props.item);
            console.log(props.item);
            props.updateIsOpen(true);
        }
    }, [props.isOpen, props.item, form]);

    const handleOk = () => {
        form.validateFields()
            .then((formData) => {
                props.onItemEdited(formData);
                props.updateIsOpen(false);
            })
            .catch((errorInfo) => {
                console.error("Validation failed:", errorInfo);
            });
    };
    const handleClear = () => {
        form.setFieldsValue({ category: null });
        setType(null);
    };
    const handleCancle = () => {
        props.updateIsOpen(false);
    };
    const handleSelect = (typeValue) => {
        setType(typeValue);
        form.setFieldsValue({ category: null });
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
        <Modal title="Edit Transaction" open={props.isOpen} onOk={handleOk} onCancel={handleCancle} okText="Edit">
            <Form layout="block" onFinish={props.onItemAdded} form={form} requiredMark={false}>
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
            </Form>
        </Modal>
    );
}
