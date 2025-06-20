'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', sans-serif;
`;

const ForgotCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  margin: auto;
  margin-left: 10%;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
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
`;

const Label = styled.label`
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;

  &:focus {
    border-color: #667eea;
  }

  &.error {
    border-color: #e74c3c;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const SuccessMessage = styled.p`
  color: #27ae60;
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
  background: #d5f4e6;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackToLogin = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  display: block;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('L\'email est requis');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('L\'email n\'est pas valide');
      return;
    }

    setIsLoading(true);
    setError('');

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
        setError(data.message || 'Erreur lors de l\'envoi de l\'email');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ForgotCard>
        <Title>Mot de passe oublié</Title>
        <Subtitle>
          Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </Subtitle>
        
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? 'error' : ''}
              placeholder="votre@email.com"
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormGroup>

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

        <BackToLogin href="/auth/login">
          Retour à la connexion
        </BackToLogin>
      </ForgotCard>
    </Container>
  );
} 