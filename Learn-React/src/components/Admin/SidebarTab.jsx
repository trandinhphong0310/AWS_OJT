import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaChartBar, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SidebarTab() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
            <Sidebar
                collapsed={collapsed}
                className="bg-white shadow-xl border-r border-gray-200 transition-all duration-300"
            >
                <div className="flex p-4 text-center border-b border-gray-200 justify-around">
                    <Link to='/admins'>
                        <h2 className="text-xl font-bold text-blue-600 tracking-wide">
                            {collapsed ? '' : 'My Dashboard'}
                        </h2>
                    </Link>
                    <div
                        onClick={() => setCollapsed(!collapsed)}
                        className="mt-2 font-medium text-center text-blue-700"
                    >
                        <FaBars />
                    </div>
                </div>

                <Menu
                    menuItemStyles={{
                        button: {
                            '&:hover': {
                                backgroundColor: '#e0f2fe',
                                color: '#0369a1',
                            },
                            padding: '10px 16px',
                            borderRadius: '8px',
                            margin: '4px 8px',
                        },
                    }}
                >
                    <SubMenu label="Features" icon={<FaChartBar />}>
                        <MenuItem component={<Link to='/admins/manage-users'/>}>
                            Quản lý users
                        </MenuItem>
                        <MenuItem>
                            Quản lý bài Quiz
                        </MenuItem>
                        <MenuItem>
                            Quản lý câu hỏi
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
    );
}
