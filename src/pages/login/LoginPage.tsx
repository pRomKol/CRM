import { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { signIn } from "../../api/auth.api.ts";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../featers/AuthContext.tsx";
import { LoginField } from "../../types/fields.ts";

export const LoginPage = () => {
    const [error, setError] = useState<string | null>(null);
    const { setLoggedIn } = useAuth();
    const navigate = useNavigate();

    const onFinish: FormProps<LoginField>['onFinish'] = async (values) => {
        try {
            await signIn({ login: values.login, password: values.password });
            setLoggedIn(true);
            navigate('/profile');
        } catch (error: any) {
            console.log(error);
            if (error.response?.status === 401) {
                setLoggedIn(false);
                setError('Неверный логин или пароль');
            } else {
                setError(error.response?.data || 'ошибка при входе');
            }
        }
    };

    return (
        <>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Login"
                    name="login"
                    rules={[{ required: true, message: 'Please input your login!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Link to='/signUp'>
                        Registration
                    </Link>
                </Form.Item>
            </Form>
        </>
    );
};
