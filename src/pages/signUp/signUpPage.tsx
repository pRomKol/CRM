import {useState} from 'react';
import {Button, Form, Input, Spin} from 'antd';
import {signUp} from "../../api/auth.api.ts";
import {Link} from "react-router-dom";


const validateMessages = {
    required: '${label} обязательно!',
    types: {
        email: '${label} не является допустимым адресом электронной почты!',
    },
    string: {
        len: '${label} должно быть от ${min} до ${max} символов',
        range: '${label} должно быть от ${min} до ${max} символов',
    },
    pattern: {
        mismatch: '${label} недопустимо!',
    },
};

type ValuesType = {
    email: string;
    login: string;
    password: string;
    phone: string;
    username: string;
    confirmPassword: string;
}

export const SignUpPage = () => {
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>()
    const onFinish = async (values: ValuesType) => {
        const formData = {
            email: values.email,
            login: values.login,
            password: values.password,
            phoneNumber: values.phone,
            username: values.username,
        };

        setLoading(true);
        try {
            await signUp(formData);
            setSuccessMessage("Пользователь зарегистрирован упешно, Для входа нажмине sign in")
            setError(null)
        } catch (error: any) {
            setError(error.response.data);

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Spin spinning={loading}>

                <Form
                    name="registration-form"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name="username"
                        label="Имя пользователя"
                        rules={[
                            { required: true },
                            { min: 1, max: 60, message: 'Должно быть от 1 до 60 символов' },
                            { pattern: /^[a-zA-Zа-яА-Я]+$/, message: 'Должно содержать только буквы' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="login"
                        label="Логин"
                        rules={[
                            { required: true },
                            { min: 2, max: 60, message: 'Должно быть от 2 до 60 символов' },
                            { pattern: /^[a-zA-Z]+$/, message: 'Должно содержать только латинские буквы' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            { required: true },
                            { min: 6, max: 60, message: 'Должно быть от 6 до 60 символов' },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Повторите пароль"
                        dependencies={['password']}
                        rules={[
                            { required: true },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают!'));
                                },
                            }),
                        ]}

                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Почтовый адрес"
                        rules={[
                            { required: true, type: 'email' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            { required: true, pattern: /^\+?[0-9]{10,15}$/, message: 'Должен быть допустимым номером телефона' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item style={{display:'flex', gap: '3px'}} label={null}>
                        <Button type="primary" htmlType="submit">
                            Registration
                        </Button>
                        {successMessage & <Link style={{fontSize: '60px'}} to='/login'>
                            Sign in
                        </Link> }
                    </Form.Item>
                </Form>
                {error & <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
                {successMessage & <div style={{color: 'green'}}>{successMessage}</div>}
            </Spin>
        </>
    );
};