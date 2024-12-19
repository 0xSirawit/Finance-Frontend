import { useOutletContext } from "react-router-dom";
import { Button, Form, Input, Col, Row, Spin, message } from "antd";
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
            console.log(userData);
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
            <Form onFinish={handleFinish} form={form} onValuesChange={handleValuesChange} requiredMark={false}>
                <Col>
                    <Row>
                        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                            <Input placeholder="username" />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                            <Input placeholder="email" />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
                            <Input placeholder="first name" />
                        </Form.Item>
                        <Form.Item
                            name="last_name"
                            label="Last Name"
                            rules={[{ required: true }]}
                            style={{ marginLeft: 12 }}
                        >
                            <Input placeholder="last name" />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={!change}>
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Row>
                </Col>
            </Form>
        </Spin>
    );
}
export default Profile;
