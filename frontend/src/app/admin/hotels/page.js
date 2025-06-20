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

const SearchBar = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;

  &:focus {
    border-color: #667eea;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;

  &:focus {
    border-color: #667eea;
  }
`;

const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const HotelCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const HotelImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HotelContent = styled.div`
  padding: 1.5rem;
`;

const HotelName = styled.h3`
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const HotelInfo = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;

  div {
    margin-bottom: 0.5rem;
  }
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
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &.edit {
    background: #3498db;
    color: white;

    &:hover {
      background: #2980b9;
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

const ImagePreview = styled.div`
  margin-top: 1rem;
  text-align: center;

  img {
    max-width: 200px;
    max-height: 150px;
    border-radius: 8px;
    border: 2px solid #e1e8ed;
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
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const NoHotelsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  font-size: 1.1rem;
`;

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHotels, setIsLoadingHotels] = useState(true);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    pricePerNight: '',
    currency: 'EUR',
    image: null,
    imageUrl: ''
  });

  const currencies = [
    { code: 'XOF', name: 'Franc CFA (XOF)' },
    { code: 'EUR', name: 'Euro (EUR)' },
    { code: 'USD', name: 'Dollar US (USD)' }
  ];

  // Charger les hôtels depuis l'API
  const loadHotels = async () => {
    try {
      setIsLoadingHotels(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/hotels', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setHotels(data);
        setFilteredHotels(data);
      } else {
        console.error('Erreur lors du chargement des hôtels:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des hôtels:', error);
    } finally {
      setIsLoadingHotels(false);
    }
  };

  useEffect(() => {
    loadHotels();
  }, []);

  // Filtrer les hôtels basé sur la recherche et les filtres
  useEffect(() => {
    let filtered = hotels;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par devise
    if (currencyFilter) {
      filtered = filtered.filter(hotel => hotel.currency === currencyFilter);
    }

    // Filtre par prix
    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(Number);
      filtered = filtered.filter(hotel => {
        if (max) {
          return hotel.pricePerNight >= min && hotel.pricePerNight <= max;
        } else {
          return hotel.pricePerNight >= min;
        }
      });
    }

    setFilteredHotels(filtered);
  }, [hotels, searchTerm, currencyFilter, priceFilter]);

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
      // Créer une URL temporaire pour l'aperçu
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: file,
        imageUrl: imageUrl
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
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      
      // Ajouter les données du formulaire
      formDataToSend.append('name', formData.name);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('pricePerNight', formData.pricePerNight);
      formDataToSend.append('currency', formData.currency);
      
      // Ajouter l'image si elle existe
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch('http://localhost:5000/api/hotels', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        const newHotel = await response.json();
        setHotels(prev => [newHotel, ...prev]);
        setShowModal(false);
        setFormData({
          name: '',
          address: '',
          email: '',
          phone: '',
          pricePerNight: '',
          currency: 'EUR',
          image: null,
          imageUrl: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de l\'ajout de l\'hôtel:', errorData);
        alert('Erreur lors de l\'ajout de l\'hôtel: ' + (errorData.message || 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'hôtel:', error);
      alert('Erreur lors de l\'ajout de l\'hôtel');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet hôtel ?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/hotels/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setHotels(prev => prev.filter(hotel => hotel._id !== id));
        } else {
          console.error('Erreur lors de la suppression de l\'hôtel');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'hôtel:', error);
      }
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

  if (isLoadingHotels) {
    return (
      <AuthGuard>
        <AdminLayout pageTitle="Liste des hôtels">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <LoadingSpinner />
            <p>Chargement des hôtels...</p>
          </div>
        </AdminLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AdminLayout pageTitle="Liste des hôtels">
        <HeaderBar>
          <HotelCount>
            <CountNumber>{filteredHotels.length}</CountNumber>
            <CountLabel>Hôtels</CountLabel>
          </HotelCount>
          <CreateButton onClick={() => setShowModal(true)}>
            🏨 Créer nouveau hôtel
          </CreateButton>
        </HeaderBar>

        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Rechercher par nom, adresse ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterBar>
            <FilterSelect
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
            >
              <option value="">Toutes les devises</option>
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.name}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">Tous les prix</option>
              <option value="0-100">0 - 100</option>
              <option value="100-200">100 - 200</option>
              <option value="200-300">200 - 300</option>
              <option value="300-">300+</option>
            </FilterSelect>
          </FilterBar>
        </SearchBar>

        {filteredHotels.length === 0 ? (
          <NoHotelsMessage>
            {searchTerm || currencyFilter || priceFilter 
              ? 'Aucun hôtel ne correspond à vos critères de recherche'
              : 'Aucun hôtel trouvé'
            }
          </NoHotelsMessage>
        ) : (
          <HotelsGrid>
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel._id}>
                <HotelImage>
                  {hotel.image ? (
                    <img src={hotel.image} alt={hotel.name} />
                  ) : (
                    '🏨'
                  )}
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
                      onClick={() => handleDelete(hotel._id)}
                    >
                      🗑️ Supprimer
                    </ActionButton>
                  </HotelActions>
                </HotelContent>
              </HotelCard>
            ))}
          </HotelsGrid>
        )}

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
                  {formData.imageUrl && (
                    <ImagePreview>
                      <img src={formData.imageUrl} alt="Aperçu" />
                    </ImagePreview>
                  )}
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