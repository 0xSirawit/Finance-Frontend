import { useOutletContext } from "react-router-dom";
import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
const URL_UPDATEPROFILE = "/api/users/";

function Profile() {
    const { userInfo, setUserInfo } = useOutletContext();
    const [change, setChange] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const handleFinish = async (userData) => {
        try {
            setIsLoading(true);
            const response = await axios.put(`${URL_UPDATEPROFILE}${userInfo.id}`, userData);
            setUserInfo({ ...userInfo, ...response.data });
            setChange(false);
            message.success("Profile updated successfully!");
        } catch (err) {
            setIsLoading(false);
            message.error(err.response?.data?.error?.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };
    const handleValuesChange = (_, allValues) => {
        setChange(
            userInfo.username !== allValues.username ||
                userInfo.email !== allValues.email ||
                userInfo.first_name !== allValues.first_name ||
                userInfo.last_name !== allValues.last_name
        );
    };
    useEffect(() => {
        form.setFieldsValue(userInfo);
    }, [form, userInfo]);
    return (
        <Spin spinning={isLoading}>
            <Form
                onFinish={handleFinish}
                form={form}
                layout="vertical"
                onValuesChange={handleValuesChange}
                requiredMark={false}
                style={{
                    maxWidth: 500,
                }}
            >
                <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                    <Input placeholder="username" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                    <Input placeholder="email" />
                </Form.Item>
                <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
                    <Input placeholder="first name" />
                </Form.Item>
                <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
                    <Input placeholder="last name" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={!change}>
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
}
export default Profile;
