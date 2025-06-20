'use client'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../../components/AdminLayout';
import AuthGuard from '../../../components/AuthGuard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHotel, 
  faUsers, 
  faChartLine, 
  faStar,
  faTrendingUp,
  faTrendingDown,
  faEye,
  faCalendarAlt,
  faMapMarkerAlt,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
`;

const StatCard = styled.div`
  background: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  background: ${props => {
    switch (props.variant) {
      case 'primary': return 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
      case 'success': return 'linear-gradient(135deg, var(--success-color) 0%, #2ecc71 100%)';
      case 'warning': return 'linear-gradient(135deg, var(--warning-color) 0%, #f1c40f 100%)';
      case 'info': return 'linear-gradient(135deg, var(--info-color) 0%, #3498db 100%)';
      default: return 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
    }
  }};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  transition: color var(--transition-normal);
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color var(--transition-normal);
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: var(--spacing-sm);

  &.positive {
    color: var(--success-color);
  }

  &.negative {
    color: var(--error-color);
  }

  &.neutral {
    color: var(--text-muted);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xl);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartSection = styled.div`
  background: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
`;

const SectionTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: color var(--transition-normal);
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: 500;
  border: 2px dashed var(--border-color);
`;

const RecentHotels = styled.div`
  background: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
`;

const HotelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const HotelItem = styled.div`
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--primary-color);
    box-shadow: var(--shadow-sm);
  }
`;

const HotelName = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  transition: color var(--transition-normal);
`;

const HotelDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const HotelDetail = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
`;

const ActionCard = styled.div`
  background: var(--bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
  }
`;

const ActionIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
  color: white;
  font-size: 1.5rem;
`;

const ActionTitle = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  transition: color var(--transition-normal);
`;

const ActionDescription = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: color var(--transition-normal);
`;

const NoData = styled.div`
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-muted);
  font-size: 1.1rem;
`;

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalUsers: 0,
    averageRating: 0,
    totalRevenue: 0
  });
  const [recentHotels, setRecentHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('❌ Aucun token trouvé');
        return;
      }

      // Charger les hôtels pour les statistiques
      const response = await fetch('http://localhost:5000/api/hotels', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const hotels = await response.json();
        
        // Calculer les statistiques
        const totalHotels = hotels.length;
        const totalUsers = Math.floor(Math.random() * 1000) + 500; // Simulation
        const averageRating = hotels.length > 0 
          ? (hotels.reduce((sum, hotel) => sum + (hotel.rating || 0), 0) / hotels.length).toFixed(1)
          : 0;
        const totalRevenue = hotels.reduce((sum, hotel) => sum + (hotel.pricePerNight || 0), 0);

        setStats({
          totalHotels,
          totalUsers,
          averageRating: parseFloat(averageRating),
          totalRevenue
        });

        // Prendre les 5 derniers hôtels
        setRecentHotels(hotels.slice(-5));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getChangeIndicator = (value, previousValue = 0) => {
    const change = value - previousValue;
    const percentage = previousValue > 0 ? ((change / previousValue) * 100).toFixed(1) : 0;
    
    if (change > 0) {
      return { type: 'positive', icon: faTrendingUp, text: `+${percentage}%` };
    } else if (change < 0) {
      return { type: 'negative', icon: faTrendingDown, text: `${percentage}%` };
    } else {
      return { type: 'neutral', icon: faChartLine, text: '0%' };
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <AuthGuard>
        <AdminLayout pageTitle="Tableau de bord">
          <DashboardContainer>
            <NoData>Chargement des données...</NoData>
          </DashboardContainer>
        </AdminLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AdminLayout pageTitle="Tableau de bord">
        <DashboardContainer>
          <StatsGrid>
            <StatCard>
              <StatHeader>
                <StatIcon variant="primary">
                  <FontAwesomeIcon icon={faHotel} />
                </StatIcon>
                <StatChange className={getChangeIndicator(stats.totalHotels, stats.totalHotels - 2).type}>
                  <FontAwesomeIcon icon={getChangeIndicator(stats.totalHotels, stats.totalHotels - 2).icon} />
                  {getChangeIndicator(stats.totalHotels, stats.totalHotels - 2).text}
                </StatChange>
              </StatHeader>
              <StatValue>{stats.totalHotels}</StatValue>
              <StatLabel>Hôtels au total</StatLabel>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon variant="info">
                  <FontAwesomeIcon icon={faUsers} />
                </StatIcon>
                <StatChange className={getChangeIndicator(stats.totalUsers, stats.totalUsers - 50).type}>
                  <FontAwesomeIcon icon={getChangeIndicator(stats.totalUsers, stats.totalUsers - 50).icon} />
                  {getChangeIndicator(stats.totalUsers, stats.totalUsers - 50).text}
                </StatChange>
              </StatHeader>
              <StatValue>{stats.totalUsers.toLocaleString()}</StatValue>
              <StatLabel>Utilisateurs actifs</StatLabel>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon variant="warning">
                  <FontAwesomeIcon icon={faStar} />
                </StatIcon>
                <StatChange className={getChangeIndicator(stats.averageRating, stats.averageRating - 0.2).type}>
                  <FontAwesomeIcon icon={getChangeIndicator(stats.averageRating, stats.averageRating - 0.2).icon} />
                  {getChangeIndicator(stats.averageRating, stats.averageRating - 0.2).text}
                </StatChange>
              </StatHeader>
              <StatValue>{stats.averageRating}/5</StatValue>
              <StatLabel>Note moyenne</StatLabel>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon variant="success">
                  <FontAwesomeIcon icon={faChartLine} />
                </StatIcon>
                <StatChange className={getChangeIndicator(stats.totalRevenue, stats.totalRevenue - 10000).type}>
                  <FontAwesomeIcon icon={getChangeIndicator(stats.totalRevenue, stats.totalRevenue - 10000).icon} />
                  {getChangeIndicator(stats.totalRevenue, stats.totalRevenue - 10000).text}
                </StatChange>
              </StatHeader>
              <StatValue>{formatCurrency(stats.totalRevenue)}</StatValue>
              <StatLabel>Revenus totaux</StatLabel>
            </StatCard>
          </StatsGrid>

          <ContentGrid>
            <ChartSection>
              <SectionTitle>
                <FontAwesomeIcon icon={faChartLine} />
                Évolution des réservations
              </SectionTitle>
              <ChartPlaceholder>
                Graphique des réservations (en développement)
              </ChartPlaceholder>
            </ChartSection>

            <RecentHotels>
              <SectionTitle>
                <FontAwesomeIcon icon={faHotel} />
                Hôtels récents
              </SectionTitle>
              {recentHotels.length > 0 ? (
                <HotelList>
                  {recentHotels.map((hotel) => (
                    <HotelItem key={hotel._id || hotel.id}>
                      <HotelName>{hotel.name}</HotelName>
                      <HotelDetails>
                        <HotelDetail>
                          <FontAwesomeIcon icon={faMapMarkerAlt} />
                          {hotel.address}
                        </HotelDetail>
                        <HotelDetail>
                          <FontAwesomeIcon icon={faPhone} />
                          {hotel.phone}
                        </HotelDetail>
                        <HotelDetail>
                          <FontAwesomeIcon icon={faEnvelope} />
                          {hotel.email}
                        </HotelDetail>
                        <HotelDetail>
                          <FontAwesomeIcon icon={faStar} />
                          {hotel.rating || 0}/5 • {hotel.status || 'Actif'}
                        </HotelDetail>
                      </HotelDetails>
                    </HotelItem>
                  ))}
                </HotelList>
              ) : (
                <NoData>Aucun hôtel récent</NoData>
              )}
            </RecentHotels>
          </ContentGrid>

          <QuickActions>
            <ActionCard onClick={() => window.location.href = '/admin/hotels'}>
              <ActionIcon>
                <FontAwesomeIcon icon={faHotel} />
              </ActionIcon>
              <ActionTitle>Gérer les hôtels</ActionTitle>
              <ActionDescription>
                Ajouter, modifier ou supprimer des hôtels
              </ActionDescription>
            </ActionCard>

            <ActionCard onClick={() => window.location.href = '/admin/users'}>
              <ActionIcon>
                <FontAwesomeIcon icon={faUsers} />
              </ActionIcon>
              <ActionTitle>Gérer les utilisateurs</ActionTitle>
              <ActionDescription>
                Gérer les comptes et permissions
              </ActionDescription>
            </ActionCard>

            <ActionCard onClick={() => window.location.href = '/admin/reports'}>
              <ActionIcon>
                <FontAwesomeIcon icon={faChartLine} />
              </ActionIcon>
              <ActionTitle>Rapports</ActionTitle>
              <ActionDescription>
                Consulter les statistiques détaillées
              </ActionDescription>
            </ActionCard>

            <ActionCard onClick={() => window.location.href = '/admin/settings'}>
              <ActionIcon>
                <FontAwesomeIcon icon={faEye} />
              </ActionIcon>
              <ActionTitle>Paramètres</ActionTitle>
              <ActionDescription>
                Configurer l'application
              </ActionDescription>
            </ActionCard>
          </QuickActions>
        </DashboardContainer>
      </AdminLayout>
    </AuthGuard>
  );
} 