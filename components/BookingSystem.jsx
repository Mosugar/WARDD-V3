import React, { useState, useEffect } from 'react';

// SVG Icons Components
const Calendar = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const Clock = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const User = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const Mail = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const Phone = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const Music = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
);

const CreditCard = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const Check = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const ArrowLeft = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12,19 5,12 12,5"/>
  </svg>
);

const ArrowRight = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12,5 19,12 12,19"/>
  </svg>
);

const BookingSystem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artistName: '',
    projectType: '',
    duration: '',
    specialRequests: ''
  });

  // Services configuration
  const services = [
    {
      id: 'recording',
      name: 'RECORDING',
      duration: '2-8 hours',
      price: '300 DH/hour',
      description: 'Professional vocal recording with top-tier equipment',
      icon: '🎤'
    },
    {
      id: 'mixing',
      name: 'MIXAGE',
      duration: '1-3 days',
      price: '800 DH/track',
      description: 'Expert mixing to bring your track to life',
      icon: '🎛️'
    },
    {
      id: 'mastering',
      name: 'MASTERING',
      duration: '1-2 days',
      price: '400 DH/track',
      description: 'Final polish for radio-ready sound',
      icon: '🎯'
    },
    {
      id: 'production',
      name: 'PRODUCTION',
      duration: '1-5 days',
      price: 'Custom Quote',
      description: 'Complete music production from concept to finish',
      icon: '🎹'
    },
    {
      id: 'beatmaking',
      name: 'BEATMAKING',
      duration: '2-4 hours',
      price: '500 DH/beat',
      description: 'Custom beats crafted for your style',
      icon: '🥁'
    }
  ];

  // Available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  // Calendar functionality
  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateAvailable = (day) => {
    const today = new Date();
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return checkDate >= today && checkDate.getDay() !== 0; // Not Sunday and not in the past
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    const today = new Date();
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    if (prevMonthDate >= new Date(today.getFullYear(), today.getMonth())) {
      setCurrentMonth(prevMonthDate);
    }
  };

  const renderCalendar = () => {
    const days = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);
    const monthDays = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      monthDays.push(<div key={`empty-${i}`} style={{ padding: '1rem' }}></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= days; day++) {
      const isAvailable = isDateAvailable(day);
      const isSelected = selectedDate === `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      monthDays.push(
        <button
          key={day}
          onClick={() => isAvailable && setSelectedDate(`${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
          disabled={!isAvailable}
          style={{
            padding: '1rem',
            textAlign: 'center',
            borderRadius: '8px',
            border: '2px solid',
            backgroundColor: isSelected ? '#22c55e' : '#ffffff',
            color: isSelected ? '#ffffff' : isAvailable ? '#000000' : '#d1d5db',
            borderColor: isSelected ? '#22c55e' : '#e5e7eb',
            cursor: isAvailable ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            fontWeight: isSelected ? 'bold' : 'normal'
          }}
          onMouseEnter={(e) => {
            if (isAvailable && !isSelected) {
              e.target.style.backgroundColor = '#22c55e';
              e.target.style.color = '#ffffff';
            }
          }}
          onMouseLeave={(e) => {
            if (isAvailable && !isSelected) {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#000000';
            }
          }}
        >
          {day}
        </button>
      );
    }
    
    return monthDays;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const selectedServiceData = services.find(s => s.id === selectedService);
    const bookingData = {
      service: selectedService,
      serviceName: selectedServiceData?.name,
      servicePrice: selectedServiceData?.price,
      date: selectedDate,
      time: selectedTime,
      formattedDate: formatDate(new Date(selectedDate)),
      ...formData
    };
    
    try {
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/xkgbdwbw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: `🎵 Nouvelle réservation Wardd Music - ${bookingData.serviceName}`,
          message: `
📅 NOUVELLE RÉSERVATION WARDD MUSIC STUDIO

🎯 DÉTAILS DE LA SESSION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service demandé: ${bookingData.serviceName}
Prix: ${bookingData.servicePrice}
Date: ${bookingData.formattedDate}
Heure: ${bookingData.time}

👤 INFORMATIONS CLIENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nom complet: ${bookingData.name}
Email: ${bookingData.email}
Téléphone: ${bookingData.phone}
Nom d'artiste: ${bookingData.artistName || 'Non spécifié'}
Type de projet: ${bookingData.projectType || 'Non spécifié'}

💬 DEMANDES SPÉCIALES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${bookingData.specialRequests || 'Aucune demande spéciale'}

🌟 ACTIONS À EFFECTUER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Confirmer la disponibilité du créneau
✅ Envoyer un devis détaillé
✅ Contacter le client sous 24h

📧 Répondre à: ${bookingData.email}
📞 Appeler: ${bookingData.phone}

---
Réservation effectuée via warddmusic.com le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
          `,
          // Additional form fields for better organization
          _replyto: bookingData.email,
          _subject: `🎵 Nouvelle réservation Wardd Music - ${bookingData.serviceName}`,
          client_name: bookingData.name,
          client_email: bookingData.email,
          client_phone: bookingData.phone,
          service_requested: bookingData.serviceName,
          booking_date: bookingData.formattedDate,
          booking_time: bookingData.time,
          artist_name: bookingData.artistName,
          project_type: bookingData.projectType,
          special_requests: bookingData.specialRequests
        })
      });

      if (response.ok) {
        alert('🎉 Réservation envoyée avec succès!\n\n✅ Nous avons reçu votre demande\n📧 Vous recevrez une confirmation par email\n⏰ Nous vous contacterons sous 24h\n\nMerci de faire confiance à Wardd Music! 🎵');
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Fallback: Open email client with pre-filled data
      const subject = encodeURIComponent(`🎵 Réservation ${bookingData.serviceName} - ${bookingData.formattedDate}`);
      const body = encodeURIComponent(`
Bonjour l'équipe Wardd Music,

Je souhaite réserver une session au studio:

📅 DÉTAILS DE LA SESSION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service: ${bookingData.serviceName}
Prix: ${bookingData.servicePrice}
Date: ${bookingData.formattedDate}
Heure: ${bookingData.time}

👤 MES INFORMATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nom: ${bookingData.name}
Email: ${bookingData.email}
Téléphone: ${bookingData.phone}
Nom d'artiste: ${bookingData.artistName || 'Non spécifié'}
Type de projet: ${bookingData.projectType || 'Non spécifié'}

💬 DEMANDES SPÉCIALES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${bookingData.specialRequests || 'Aucune'}

Merci de me confirmer la disponibilité! 🎵

Cordialement,
${bookingData.name}
      `);
      
      window.location.href = `mailto:contact@warddstudio.com?subject=${subject}&body=${body}`;
      alert('📧 Erreur de connexion.\nVotre client email va s\'ouvrir avec toutes les informations pré-remplies!');
    }
    
    // Reset form
    setCurrentStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedService('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      artistName: '',
      projectType: '',
      duration: '',
      specialRequests: ''
    });
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1: return selectedService !== '';
      case 2: return selectedDate !== '';
      case 3: return selectedTime !== '';
      case 4: return formData.name && formData.email && formData.phone;
      default: return false;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '3rem 0' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#111827', 
            marginBottom: '1rem',
            fontFamily: 'Sequel Bold'
          }}>
            Réservez votre session
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#6b7280',
            fontFamily: 'Nexa bold'
          }}>
            Wardd Music Studio - Expérience professionnelle garantie
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  backgroundColor: currentStep >= step ? '#22c55e' : '#e5e7eb',
                  color: currentStep >= step ? '#ffffff' : '#6b7280',
                  transition: 'all 0.3s'
                }}>
                  {isStepComplete(step) ? <Check size={20} /> : step}
                </div>
                {step < 4 && (
                  <div style={{
                    width: '4rem',
                    height: '0.25rem',
                    backgroundColor: currentStep > step ? '#22c55e' : '#e5e7eb',
                    transition: 'all 0.3s'
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '1rem', 
            gap: '2rem', 
            fontSize: '0.875rem' 
          }}>
            <span style={{ 
              color: currentStep >= 1 ? '#059669' : '#6b7280',
              fontWeight: currentStep >= 1 ? '600' : 'normal'
            }}>
              Service
            </span>
            <span style={{ 
              color: currentStep >= 2 ? '#059669' : '#6b7280',
              fontWeight: currentStep >= 2 ? '600' : 'normal'
            }}>
              Date
            </span>
            <span style={{ 
              color: currentStep >= 3 ? '#059669' : '#6b7280',
              fontWeight: currentStep >= 3 ? '600' : 'normal'
            }}>
              Heure
            </span>
            <span style={{ 
              color: currentStep >= 4 ? '#059669' : '#6b7280',
              fontWeight: currentStep >= 4 ? '600' : 'normal'
            }}>
              Détails
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '1rem', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
          padding: '2rem' 
        }}>
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#111827', 
                marginBottom: '1.5rem', 
                textAlign: 'center',
                fontFamily: 'Sequel Bold'
              }}>
                Choisissez votre service
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '1rem' 
              }}>
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    style={{
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '2px solid',
                      borderColor: selectedService === service.id ? '#22c55e' : '#e5e7eb',
                      backgroundColor: selectedService === service.id ? '#f0fdf4' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: selectedService === service.id ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{service.icon}</div>
                    <h3 style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.125rem', 
                      color: '#111827', 
                      marginBottom: '0.5rem',
                      fontFamily: 'Sequel Bold'
                    }}>
                      {service.name}
                    </h3>
                    <p style={{ color: '#059669', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {service.price}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      {service.duration}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date Selection */}
          {currentStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#111827', 
                marginBottom: '1.5rem', 
                textAlign: 'center',
                fontFamily: 'Sequel Bold'
              }}>
                Sélectionnez une date
              </h2>
              
              {/* Calendar Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button 
                  onClick={prevMonth}
                  style={{ 
                    padding: '0.5rem', 
                    borderRadius: '0.5rem', 
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <ArrowLeft size={24} />
                </button>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', fontFamily: 'Sequel Bold' }}>
                  {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </h3>
                <button 
                  onClick={nextMonth}
                  style={{ 
                    padding: '0.5rem', 
                    borderRadius: '0.5rem', 
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <ArrowRight size={24} />
                </button>
              </div>

              {/* Calendar Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                  <div key={day} style={{ 
                    padding: '1rem', 
                    textAlign: 'center', 
                    fontWeight: '600', 
                    color: '#6b7280' 
                  }}>
                    {day}
                  </div>
                ))}
                {renderCalendar()}
              </div>

              {selectedDate && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '1rem', 
                  backgroundColor: '#f0fdf4', 
                  borderRadius: '0.5rem' 
                }}>
                  <p style={{ color: '#15803d', fontWeight: '600' }}>
                    Date sélectionnée: {formatDate(new Date(selectedDate))}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Time Selection */}
          {currentStep === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#111827', 
                marginBottom: '1.5rem', 
                textAlign: 'center',
                fontFamily: 'Sequel Bold'
              }}>
                Choisissez l'heure
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                gap: '1rem' 
              }}>
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '2px solid',
                      borderColor: selectedTime === time ? '#22c55e' : '#e5e7eb',
                      backgroundColor: selectedTime === time ? '#22c55e' : '#ffffff',
                      color: selectedTime === time ? '#ffffff' : '#000000',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTime !== time) {
                        e.target.style.borderColor = '#22c55e';
                        e.target.style.backgroundColor = '#f0fdf4';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTime !== time) {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.backgroundColor = '#ffffff';
                      }
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
              
              {selectedTime && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '1rem', 
                  backgroundColor: '#f0fdf4', 
                  borderRadius: '0.5rem' 
                }}>
                  <p style={{ color: '#15803d', fontWeight: '600' }}>
                    Créneau: {selectedTime} - {formatDate(new Date(selectedDate))}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Contact Information */}
          {currentStep === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#111827', 
                marginBottom: '1.5rem', 
                textAlign: 'center',
                fontFamily: 'Sequel Bold'
              }}>
                Vos informations
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1.5rem' 
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.5rem',
                    fontFamily: 'Nexa bold'
                  }}>
                    <User size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    placeholder="Votre nom"
                    required
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22c55e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.5rem',
                    fontFamily: 'Nexa bold'
                  }}>
                    <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    placeholder="votre@email.com"
                    required
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22c55e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.5rem',
                    fontFamily: 'Nexa bold'
                  }}>
                    <Phone size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    placeholder="+212 6XX XXX XXX"
                    required
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22c55e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.5rem',
                    fontFamily: 'Nexa bold'
                  }}>
                    <Music size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                    Nom d'artiste
                  </label>
                  <input
                    type="text"
                    value={formData.artistName}
                    onChange={(e) => setFormData({...formData, artistName: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    placeholder="Votre nom de scène"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22c55e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.5rem',
                    fontFamily: 'Nexa bold'
                  }}>
                    Type de projet
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      backgroundColor: '#ffffff'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22c55e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="single">Single</option>
                    <option value="ep">EP</option>
                    <option value="album">Album</option>
                    <option value="demo">Demo</option>
                    <option value="mixtape">Mixtape</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.5rem',
                    fontFamily: 'Nexa bold'
                  }}>
                    Demandes spéciales
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      resize: 'vertical'
                    }}
                    placeholder="Décrivez votre projet, style musical, instruments nécessaires..."
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22c55e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Booking Summary */}
              <div style={{ 
                backgroundColor: '#f9fafb', 
                padding: '1.5rem', 
                borderRadius: '0.5rem',
                marginTop: '1.5rem'
              }}>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: '1.125rem', 
                  marginBottom: '1rem',
                  fontFamily: 'Sequel Bold'
                }}>
                  Récapitulatif de la réservation
                </h3>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.5rem', 
                  fontSize: '0.875rem',
                  fontFamily: 'Nexa bold'
                }}>
                  <p><strong>Service:</strong> {services.find(s => s.id === selectedService)?.name}</p>
                  <p><strong>Date:</strong> {formatDate(new Date(selectedDate))}</p>
                  <p><strong>Heure:</strong> {selectedTime}</p>
                  <p><strong>Prix:</strong> {services.find(s => s.id === selectedService)?.price}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '2rem' 
          }}>
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                transition: 'all 0.2s',
                border: 'none',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                backgroundColor: currentStep === 1 ? '#e5e7eb' : '#4b5563',
                color: currentStep === 1 ? '#9ca3af' : '#ffffff',
                fontFamily: 'Sequel Bold'
              }}
              onMouseEnter={(e) => {
                if (currentStep !== 1) {
                  e.target.style.backgroundColor = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (currentStep !== 1) {
                  e.target.style.backgroundColor = '#4b5563';
                }
              }}
            >
              Retour
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!isStepComplete(currentStep)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: !isStepComplete(currentStep) ? 'not-allowed' : 'pointer',
                  backgroundColor: !isStepComplete(currentStep) ? '#e5e7eb' : '#16a34a',
                  color: !isStepComplete(currentStep) ? '#9ca3af' : '#ffffff',
                  fontFamily: 'Sequel Bold'
                }}
                onMouseEnter={(e) => {
                  if (isStepComplete(currentStep)) {
                    e.target.style.backgroundColor = '#15803d';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isStepComplete(currentStep)) {
                    e.target.style.backgroundColor = '#16a34a';
                  }
                }}
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepComplete(currentStep)}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: !isStepComplete(currentStep) ? 'not-allowed' : 'pointer',
                  backgroundColor: !isStepComplete(currentStep) ? '#e5e7eb' : '#16a34a',
                  color: !isStepComplete(currentStep) ? '#9ca3af' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'Sequel Bold'
                }}
                onMouseEnter={(e) => {
                  if (isStepComplete(currentStep)) {
                    e.target.style.backgroundColor = '#15803d';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isStepComplete(currentStep)) {
                    e.target.style.backgroundColor = '#16a34a';
                  }
                }}
              >
                <CreditCard size={20} />
                <span>Confirmer la réservation</span>
              </button>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          color: '#6b7280',
          fontFamily: 'Nexa bold'
        }}>
          <p>
            Questions? Contactez-nous: <strong>+212-617-869001</strong> | <strong>contact@warddstudio.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;