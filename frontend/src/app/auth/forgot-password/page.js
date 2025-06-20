'use client'
import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', sans-serif;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ForgotPasswordCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  text-align: center;
`;

const LogoSection = styled.div`
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  font-size: 4rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

const SiteName = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

const SiteTagline = styled.p`
  color: #7f8c8d;
  font-size: 1rem;
  margin: 0.5rem 0 0 0;
`;

const Title = styled.h2`
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
`;

const Label = styled.label`
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &.error {
    border-color: #e74c3c;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  text-align: left;
`;

const SuccessMessage = styled.p`
  color: #27ae60;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  text-align: left;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: #7f8c8d;
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e1e8ed;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const LoginLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #5a6fd8;
    text-decoration: underline;
  }
`;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Un email de réinitialisation a été envoyé à votre adresse email.');
        setEmail('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ForgotPasswordCard>
        <LogoSection>
          <Logo>
            <FontAwesomeIcon icon={faHotel} />
          </Logo>
          <SiteName>Hotel Management</SiteName>
          <SiteTagline>Gérez vos hôtels en toute simplicité</SiteTagline>
        </LogoSection>

        <Title>Mot de passe oublié</Title>
        <Subtitle>
          Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner />
                Envoi en cours...
              </>
            ) : (
              'Envoyer le lien de réinitialisation'
            )}
          </SubmitButton>
        </Form>

        <Divider>ou</Divider>

        <LoginLink href="/auth/login">
          Retour à la connexion
        </LoginLink>
      </ForgotPasswordCard>
    </Container>
  );
} 