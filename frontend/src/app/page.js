'use client'
import Image from "next/image";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  min-height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const Button = styled.a`
  background-color: #0070f3;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0051c1;
  }
`;

const Illustration = styled.div`
  margin-top: 3rem;
  width: 100%;
  max-width: 600px;
`;

export default function Home() {
  return (
    <Container>
      <Title>Gérez vos hôtels en toute simplicité 🏨</Title>
      <Subtitle>
        Une plateforme moderne pour gérer vos hôtels, vos clients et vos réservations depuis un seul tableau de bord.
      </Subtitle>
      <Button href="/auth/login">Se connecter</Button>

      <Illustration>
        <Image
          src="/hotel-illustration.png" // Remplace avec ton image dans /public
          width={600}
          height={400}
          alt="Illustration hôtel"
        />
      </Illustration>
    </Container>
  );
}
