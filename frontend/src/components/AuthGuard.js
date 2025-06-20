'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: white;
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

export default function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        // Vérifier si le token est valide en appelant une route protégée
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Token invalide, supprimer et rediriger
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Erreur de vérification du token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <div style={{ textAlign: 'center' }}>
          <LoadingSpinner />
          <LoadingText>Vérification de l'authentification...</LoadingText>
        </div>
      </LoadingContainer>
    );
  }

  return isAuthenticated ? children : null;
} 