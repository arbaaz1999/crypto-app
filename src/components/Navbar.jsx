import React, { useState, useEffect } from 'react';
import { Avatar, Button, Typography, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, FundOutlined, BulbOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png'

const Navbar = () => {
    const [isActive, setIsActive] = useState(true);
    const [screenSize, setScreenSize] = useState(null)

    useEffect(() => {
        const handleSize = () => setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleSize);

        handleSize();

        return () => window.removeEventListener('resize', handleSize)
    }, [])

    useEffect(() => {
        if (screenSize < 768) {
            setIsActive(false)
        } else {
            setIsActive(true)
        }
    }, [screenSize])
    return (
        <>
            <div className="nav-container">
                <div className="logo-container">
                    <Avatar src={icon} size='large' />
                    <Typography.Title level={2} className='logo'>
                        <Link to='/'>Cryotiverse</Link>
                    </Typography.Title>
                    <Button className='menu-control-container' onClick={() => setIsActive(!isActive)}>
                        <MenuOutlined />
                    </Button>
                </div>
                {isActive && (
                    <Menu theme='dark'>
                        <Menu.Item icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item icon={<FundOutlined />}>
                            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                        </Menu.Item>
                        <Menu.Item icon={<BulbOutlined />}>
                            <Link to="/news">News</Link>
                        </Menu.Item>
                    </Menu>
                )}
            </div>
        </>
    );
}

export default Navbar