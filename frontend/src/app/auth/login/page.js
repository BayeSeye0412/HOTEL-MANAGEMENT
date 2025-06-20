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

const LoginCard = styled.div`
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

const ForgotPasswordLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  text-align: right;
  display: block;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
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

const RegisterLink = styled(Link)`
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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Stocker le token dans localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Rediriger vers le tableau de bord
        router.push('/admin/dashboard');
      } else {
        setErrors({ general: data.message || 'Erreur de connexion' });
      }
    } catch (error) {
      setErrors({ general: 'Erreur de connexion au serveur' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Title>Connexion</Title>
        <Subtitle>Connectez-vous à votre compte</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="votre@email.com"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder="Votre mot de passe"
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            <ForgotPasswordLink href="/auth/forgot-password">
              Mot de passe oublié ?
            </ForgotPasswordLink>
          </FormGroup>

          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner />
                Connexion en cours...
              </>
            ) : (
              'Se connecter'
            )}
          </LoginButton>
        </Form>

        <Divider>ou</Divider>

        <RegisterLink href="/auth/register">
          Créer un nouveau compte
        </RegisterLink>
      </LoginCard>
    </Container>
  );
} 