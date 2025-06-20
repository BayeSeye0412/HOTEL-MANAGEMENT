'use client'
import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faHotel, 
  faSearch, 
  faBell, 
  faSignOutAlt, 
  faUser,
  faSun,
  faMoon,
  faDesktop,
  faCog,
  faChevronDown,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../contexts/ThemeContext';

// Contexte pour la recherche globale
const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [globalSearch, setGlobalSearch] = useState('');

  const value = {
    globalSearch,
    setGlobalSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--bg-secondary);
  font-family: 'Inter', sans-serif;
  transition: background-color var(--transition-normal);
`;

const Sidebar = styled.aside`
  width: 280px;
  background: var(--bg-primary);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 1000;
  transition: background-color var(--transition-normal), box-shadow var(--transition-normal);
`;

const SidebarHeader = styled.div`
  padding: var(--spacing-2xl) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
`;

const Logo = styled.h1`
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: color var(--transition-normal);
`;

const SidebarMenu = styled.nav`
  flex: 1;
  padding: var(--spacing-lg) 0;
  overflow-y: auto;
`;

const MenuItem = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-secondary)'};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '500'};
  background: ${props => props.active ? 'var(--primary-light)' : 'transparent'};
  border-right: ${props => props.active ? '3px solid var(--primary-color)' : 'none'};
  transition: all var(--transition-normal);

  &:hover {
    background: ${props => props.active ? 'var(--primary-light)' : 'var(--bg-secondary)'};
    color: var(--primary-color);
  }
`;

const MenuIcon = styled(FontAwesomeIcon)`
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
`;

const SidebarFooter = styled.div`
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  cursor: pointer;
  transition: transform var(--transition-normal);

  &:hover {
    transform: scale(1.05);
  }
`;

const StatusIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: var(--success-color);
  border: 2px solid var(--bg-primary);
  border-radius: 50%;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9rem;
  transition: color var(--transition-normal);
`;

const UserStatus = styled.div`
  color: var(--success-color);
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.header`
  background: var(--bg-primary);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color var(--transition-normal), box-shadow var(--transition-normal);
`;

const PageTitle = styled.h2`
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  transition: color var(--transition-normal);
`;

const NavbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 300px;
`;

const SearchInput = styled.input`
  padding: var(--spacing-sm) var(--spacing-lg);
  padding-left: 2.5rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: 0.9rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  width: 100%;
  transition: all var(--transition-normal);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px var(--primary-light);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: var(--spacing-md);
  color: var(--text-muted);
  font-size: 0.9rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.1rem;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: 50%;
  transition: all var(--transition-normal);
  position: relative;

  &:hover {
    background: var(--bg-secondary);
    color: var(--primary-color);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: var(--error-color);
  color: white;
  font-size: 0.7rem;
  padding: 0.1rem 0.3rem;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`;

const ThemeToggle = styled.div`
  position: relative;
  display: inline-block;
`;

const ThemeButton = styled(ActionButton)`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
`;

const ThemeDropdown = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-sm);
  min-width: 150px;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all var(--transition-normal);
`;

const ThemeOption = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-normal);

  &:hover {
    background: var(--bg-secondary);
  }

  &.active {
    background: var(--primary-light);
    color: var(--primary-color);
  }
`;

const ProfileSection = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-normal);

  &:hover {
    background: var(--bg-secondary);
  }
`;

const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileStatus = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: var(--success-color);
  border: 2px solid var(--bg-primary);
  border-radius: 50%;
`;

const ProfileDropdown = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-sm);
  min-width: 200px;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all var(--transition-normal);
`;

const ProfileOption = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-normal);
  font-size: 0.9rem;

  &:hover {
    background: var(--bg-secondary);
  }

  &.logout {
    color: var(--error-color);
    
    &:hover {
      background: var(--error-light);
    }
  }
`;

const LogoutButton = styled(ActionButton)`
  color: var(--error-color);
  
  &:hover {
    background: var(--error-light);
    color: var(--error-color);
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: var(--spacing-xl);
`;

export default function AdminLayout({ children, pageTitle }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme, isDark, isLight, isSystem } = useTheme();
  const { globalSearch, setGlobalSearch } = useSearch();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('rememberMe');
    router.push('/auth/login');
  };

  const handleSearch = (e) => {
    setGlobalSearch(e.target.value);
  };

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: faChartLine },
    { href: '/admin/hotels', label: 'Liste des hôtels', icon: faHotel },
  ];

  const getThemeIcon = () => {
    if (isDark) return faMoon;
    if (isLight) return faSun;
    return faDesktop;
  };

  const getThemeLabel = () => {
    if (isDark) return 'Sombre';
    if (isLight) return 'Clair';
    return 'Système';
  };

  return (
    <LayoutContainer>
      <Sidebar>
        <SidebarHeader>
          <Logo>
            <FontAwesomeIcon icon={faHotel} />
            GESTION HÔTELS
          </Logo>
        </SidebarHeader>

        <SidebarMenu>
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              active={pathname === item.href}
            >
              <MenuIcon icon={item.icon} />
              {item.label}
            </MenuItem>
          ))}
        </SidebarMenu>

        <SidebarFooter>
          <UserInfo>
            <UserAvatar onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
              {user?.username?.charAt(0).toUpperCase() || 'U'}
              <StatusIndicator />
            </UserAvatar>
            <UserDetails>
              <UserName>{user?.username || 'Utilisateur'}</UserName>
              <UserStatus>
                ● En ligne
              </UserStatus>
            </UserDetails>
          </UserInfo>
        </SidebarFooter>
      </Sidebar>

      <MainContent>
        <Navbar>
          <PageTitle>{pageTitle}</PageTitle>
          <NavbarActions>
            <SearchContainer>
              <SearchIcon icon={faSearch} />
              <SearchInput
                type="text"
                placeholder="Rechercher dans l'application..."
                value={globalSearch}
                onChange={handleSearch}
              />
            </SearchContainer>
            
            <ActionButton>
              <FontAwesomeIcon icon={faBell} />
              {notifications > 0 && (
                <NotificationBadge>{notifications}</NotificationBadge>
              )}
            </ActionButton>
            
            <ThemeToggle>
              <ThemeButton onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
                <FontAwesomeIcon icon={getThemeIcon()} />
                {getThemeLabel()}
                <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '0.8rem' }} />
              </ThemeButton>
              <ThemeDropdown isOpen={showThemeDropdown}>
                <ThemeOption 
                  className={isLight ? 'active' : ''}
                  onClick={() => {
                    toggleTheme('light');
                    setShowThemeDropdown(false);
                  }}
                >
                  <FontAwesomeIcon icon={faSun} />
                  Clair
                </ThemeOption>
                <ThemeOption 
                  className={isDark ? 'active' : ''}
                  onClick={() => {
                    toggleTheme('dark');
                    setShowThemeDropdown(false);
                  }}
                >
                  <FontAwesomeIcon icon={faMoon} />
                  Sombre
                </ThemeOption>
                <ThemeOption 
                  className={isSystem ? 'active' : ''}
                  onClick={() => {
                    toggleTheme('system');
                    setShowThemeDropdown(false);
                  }}
                >
                  <FontAwesomeIcon icon={faDesktop} />
                  Système
                </ThemeOption>
              </ThemeDropdown>
            </ThemeToggle>
            
            <ProfileSection>
              <ProfileButton onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                <ProfileAvatar>
                  {user?.profileImage ? (
                    <img src={user.profileImage} alt={user.username} />
                  ) : (
                    user?.username?.charAt(0).toUpperCase() || 'U'
                  )}
                  <ProfileStatus />
                </ProfileAvatar>
              </ProfileButton>
              
              <ProfileDropdown isOpen={showProfileDropdown}>
                <ProfileOption onClick={() => {
                  // TODO: Ouvrir modal de modification du profil
                  setShowProfileDropdown(false);
                }}>
                  <FontAwesomeIcon icon={faUser} />
                  Modifier le profil
                </ProfileOption>
                <ProfileOption onClick={() => {
                  // TODO: Ouvrir paramètres
                  setShowProfileDropdown(false);
                }}>
                  <FontAwesomeIcon icon={faCog} />
                  Paramètres
                </ProfileOption>
                <ProfileOption 
                  className="logout"
                  onClick={() => {
                    handleLogout();
                    setShowProfileDropdown(false);
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Déconnexion
                </ProfileOption>
              </ProfileDropdown>
            </ProfileSection>
          </NavbarActions>
        </Navbar>

        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
} 