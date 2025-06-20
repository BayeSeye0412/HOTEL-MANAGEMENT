'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHotel, 
  faChartLine, 
  faUsers, 
  faStar,
  faArrowRight,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: var(--spacing-lg) var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

const NavButtons = styled.div`
  display: flex;
  gap: var(--spacing-md);
`;

const NavButton = styled.button`
  background: ${props => props.primary ? 'white' : 'transparent'};
  color: ${props => props.primary ? 'var(--primary-color)' : 'white'};
  border: 2px solid white;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    background: ${props => props.primary ? 'white' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const Hero = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-xl);
  color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled.button`
  background: white;
  color: var(--primary-color);
  border: none;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  box-shadow: var(--shadow-lg);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-xl);
  }
`;

const Features = styled.section`
  background: var(--bg-primary);
  padding: var(--spacing-2xl) var(--spacing-xl);
  color: var(--text-primary);
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
`;

const FeatureCard = styled.div`
  background: var(--bg-secondary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: all var(--transition-normal);
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  color: white;
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const Stats = styled.section`
  background: linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%);
  padding: var(--spacing-2xl) var(--spacing-xl);
  color: white;
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
  text-align: center;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: white;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const Footer = styled.footer`
  background: var(--bg-primary);
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  margin-bottom: var(--spacing-md);
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
`;

const FooterLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-normal);

  &:hover {
    color: var(--primary-dark);
  }
`;

const Copyright = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
`;

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleGetStarted = () => {
    router.push('/auth/register');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <Container>
      <Header>
        <Logo>
          <FontAwesomeIcon icon={faHotel} />
          Hotel Management
        </Logo>
        <NavButtons>
          <NavButton onClick={handleLogin}>
            Se connecter
          </NavButton>
          <NavButton primary onClick={handleGetStarted}>
            Commencer
          </NavButton>
        </NavButtons>
      </Header>

      <Hero>
        <HeroContent>
          <HeroTitle>
            Gérez vos hôtels avec simplicité et efficacité
          </HeroTitle>
          <HeroSubtitle>
            Une plateforme moderne et intuitive pour la gestion complète de vos établissements hôteliers. 
            Simplifiez vos opérations quotidiennes et améliorez l'expérience de vos clients.
          </HeroSubtitle>
          <CTAButton onClick={handleGetStarted}>
            Commencer maintenant
            <FontAwesomeIcon icon={faArrowRight} />
          </CTAButton>
        </HeroContent>
      </Hero>

      <Features>
        <FeaturesContainer>
          <SectionTitle>Fonctionnalités principales</SectionTitle>
          <SectionSubtitle>
            Découvrez tous les outils dont vous avez besoin pour gérer efficacement vos hôtels
          </SectionSubtitle>
          
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <FontAwesomeIcon icon={faHotel} />
              </FeatureIcon>
              <FeatureTitle>Gestion des hôtels</FeatureTitle>
              <FeatureDescription>
                Créez, modifiez et gérez facilement tous vos établissements hôteliers 
                avec une interface intuitive et moderne.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FontAwesomeIcon icon={faChartLine} />
              </FeatureIcon>
              <FeatureTitle>Tableau de bord</FeatureTitle>
              <FeatureDescription>
                Visualisez vos performances et statistiques en temps réel 
                avec des graphiques et indicateurs clairs.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FontAwesomeIcon icon={faUsers} />
              </FeatureIcon>
              <FeatureTitle>Gestion des utilisateurs</FeatureTitle>
              <FeatureDescription>
                Gérez les accès et permissions de votre équipe 
                avec un système de rôles flexible et sécurisé.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FontAwesomeIcon icon={faStar} />
              </FeatureIcon>
              <FeatureTitle>Évaluations et avis</FeatureTitle>
              <FeatureDescription>
                Suivez la satisfaction de vos clients et améliorez 
                vos services grâce aux retours d'expérience.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FontAwesomeIcon icon={faCheckCircle} />
              </FeatureIcon>
              <FeatureTitle>Interface moderne</FeatureTitle>
              <FeatureDescription>
                Profitez d'une interface utilisateur moderne avec 
                support du mode sombre et design responsive.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FontAwesomeIcon icon={faArrowRight} />
              </FeatureIcon>
              <FeatureTitle>Facile à utiliser</FeatureTitle>
              <FeatureDescription>
                Interface intuitive conçue pour être accessible 
                à tous les membres de votre équipe.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </Features>

      <Stats>
        <StatsContainer>
          <StatItem>
            <StatNumber>500+</StatNumber>
            <StatLabel>Hôtels gérés</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>10k+</StatNumber>
            <StatLabel>Utilisateurs satisfaits</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>99.9%</StatNumber>
            <StatLabel>Disponibilité</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Support client</StatLabel>
          </StatItem>
        </StatsContainer>
      </Stats>

      <Footer>
        <FooterContent>
          <FooterText>
            Hotel Management - La solution moderne pour la gestion d'hôtels
          </FooterText>
          <FooterLinks>
            <FooterLink href="/auth/login">Connexion</FooterLink>
            <FooterLink href="/auth/register">Inscription</FooterLink>
            <FooterLink href="/auth/forgot-password">Mot de passe oublié</FooterLink>
          </FooterLinks>
          <Copyright>
            © 2024 Hotel Management. Tous droits réservés.
          </Copyright>
        </FooterContent>
      </Footer>
    </Container>
  );
}
