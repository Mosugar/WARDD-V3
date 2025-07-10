import React, { useState } from 'react';

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
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artistName: '',
    projectType: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    {
      id: 'recording',
      name: 'RECORDING',
      duration: '2-8 heures',
      price: '300 DH/heure',
      description: 'Enregistrement vocal professionnel avec équipement haut de gamme'
    },
    {
      id: 'mixing',
      name: 'MIXAGE',
      duration: '1-3 jours',
      price: '800 DH/track',
      description: 'Mixage expert pour donner vie à votre morceau'
    },
    {
      id: 'mastering',
      name: 'MASTERING',
      duration: '1-2 jours',
      price: '400 DH/track',
      description: 'Finalisation pour un son prêt pour la radio'
    },
    {
      id: 'production',
      name: 'PRODUCTION',
      duration: '1-5 jours',
      price: 'Devis personnalisé',
      description: 'Production musicale complète du concept au produit fini'
    },
    {
      id: 'beatmaking',
      name: 'BEATMAKING',
      duration: '2-4 heures',
      price: '500 DH/beat',
      description: 'Beats personnalisés adaptés à votre style'
    }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const isDateAvailable = (day) => {
    const today = new Date();
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return checkDate >= today && checkDate.getDay() !== 0;
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
    
    for (let i = 0; i < firstDay; i++) {
      monthDays.push(<div key={`empty-${i}`} className="p-2 sm:p-4"></div>);
    }
    
    for (let day = 1; day <= days; day++) {
      const isAvailable = isDateAvailable(day);
      const isSelected = selectedDate === `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      monthDays.push(
        <button
          key={day}
          onClick={() => isAvailable && setSelectedDate(`${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
          disabled={!isAvailable}
          className={`
            p-2 sm:p-4 text-center rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base
            ${isSelected 
              ? 'bg-green-500 text-white shadow-lg scale-105' 
              : isAvailable 
                ? 'bg-white hover:bg-green-50 text-gray-800 hover:text-green-600 hover:scale-105 shadow-sm hover:shadow-md border border-gray-200 hover:border-green-300' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {day}
        </button>
      );
    }
    
    return monthDays;
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
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
    setIsSubmitting(true);
    const selectedServicesData = services.filter(s => selectedServices.includes(s.id));
    const serviceNames = selectedServicesData.map(s => s.name).join(', ');
    
    const bookingData = {
      services: selectedServices,
      serviceNames: serviceNames,
      date: selectedDate,
      time: selectedTime,
      formattedDate: formatDate(new Date(selectedDate)),
      ...formData
    };
    
    try {
      const response = await fetch('https://formspree.io/f/xkgbdwbw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: `Nouvelle réservation Wardd Music - ${serviceNames}`,
          message: `
NOUVELLE RÉSERVATION WARDD MUSIC STUDIO

DÉTAILS DE LA SESSION:
Services demandés: ${serviceNames}
Date: ${bookingData.formattedDate}
Heure: ${bookingData.time}

INFORMATIONS CLIENT:
Nom complet: ${bookingData.name}
Email: ${bookingData.email}
Téléphone: ${bookingData.phone}
Nom d'artiste: ${bookingData.artistName || 'Non spécifié'}
Type de projet: ${bookingData.projectType || 'Non spécifié'}

DEMANDES SPÉCIALES:
${bookingData.specialRequests || 'Aucune demande spéciale'}

---
Réservation effectuée le ${new Date().toLocaleDateString('fr-FR')}
          `,
          _replyto: bookingData.email,
          _subject: `Nouvelle réservation Wardd Music - ${serviceNames}`,
          client_name: bookingData.name,
          client_email: bookingData.email,
          client_phone: bookingData.phone,
          services_requested: serviceNames,
          booking_date: bookingData.formattedDate,
          booking_time: bookingData.time
        })
      });

      if (response.ok) {
        setCurrentStep(5);
        setTimeout(() => {
          alert('Réservation envoyée avec succès!\n\nNous avons reçu votre demande\nVous recevrez une confirmation par email\nNous vous contacterons sous 24h\n\nMerci de faire confiance à Wardd Music!');
        }, 1000);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Error:', error);
      
      const subject = encodeURIComponent(`Réservation ${serviceNames} - ${bookingData.formattedDate}`);
      const body = encodeURIComponent(`
Bonjour l'équipe Wardd Music,

Je souhaite réserver une session au studio:

Services: ${serviceNames}
Date: ${bookingData.formattedDate}
Heure: ${bookingData.time}

Mes informations:
Nom: ${bookingData.name}
Email: ${bookingData.email}
Téléphone: ${bookingData.phone}
Nom d'artiste: ${bookingData.artistName || 'Non spécifié'}
Type de projet: ${bookingData.projectType || 'Non spécifié'}

Demandes spéciales:
${bookingData.specialRequests || 'Aucune'}

Merci de me confirmer la disponibilité!

Cordialement,
${bookingData.name}
      `);
      
      window.location.href = `mailto:contact@warddstudio.com?subject=${subject}&body=${body}`;
      alert('Erreur de connexion.\nVotre client email va s\'ouvrir avec toutes les informations pré-remplies!');
    }
    
    setIsSubmitting(false);
    
    setTimeout(() => {
      setCurrentStep(1);
      setSelectedDate('');
      setSelectedTime('');
      setSelectedServices([]);
      setFormData({
        name: '',
        email: '',
        phone: '',
        artistName: '',
        projectType: '',
        specialRequests: ''
      });
    }, 3000);
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1: return selectedServices.length > 0;
      case 2: return selectedDate !== '';
      case 3: return selectedTime !== '';
      case 4: return formData.name && formData.email && formData.phone;
      default: return false;
    }
  };

  const steps = [
    { number: 1, title: 'Service', icon: Music },
    { number: 2, title: 'Date', icon: Calendar },
    { number: 3, title: 'Heure', icon: Clock },
    { number: 4, title: 'Détails', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-12 pt-6 sm:pt-12 px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-800 via-gray-900 to-green-600 bg-clip-text text-transparent mb-4 sm:mb-6">
          Réservez votre session
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
          Expérience professionnelle garantie dans notre studio d'enregistrement
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 sm:mb-16 px-4">
        <div className="flex justify-center items-center max-w-4xl mx-auto">
          <div className="flex items-center w-full">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg transition-all duration-500
                    ${currentStep >= step.number 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg scale-110' 
                      : 'bg-white text-gray-400 shadow-md'
                    }
                    ${currentStep === step.number ? 'animate-pulse ring-2 sm:ring-4 ring-green-200' : ''}
                  `}>
                    {isStepComplete(step.number) && step.number < currentStep ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    ) : (
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    )}
                  </div>
                  <span className={`
                    mt-1 sm:mt-2 font-semibold text-xs sm:text-sm transition-colors duration-300 text-center
                    ${currentStep >= step.number ? 'text-green-600' : 'text-gray-500'}
                  `}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 lg:mx-4 rounded-full transition-all duration-500
                    ${currentStep > step.number 
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                      : 'bg-gray-200'
                    }
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8 xl:p-16">
            
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-3 sm:mb-6">
                    Choisissez vos services
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 px-2">Sélectionnez un ou plusieurs services qui correspondent à vos besoins</p>
                  {selectedServices.length > 0 && (
                    <div className="inline-flex items-center gap-2 mt-2 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-semibold">
                      <Check size={14} />
                      {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} sélectionné{selectedServices.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {services.map((service) => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`
                          relative p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 transform
                          ${isSelected 
                            ? 'scale-102 sm:scale-105 shadow-xl sm:shadow-2xl ring-2 sm:ring-4 ring-green-200 bg-gradient-to-br from-green-400 to-emerald-500 text-white' 
                            : 'hover:scale-102 sm:hover:scale-105 hover:shadow-lg sm:hover:shadow-xl bg-white text-gray-700 shadow-md border-2 border-gray-200 hover:border-green-300'
                          }
                        `}
                      >
                        <h3 className="font-bold text-lg sm:text-xl mb-2">{service.name}</h3>
                        <p className={`${isSelected ? 'text-white' : 'text-green-600'} font-semibold mb-1 sm:mb-2 text-sm sm:text-base`}>
                          {service.price}
                        </p>
                        <p className={`${isSelected ? 'text-white/90' : 'text-gray-500'} text-xs sm:text-sm mb-2 sm:mb-3`}>
                          {service.duration}
                        </p>
                        <p className={`${isSelected ? 'text-white/90' : 'text-gray-600'} text-xs sm:text-sm leading-relaxed`}>
                          {service.description}
                        </p>
                        
                        <div className={`
                          absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300
                          ${isSelected 
                            ? 'bg-white shadow-lg scale-110' 
                            : 'bg-gray-200'
                          }
                        `}>
                          {isSelected ? (
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                          ) : (
                            <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-400 rounded"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {currentStep === 2 && (
              <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-3 sm:mb-6">
                    Sélectionnez une date
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-8 px-2">Choisissez le jour qui vous convient le mieux</p>
                </div>
                
                <div className="flex justify-between items-center mb-4 sm:mb-8 bg-gradient-to-r from-gray-50 to-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
                  <button 
                    onClick={prevMonth}
                    className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-gray-600 hover:text-green-600"
                  >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 text-center">
                    {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </h3>
                  
                  <button 
                    onClick={nextMonth}
                    className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-gray-600 hover:text-green-600"
                  >
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
                  <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
                    {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                      <div key={day} className="p-2 sm:p-4 text-center font-bold text-gray-600 text-xs sm:text-sm">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {renderCalendar()}
                  </div>
                </div>

                {selectedDate && (
                  <div className="text-center p-3 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border border-green-200">
                    <div className="inline-flex items-center gap-2 sm:gap-3 text-green-700 font-bold text-sm sm:text-base lg:text-lg">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      <span>Date sélectionnée: {formatDate(new Date(selectedDate))}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Time Selection */}
            {currentStep === 3 && (
              <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-3 sm:mb-6">
                    Choisissez l'heure
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-8 px-2">Sélectionnez le créneau horaire qui vous convient</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        relative p-3 sm:p-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform
                        ${selectedTime === time 
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg sm:shadow-xl scale-105 ring-2 sm:ring-4 ring-green-200' 
                          : 'bg-white text-gray-700 shadow-md hover:shadow-lg sm:hover:shadow-xl hover:scale-105 border border-gray-200 hover:border-green-300'
                        }
                      `}
                    >
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{time}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {selectedTime && (
                  <div className="text-center p-3 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border border-blue-200">
                    <div className="inline-flex items-center gap-2 sm:gap-3 text-blue-700 font-bold text-sm sm:text-base lg:text-lg">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      <span className="break-words">Créneau: {selectedTime} - {formatDate(new Date(selectedDate))}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-3 sm:mb-6">
                    Vos informations
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-8 px-2">Complétez vos détails pour finaliser la réservation</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="flex items-center gap-2 sm:gap-3 text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-green-400 focus:ring-2 sm:focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white/80 backdrop-blur text-sm sm:text-base"
                        placeholder="Votre nom"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 sm:gap-3 text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-green-400 focus:ring-2 sm:focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white/80 backdrop-blur text-sm sm:text-base"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 sm:gap-3 text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-green-400 focus:ring-2 sm:focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white/80 backdrop-blur text-sm sm:text-base"
                        placeholder="+212 6XX XXX XXX"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 sm:gap-3 text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                        <Music className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        Nom d'artiste
                      </label>
                      <input
                        type="text"
                        value={formData.artistName}
                        onChange={(e) => setFormData({...formData, artistName: e.target.value})}
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-green-400 focus:ring-2 sm:focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white/80 backdrop-blur text-sm sm:text-base"
                        placeholder="Votre nom de scène"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 sm:gap-3 text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                        Type de projet
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-green-400 focus:ring-2 sm:focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white/80 backdrop-blur text-sm sm:text-base"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="single">Single</option>
                        <option value="ep">EP</option>
                        <option value="album">Album</option>
                        <option value="demo">Demo</option>
                        <option value="mixtape">Mixtape</option>
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 sm:gap-3 text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                        Demandes spéciales
                      </label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                        rows={4}
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-green-400 focus:ring-2 sm:focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white/80 backdrop-blur resize-none text-sm sm:text-base"
                        placeholder="Décrivez votre projet, style musical, instruments nécessaires..."
                      />
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="lg:sticky lg:top-8">
                    <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                        Récapitulatif
                      </h3>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start justify-between p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-100">
                          <span className="font-semibold text-gray-600 text-sm sm:text-base">Services:</span>
                          <div className="text-right">
                            {selectedServices.map(serviceId => {
                              const service = services.find(s => s.id === serviceId);
                              return (
                                <div key={serviceId} className="font-bold text-gray-800 text-xs sm:text-sm">
                                  {service?.name}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-100">
                          <span className="font-semibold text-gray-600 text-sm sm:text-base">Date:</span>
                          <span className="font-bold text-gray-800 text-xs sm:text-sm text-right">{selectedDate && formatDate(new Date(selectedDate))}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-100">
                          <span className="font-semibold text-gray-600 text-sm sm:text-base">Heure:</span>
                          <span className="font-bold text-gray-800 text-xs sm:text-sm">{selectedTime}</span>
                        </div>
                        
                        <div className="flex items-start justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border border-green-200">
                          <span className="font-semibold text-green-700 text-sm sm:text-base">Prix:</span>
                          <div className="text-right">
                            {selectedServices.map(serviceId => {
                              const service = services.find(s => s.id === serviceId);
                              return (
                                <div key={serviceId} className="font-bold text-green-800 text-xs sm:text-sm">
                                  {service?.price}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Step */}
            {currentStep === 5 && (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 lg:mb-8 animate-bounce">
                  <Check className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-3 sm:mb-4">Réservation confirmée !</h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 lg:mb-8 px-4">Nous vous contacterons sous 24h pour confirmer votre session.</p>
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-white font-bold text-sm sm:text-base">
                  <span>Merci de votre confiance !</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200" style={{ marginTop: '12%' }}>
                <button
                  onClick={handleBack}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 bg-gray-600 text-white hover:bg-gray-700 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Retour
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={!isStepComplete(currentStep)}
                    className={`
                      w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300
                      ${!isStepComplete(currentStep) 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 hover:scale-105 shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    Suivant
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!isStepComplete(currentStep) || isSubmitting}
                    className={`
                      w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300
                      ${!isStepComplete(currentStep) || isSubmitting
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 hover:scale-105 shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">Envoi en cours...</span>
                        <span className="sm:hidden">Envoi...</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Confirmer la réservation</span>
                        <span className="sm:hidden">Confirmer</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-center mt-8 sm:mt-12 mx-3 sm:mx-4 p-4 sm:p-6 bg-white/60 backdrop-blur rounded-xl sm:rounded-2xl border border-gray-200/50 max-w-4xl lg:mx-auto">
        <p className="text-gray-600 font-medium text-sm sm:text-base">
          Questions? Contactez-nous: 
          <a href="tel:+212617869001" className="text-green-600 font-bold hover:text-green-700 transition-colors mx-1 sm:mx-2 block sm:inline">
            +212-617-869001
          </a>
          <span className="hidden sm:inline">|</span>
          <a href="mailto:contact@warddstudio.com" className="text-green-600 font-bold hover:text-green-700 transition-colors mx-1 sm:mx-2 block sm:inline">
            contact@warddstudio.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default BookingSystem;