'use client'
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
  font-family: 'Segoe UI', sans-serif;
`;

const Sidebar = styled.aside`
  width: 280px;
  background: white;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 1000;
`;

const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #e1e8ed;
`;

const Logo = styled.h1`
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SidebarMenu = styled.nav`
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: ${props => props.active ? '#667eea' : '#7f8c8d'};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '500'};
  background: ${props => props.active ? '#f0f4ff' : 'transparent'};
  border-right: ${props => props.active ? '3px solid #667eea' : 'none'};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#f0f4ff' : '#f8f9fa'};
    color: #667eea;
  }
`;

const MenuIcon = styled.span`
  font-size: 1.2rem;
  width: 20px;
  text-align: center;
`;

const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e1e8ed;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.9rem;
`;

const UserStatus = styled.div`
  color: #27ae60;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #27ae60;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.header`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const PageTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const NavbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  color: #7f8c8d;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: #f8f9fa;
    color: #667eea;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: #e74c3c;
  color: white;
  font-size: 0.7rem;
  padding: 0.1rem 0.3rem;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

const ProfileAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const LogoutButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background: #c0392b;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
`;

export default function AdminLayout({ children, pageTitle }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(3); // Exemple
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/hotels', label: 'Liste des hôtels', icon: '🏨' },
  ];

  return (
    <LayoutContainer>
      <Sidebar>
        <SidebarHeader>
          <Logo>
            🏨 Gestion Hôtel
          </Logo>
        </SidebarHeader>

        <SidebarMenu>
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              active={pathname === item.href}
            >
              <MenuIcon>{item.icon}</MenuIcon>
              {item.label}
            </MenuItem>
          ))}
        </SidebarMenu>

        <SidebarFooter>
          <UserInfo>
            <UserAvatar>
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </UserAvatar>
            <UserDetails>
              <UserName>{user?.username || 'Utilisateur'}</UserName>
              <UserStatus>
                <StatusDot />
                En ligne
              </UserStatus>
            </UserDetails>
          </UserInfo>
        </SidebarFooter>
      </Sidebar>

      <MainContent>
        <Navbar>
          <PageTitle>{pageTitle}</PageTitle>
          <NavbarActions>
            <NotificationButton>
              🔔
              {notifications > 0 && (
                <NotificationBadge>{notifications}</NotificationBadge>
              )}
            </NotificationButton>
            
            <ProfileButton>
              <ProfileAvatar>
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </ProfileAvatar>
            </ProfileButton>
            
            <LogoutButton onClick={handleLogout}>
              Déconnexion
            </LogoutButton>
          </NavbarActions>
        </Navbar>

        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
} 