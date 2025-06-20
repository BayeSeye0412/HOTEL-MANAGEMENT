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

const RegisterCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
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

const TermsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  text-align: left;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #667eea;
  cursor: pointer;
  margin-top: 0.2rem;
  flex-shrink: 0;
`;

const TermsLabel = styled.label`
  color: #2c3e50;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 500;
  line-height: 1.4;
`;

const TermsLink = styled.span`
  color: #667eea;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    color: #5a6fd8;
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

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Le nom d\'utilisateur est requis';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les termes et conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/auth/login?registered=true');
      } else {
        setErrors({ general: data.message || 'Erreur lors de l\'inscription' });
      }
    } catch (error) {
      setErrors({ general: 'Erreur de connexion au serveur' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container>
      <RegisterCard>
        <LogoSection>
          <Logo>
            <FontAwesomeIcon icon={faHotel} />
          </Logo>
          <SiteName>Hotel Management</SiteName>
          <SiteTagline>Gérez vos hôtels en toute simplicité</SiteTagline>
        </LogoSection>

        <Title>Créer un compte</Title>
        <Subtitle>Rejoignez notre plateforme de gestion d'hôtels</Subtitle>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username ? 'error' : ''}
              placeholder="Votre nom d'utilisateur"
              required
            />
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          </FormGroup>

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
              required
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
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
                className={errors.password ? 'error' : ''}
                placeholder="Votre mot de passe"
                required
              />
              <PasswordToggle onClick={togglePassword} type="button">
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </PasswordToggle>
            </PasswordContainer>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <PasswordContainer>
              <PasswordInput
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirmez votre mot de passe"
                required
              />
              <PasswordToggle onClick={toggleConfirmPassword} type="button">
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </PasswordToggle>
            </PasswordContainer>
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          </FormGroup>

          <TermsContainer>
            <Checkbox
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
            />
            <TermsLabel htmlFor="acceptTerms">
              J'accepte les <TermsLink>termes et conditions</TermsLink> et la{' '}
              <TermsLink>politique de confidentialité</TermsLink> *
            </TermsLabel>
          </TermsContainer>
          {errors.acceptTerms && <ErrorMessage>{errors.acceptTerms}</ErrorMessage>}

          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner />
                Création en cours...
              </>
            ) : (
              'Créer mon compte'
            )}
          </SubmitButton>
        </Form>

        <Divider>ou</Divider>

        <LoginLink href="/auth/login">
          J'ai déjà un compte, me connecter
        </LoginLink>
      </RegisterCard>
    </Container>
  );
} 