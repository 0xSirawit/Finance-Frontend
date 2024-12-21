import { useState } from "react";
import { Button, Form, Input, Alert, Checkbox } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
const URL_AUTH = "/api/auth/local";

export default function LoginScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const navigate = useNavigate();

    async function handleLogin(formData) {
        try {
            setIsLoading(true);
            setErrMsg(null);
            delete axios.defaults.headers.common["Authorization"];
            const response = await axios.post(URL_AUTH, formData);
            const token = response.data.jwt;
            Cookies.set("token", token, {
                expires: formData.remember ? 30 : null,
                path: "/",
            });
            navigate("/", { replace: true });
        } catch (err) {
            setErrMsg(err.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div
            style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                background: "linear-gradient(90deg, #001628,#1c64a3)",
                color: "white",
                height: "100vh",
                width: "100vw",
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: 24,
                    borderRadius: 10,
                    justifyItems: "center",
                    color: "Black",
                    fontSize: "24px",
                }}
            >
                <h1>Login</h1>
                <Form onFinish={handleLogin} autoComplete="off" style={{ width: "25vw" }}>
                    {errMsg && (
                        <Form.Item>
                            <Alert message={errMsg} type="error" />
                        </Form.Item>
                    )}
                    <Form.Item name="identifier" rules={[{ required: true }]}>
                        <Input placeholder="Username" prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true }]}>
                        <Input.Password placeholder="Password" prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" label={null}>
                        <Checkbox style={{ userSelect: "none" }}>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{ width: "100%", height: "6vh" }}
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            LOGIN
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
