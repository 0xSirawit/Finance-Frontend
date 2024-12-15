import { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const URL_AUTH = "/api/auth/local";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  async function handleLogin(formData) {
    try {
      setIsLoading(true);
      setErrMsg(null);
      const response = await axios.post(URL_AUTH, formData);
      const token = response.data.jwt;
      document.cookie = `token = ${token}; path=/`;
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form onFinish={handleLogin} autoComplete="off">
      {errMsg && (
        <Form.Item>
          <Alert message={errMsg} type="error" />
        </Form.Item>
      )}
      <Form.Item
        label="Username"
        name="identifier"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
