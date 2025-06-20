'use client'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../../components/AdminLayout';
import AuthGuard from '../../../components/AuthGuard';

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
  border-left: 4px solid ${props => props.color || '#667eea'};
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatTitle = styled.h3`
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
`;

const StatIcon = styled.div`
  font-size: 1.5rem;
  opacity: 0.7;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  font-size: 0.9rem;
  color: ${props => props.positive ? '#27ae60' : '#e74c3c'};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const RecentActivity = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ActivityTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || '#667eea'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  color: #7f8c8d;
  font-size: 0.8rem;
`;

const QuickActions = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

const EmptyChart = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7f8c8d;
  font-style: italic;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #e1e8ed;
`;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalHotels: 12,
    totalReservations: 156,
    totalRevenue: 24500,
    occupancyRate: 78
  });

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'hotel',
      text: 'Nouvel hôtel "Le Palace" ajouté',
      time: 'Il y a 2 heures',
      color: '#667eea'
    },
    {
      id: 2,
      type: 'reservation',
      text: 'Réservation confirmée pour Hôtel Central',
      time: 'Il y a 4 heures',
      color: '#27ae60'
    },
    {
      id: 3,
      type: 'client',
      text: 'Nouveau client enregistré',
      time: 'Il y a 6 heures',
      color: '#f39c12'
    },
    {
      id: 4,
      type: 'payment',
      text: 'Paiement reçu - Hôtel Luxe',
      time: 'Il y a 8 heures',
      color: '#e74c3c'
    }
  ]);

  const getActivityIcon = (type) => {
    const icons = {
      hotel: '🏨',
      reservation: '📅',
      client: '👤',
      payment: '💰'
    };
    return icons[type] || '📋';
  };

  return (
    <AuthGuard>
      <AdminLayout pageTitle="Dashboard">
        <StatsGrid>
          <StatCard color="#667eea">
            <StatHeader>
              <StatTitle>Total Hôtels</StatTitle>
              <StatIcon>🏨</StatIcon>
            </StatHeader>
            <StatValue>{stats.totalHotels}</StatValue>
            <StatChange positive>
              ↗ +2 ce mois
            </StatChange>
          </StatCard>

          <StatCard color="#27ae60">
            <StatHeader>
              <StatTitle>Réservations</StatTitle>
              <StatIcon>📅</StatIcon>
            </StatHeader>
            <StatValue>{stats.totalReservations}</StatValue>
            <StatChange positive>
              ↗ +12 cette semaine
            </StatChange>
          </StatCard>

          <StatCard color="#f39c12">
            <StatHeader>
              <StatTitle>Revenus</StatTitle>
              <StatIcon>💰</StatIcon>
            </StatHeader>
            <StatValue>€{stats.totalRevenue.toLocaleString()}</StatValue>
            <StatChange positive>
              ↗ +15% ce mois
            </StatChange>
          </StatCard>

          <StatCard color="#e74c3c">
            <StatHeader>
              <StatTitle>Taux d'occupation</StatTitle>
              <StatIcon>📊</StatIcon>
            </StatHeader>
            <StatValue>{stats.occupancyRate}%</StatValue>
            <StatChange positive>
              ↗ +5% cette semaine
            </StatChange>
          </StatCard>
        </StatsGrid>

        <ChartsGrid>
          <ChartCard>
            <ChartTitle>Évolution des réservations</ChartTitle>
            <EmptyChart>
              Graphique des réservations (à implémenter)
            </EmptyChart>
          </ChartCard>

          <ChartCard>
            <ChartTitle>Répartition par devise</ChartTitle>
            <EmptyChart>
              Graphique des devises (à implémenter)
            </EmptyChart>
          </ChartCard>
        </ChartsGrid>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          <RecentActivity>
            <ActivityTitle>Activité récente</ActivityTitle>
            <ActivityList>
              {recentActivities.map((activity) => (
                <ActivityItem key={activity.id}>
                  <ActivityIcon color={activity.color}>
                    {getActivityIcon(activity.type)}
                  </ActivityIcon>
                  <ActivityContent>
                    <ActivityText>{activity.text}</ActivityText>
                    <ActivityTime>{activity.time}</ActivityTime>
                  </ActivityContent>
                </ActivityItem>
              ))}
            </ActivityList>
          </RecentActivity>

          <div>
            <ChartCard>
              <ChartTitle>Actions rapides</ChartTitle>
              <QuickActions>
                <ActionButton>
                  🏨 Ajouter un hôtel
                </ActionButton>
                <ActionButton>
                  📅 Nouvelle réservation
                </ActionButton>
                <ActionButton>
                  👤 Gérer les clients
                </ActionButton>
                <ActionButton>
                  📊 Voir les rapports
                </ActionButton>
              </QuickActions>
            </ChartCard>
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
} 