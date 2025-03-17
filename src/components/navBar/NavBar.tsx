import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

export const NavBar = () => {
    const location = useLocation();
    const items = [
        {
            key: '/profile',
            label: <Link to="/profile">Profile</Link>,
        },
        {
            key: '/login',
            label: <Link to="/login">Login</Link>,
        },
        {
            key: '/',
            label: <Link to="/">Todo List</Link>,
        },
    ];

    return (
        <Menu
            theme="dark"
            selectedKeys={[location.pathname]}
            mode="vertical"
            items={items}
        />
    );
};