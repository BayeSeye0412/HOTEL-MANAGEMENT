'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import AuthGuard from '../../components/AuthGuard';

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  font-family: 'Segoe UI', sans-serif;
`;

const Header = styled.header`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  color: #2c3e50;
  font-weight: 500;
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

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const WelcomeText = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 1rem;
  font-weight: 500;
`;

const QuickActions = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ActionsTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

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

  return (
    <AuthGuard>
      <Container>
        <Header>
          <Logo>🏨 Gestion Hôtel</Logo>
          <UserInfo>
            <UserName>Bonjour, {user?.username || 'Utilisateur'}</UserName>
            <LogoutButton onClick={handleLogout}>
              Déconnexion
            </LogoutButton>
          </UserInfo>
        </Header>

        <MainContent>
          <WelcomeCard>
            <WelcomeTitle>Bienvenue dans votre tableau de bord</WelcomeTitle>
            <WelcomeText>
              Gérez vos hôtels, vos clients et vos réservations depuis cette interface centralisée.
            </WelcomeText>
          </WelcomeCard>

          <StatsGrid>
            <StatCard>
              <StatNumber>12</StatNumber>
              <StatLabel>Hôtels</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>156</StatNumber>
              <StatLabel>Clients</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>89</StatNumber>
              <StatLabel>Réservations</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>€24,500</StatNumber>
              <StatLabel>Revenus du mois</StatLabel>
            </StatCard>
          </StatsGrid>

          <QuickActions>
            <ActionsTitle>Actions rapides</ActionsTitle>
            <ActionsGrid>
              <ActionButton>Ajouter un hôtel</ActionButton>
              <ActionButton>Nouvelle réservation</ActionButton>
              <ActionButton>Gérer les clients</ActionButton>
              <ActionButton>Voir les rapports</ActionButton>
            </ActionsGrid>
          </QuickActions>
        </MainContent>
      </Container>
    </AuthGuard>
  );
} 