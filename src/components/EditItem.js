import React, { useEffect } from "react";
import { Form, Select, Input, InputNumber } from "antd";
import { Modal } from "antd";

export default function EditItem(props) {
    const [form] = Form.useForm();
    useEffect(() => {
        if (props.isOpen) {
            form.setFieldsValue(props.item);
            console.log(props.item);
            props.updateIsOpen(true);
        }
    }, [props.isOpen, props.item, form]);

    const handleOk = () => {
        form.validateFields().then((formData) => {
            props.onItemEdited(formData);
            props.updateIsOpen(false);
        });
        props.updateIsOpen(false);
    };

    const handleCancel = () => {
        props.updateIsOpen(false);
    };

    return (
        <>
            <Modal
                title="Edit Transaction"
                open={props.isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Edit"
            >
                <Form layout="block" onFinish={props.onItemAdded} form={form}>
                    <Form.Item
                        name="type"
                        label="ชนิด"
                        rules={[{ required: true }]}
                    >
                        <Select
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
                    {props.item?.category && (
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
                </Form>
            </Modal>
        </>
    );
}
