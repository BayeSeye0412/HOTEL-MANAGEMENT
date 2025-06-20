'use client'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../../components/AdminLayout';
import AuthGuard from '../../../components/AuthGuard';

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const HotelCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CountNumber = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
`;

const CountLabel = styled.span`
  color: #7f8c8d;
  font-size: 1rem;
`;

const CreateButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0.5rem;

  &:hover {
    color: #e74c3c;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
  border-radius: 8px;
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

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;
  background: white;

  &:focus {
    border-color: #667eea;
  }
`;

const FileInput = styled.div`
  border: 2px dashed #e1e8ed;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #667eea;
  }
`;

const FileInputText = styled.div`
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const FileInputButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #5a6fd8;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
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

const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const HotelCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const HotelImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const HotelContent = styled.div`
  padding: 1.5rem;
`;

const HotelName = styled.h3`
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const HotelInfo = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const HotelPrice = styled.div`
  color: #27ae60;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const HotelActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &.edit {
    background: #f39c12;
    color: white;

    &:hover {
      background: #e67e22;
    }
  }

  &.delete {
    background: #e74c3c;
    color: white;

    &:hover {
      background: #c0392b;
    }
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

export default function HotelsPage() {
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: 'Hôtel Le Palace',
      address: '123 Avenue des Champs-Élysées, Paris',
      email: 'contact@lepalace.fr',
      phone: '+33 1 42 86 10 28',
      pricePerNight: 250,
      currency: 'EUR',
      image: null
    },
    {
      id: 2,
      name: 'Hôtel Central',
      address: '456 Rue de la Paix, Lyon',
      email: 'info@hotelcentral.fr',
      phone: '+33 4 72 10 30 40',
      pricePerNight: 180,
      currency: 'EUR',
      image: null
    },
    {
      id: 3,
      name: 'Hôtel Luxe',
      address: '789 Boulevard de la Croisette, Cannes',
      email: 'reservation@hotelluxe.fr',
      phone: '+33 4 93 38 15 45',
      pricePerNight: 350,
      currency: 'EUR',
      image: null
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    pricePerNight: '',
    currency: 'EUR',
    image: null
  });

  const currencies = [
    { code: 'XOF', name: 'Franc CFA (XOF)' },
    { code: 'EUR', name: 'Euro (EUR)' },
    { code: 'USD', name: 'Dollar US (USD)' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Le nom de l\'hôtel est requis';
    if (!formData.address) newErrors.address = 'L\'adresse est requise';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    if (!formData.phone) newErrors.phone = 'Le numéro de téléphone est requis';
    if (!formData.pricePerNight) newErrors.pricePerNight = 'Le prix par nuit est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
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
      // Simuler l'ajout d'un hôtel
      const newHotel = {
        id: hotels.length + 1,
        ...formData,
        pricePerNight: parseFloat(formData.pricePerNight)
      };

      setHotels(prev => [...prev, newHotel]);
      setShowModal(false);
      setFormData({
        name: '',
        address: '',
        email: '',
        phone: '',
        pricePerNight: '',
        currency: 'EUR',
        image: null
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'hôtel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet hôtel ?')) {
      setHotels(prev => prev.filter(hotel => hotel.id !== id));
    }
  };

  const getCurrencySymbol = (currency) => {
    const symbols = {
      'XOF': 'F CFA',
      'EUR': '€',
      'USD': '$'
    };
    return symbols[currency] || currency;
  };

  return (
    <AuthGuard>
      <AdminLayout pageTitle="Liste des hôtels">
        <HeaderBar>
          <HotelCount>
            <CountNumber>{hotels.length}</CountNumber>
            <CountLabel>Hôtels</CountLabel>
          </HotelCount>
          <CreateButton onClick={() => setShowModal(true)}>
            🏨 Créer nouveau hôtel
          </CreateButton>
        </HeaderBar>

        <HotelsGrid>
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id}>
              <HotelImage>
                {hotel.image ? '🖼️' : '🏨'}
              </HotelImage>
              <HotelContent>
                <HotelName>{hotel.name}</HotelName>
                <HotelInfo>
                  <div>📍 {hotel.address}</div>
                  <div>📧 {hotel.email}</div>
                  <div>📞 {hotel.phone}</div>
                </HotelInfo>
                <HotelPrice>
                  {getCurrencySymbol(hotel.currency)} {hotel.pricePerNight} / nuit
                </HotelPrice>
                <HotelActions>
                  <ActionButton className="edit">✏️ Modifier</ActionButton>
                  <ActionButton 
                    className="delete"
                    onClick={() => handleDelete(hotel.id)}
                  >
                    🗑️ Supprimer
                  </ActionButton>
                </HotelActions>
              </HotelContent>
            </HotelCard>
          ))}
        </HotelsGrid>

        {showModal && (
          <Modal onClick={() => setShowModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Créer un nouvel hôtel</ModalTitle>
                <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
              </ModalHeader>

              <Form onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="name">Nom de l'hôtel *</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Nom de l'hôtel"
                    />
                    {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="currency">Devise *</Label>
                    <Select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                    >
                      {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>
                          {currency.name}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label htmlFor="address">Adresse *</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                    placeholder="Adresse complète de l'hôtel"
                  />
                  {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="email@hotel.com"
                    />
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="phone">Numéro de téléphone *</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="+33 1 23 45 67 89"
                    />
                    {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label htmlFor="pricePerNight">Prix par nuit *</Label>
                  <Input
                    type="number"
                    id="pricePerNight"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleInputChange}
                    className={errors.pricePerNight ? 'error' : ''}
                    placeholder="150"
                    min="0"
                    step="0.01"
                  />
                  {errors.pricePerNight && <ErrorMessage>{errors.pricePerNight}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>Photo de l'hôtel</Label>
                  <FileInput>
                    <FileInputText>
                      Cliquez pour sélectionner une image
                    </FileInputText>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      id="hotel-image"
                    />
                    <label htmlFor="hotel-image">
                      <FileInputButton type="button">
                        Choisir une image
                      </FileInputButton>
                    </label>
                  </FileInput>
                </FormGroup>

                <SubmitButton type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      Création en cours...
                    </>
                  ) : (
                    'Créer l\'hôtel'
                  )}
                </SubmitButton>
              </Form>
            </ModalContent>
          </Modal>
        )}
      </AdminLayout>
    </AuthGuard>
  );
} 