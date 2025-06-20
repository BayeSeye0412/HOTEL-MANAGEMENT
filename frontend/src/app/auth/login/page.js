'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', sans-serif;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginCard = styled.div`
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

const PasswordContainer = styled.div`
  position: relative;
`;

const PasswordInput = styled.input`
  padding: 1rem;
  padding-right: 3rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &.error {
    border-color: #e74c3c;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #7f8c8d;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #667eea;
  }
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #667eea;
  cursor: pointer;
`;

const RememberMeLabel = styled.label`
  color: #2c3e50;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
`;

const ForgotPasswordLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: right;
  display: block;
  margin-top: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #5a6fd8;
    text-decoration: underline;
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

const TestLoginButton = styled.button`
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(39, 174, 96, 0.3);
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

const RegisterLink = styled(Link)`
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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (formData.rememberMe) {
          sessionStorage.setItem('rememberMe', 'true');
        }

        router.push('/admin/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const testCredentials = {
        email: 'admin@test.com',
        password: 'password123'
      };

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCredentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/admin/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <LoginCard>
        <LogoSection>
          <Logo>
            <FontAwesomeIcon icon={faHotel} />
          </Logo>
          <SiteName>Hotel Management</SiteName>
          <SiteTagline>Gérez vos hôtels en toute simplicité</SiteTagline>
        </LogoSection>

        <Title>Connexion</Title>
        <Subtitle>Connectez-vous à votre compte administrateur</Subtitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="votre@email.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Mot de passe</Label>
            <PasswordContainer>
              <PasswordInput
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Votre mot de passe"
                required
              />
              <PasswordToggle onClick={togglePassword} type="button">
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </PasswordToggle>
            </PasswordContainer>
            <ForgotPasswordLink href="/auth/forgot-password">
              Mot de passe oublié ?
            </ForgotPasswordLink>
          </FormGroup>

          <RememberMeContainer>
            <Checkbox
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            <RememberMeLabel htmlFor="rememberMe">
              Se souvenir de moi
            </RememberMeLabel>
          </RememberMeContainer>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner />
                Connexion en cours...
              </>
            ) : (
              'Se connecter'
            )}
          </SubmitButton>

          <TestLoginButton type="button" onClick={handleTestLogin} disabled={isLoading}>
            {isLoading ? 'Connexion...' : '🔑 Connexion Test (Admin)'}
          </TestLoginButton>
        </Form>

        <Divider>ou</Divider>

        <RegisterLink href="/auth/register">
          Créer un nouveau compte
        </RegisterLink>
      </LoginCard>
    </Container>
  );
} 