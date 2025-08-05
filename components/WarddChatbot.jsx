import React, { useState, useEffect, useRef, useCallback } from 'react';

const WarddChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [userLanguage, setUserLanguage] = useState('');
  const [userName, setUserName] = useState('');
  const [conversationStep, setConversationStep] = useState('welcome');
  const [awaitingName, setAwaitingName] = useState(false);
  const [showLanguageButtons, setShowLanguageButtons] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Enhanced translations with Moroccan Darija
  const translations = {
    fr: {
      welcomeMessage: "🎵 Bienvenue chez Wardd Music!\n\nChoisissez votre langue préférée pour continuer:",
      askName: "Comment vous appelez-vous?",
      personalizedWelcome: "Parfait, {name}! Je suis votre assistant virtuel Wardd Music. Comment puis-je vous aider aujourd'hui?",
      location: "📍 Wardd Music Studio est situé à **Kénitra, Maroc**. Notre studio professionnel est équipé des dernières technologies pour vos enregistrements.\n\n🗺️ **Localisation exacte:** [Voir sur Google Maps](https://maps.google.com)\n\nVenez nous rendre visite!",
      pricing: "💰 **Nos Packs Studio:**\n\n🎓 **Pack Étudiant** - 700 DH\n• Enregistrement + Mixage + Mastering\n• Shooting offert + Contenu réseaux sociaux\n\n🎵 **Pack Professionnel** - 1100 DH\n• Tout du pack étudiant\n• Instru exclusif + Tuning vocal avancé\n\n⭐ **Pack Premium** - 1700 DH\n• Service complet premium\n• Instru non exclusif + Services avancés\n\n📋 **Pack Personnalisé** - Devis sur mesure",
      beats: "🎶 **Oui, nous créons des beats!**\n\nNos services incluent:\n• 🎹 Beatmaking professionnel\n• 🎵 Production musicale complète\n• 🎧 Instrumentaux exclusifs et non-exclusifs\n• 🎤 Composition sur mesure\n• 🎼 Ghost production\n\nNous travaillons dans tous les styles: Hip-Hop, R&B, Pop, Afro, Trap, et plus!",
      services: "🎯 **Nos Services Professionnels:**\n\n🎤 **Enregistrement** - Studio haute qualité\n🎛️ **Mixage** - Son professionnel\n🎵 **Mastering** - Finalisation radio-ready\n📸 **Shooting Photo/Vidéo** - Contenu pro\n📱 **Social Media Managing** - Gestion réseaux\n🎹 **Beatmaking** - Production originale\n🎼 **Composition** - Création sur mesure\n🎬 **Movie Soundtracks** - Musiques de films",
      booking: "📅 **Réservation de Studio:**\n\nVous pouvez réserver facilement:\n• 💻 **En ligne:** [Réserver maintenant](https://www.warddmusic.com/booking)\n• 📱 Via WhatsApp directement\n• ☎️ Par téléphone au +212-617-869001\n\nNous sommes ouverts du lundi au samedi, de 9h à 20h. Dimanche fermé.",
      artists: "🌟 **Nos Artistes:**\n\nNous avons travaillé avec de nombreux talents:\n• Medii, Youzar, Icy, Zhor\n• Lord Mehdi, Said Saviola, Anas Fahassa\n• Et bien d'autres artistes talentueux!\n\n🎵 Découvrez leurs créations sur nos réseaux sociaux et Spotify.",
      team: "👥 **Notre Équipe:**\n\n🎛️ **Aziz El Asmai** - Sound Engineer\n🎵 **Imran El Fakyr** - Producer\n\nUne équipe passionnée et expérimentée pour donner vie à vos projets musicaux!",
      contact: "📞 **Nous Contacter:**\n\n📱 **Téléphone:** +212-617-869001\n📧 **Email:** contact@warddstudio.com\n🌐 **Site Web:** warddstudio.com\n📍 **Localisation:** Kénitra, Maroc",
      defaultResponse: "🤔 Je ne suis pas sûr de comprendre votre question. Voici ce que je peux vous aider:\n\n• 📍 Localisation du studio\n• 💰 Tarifs et packs\n• 🎵 Production de beats\n• 🎤 Nos services\n• 📅 Réservations\n\nOu contactez-nous directement via WhatsApp pour une réponse personnalisée!",
      quickReplies: ["📍 Où êtes-vous?", "💰 Tarifs?", "🎵 Beats?", "🎤 Services?", "📅 Réserver?"],
      languageButtons: ["🇫🇷 Français", "🇬🇧 English", "🏛️ الدارجة", "🇸🇦 العربية"],
      placeholder: "Tapez votre message..."
    },
    en: {
      welcomeMessage: "🎵 Welcome to Wardd Music!\n\nChoose your preferred language to continue:",
      askName: "What's your name?",
      personalizedWelcome: "Perfect, {name}! I'm your Wardd Music virtual assistant. How can I help you today?",
      location: "📍 Wardd Music Studio is located in **Kenitra, Morocco**. Our professional studio is equipped with the latest technology for your recordings.\n\n🗺️ **Exact location:** [See on Google Maps](https://maps.google.com)\n\nCome visit us!",
      pricing: "💰 **Our Studio Packages:**\n\n🎓 **Student Pack** - 700 DH\n• Recording + Mixing + Mastering\n• Free Shooting + Social Media Content\n\n🎵 **Professional Pack** - 1100 DH\n• Everything from student pack\n• Exclusive beat + Advanced vocal tuning\n\n⭐ **Premium Pack** - 1700 DH\n• Complete premium service\n• Non-exclusive beat + Advanced services\n\n📋 **Custom Pack** - Custom quote",
      beats: "🎶 **Yes, we create beats!**\n\nOur services include:\n• 🎹 Professional beatmaking\n• 🎵 Complete music production\n• 🎧 Exclusive and non-exclusive instrumentals\n• 🎤 Custom composition\n• 🎼 Ghost production\n\nWe work in all styles: Hip-Hop, R&B, Pop, Afro, Trap, and more!",
      services: "🎯 **Our Professional Services:**\n\n🎤 **Recording** - High quality studio\n🎛️ **Mixing** - Professional sound\n🎵 **Mastering** - Radio-ready finalization\n📸 **Photo/Video Shooting** - Pro content\n📱 **Social Media Managing** - Network management\n🎹 **Beatmaking** - Original production\n🎼 **Composition** - Custom creation\n🎬 **Movie Soundtracks** - Film music",
      booking: "📅 **Studio Booking:**\n\nYou can easily book:\n• 💻 **Online:** [Book now](https://www.warddmusic.com/booking)\n• 📱 Via WhatsApp directly\n• ☎️ By phone at +212-617-869001\n\nWe're open Monday to Saturday, 9am to 8pm. Closed Sunday.",
      artists: "🌟 **Our Artists:**\n\nWe've worked with many talents:\n• Medii, Youzar, Icy, Zhor\n• Lord Mehdi, Said Saviola, Anas Fahassa\n• And many other talented artists!\n\n🎵 Discover their creations on our social media and Spotify.",
      team: "👥 **Our Team:**\n\n🎛️ **Aziz El Asmai** - Sound Engineer\n🎵 **Imran El Fakyr** - Producer\n\nA passionate and experienced team to bring your musical projects to life!",
      contact: "📞 **Contact Us:**\n\n📱 **Phone:** +212-617-869001\n📧 **Email:** contact@warddstudio.com\n🌐 **Website:** warddstudio.com\n📍 **Location:** Kenitra, Morocco",
      defaultResponse: "🤔 I'm not sure I understand your question. Here's what I can help you with:\n\n• 📍 Studio location\n• 💰 Rates and packages\n• 🎵 Beat production\n• 🎤 Our services\n• 📅 Bookings\n\nOr contact us directly via WhatsApp for a personalized response!",
      quickReplies: ["📍 Where are you?", "💰 Pricing?", "🎵 Beats?", "🎤 Services?", "📅 Book?"],
      languageButtons: ["🇫🇷 Français", "🇬🇧 English", "🏛️ الدارجة", "🇸🇦 العربية"],
      placeholder: "Type your message..."
    },
    darija: {
      welcomeMessage: "🎵 مرحبا بيك فـ وارد ميوزيك!\n\nاختار اللغة لي بغيتي تكمل بيها:",
      askName: "شنو سميتك؟",
      personalizedWelcome: "واخا، {name}! أنا المساعد ديالك فـ وارد ميوزيك. كيفاش نقدر نعاونك اليوم؟",
      location: "📍 استوديو وارد ميوزيك كاين فـ **القنيطرة، المغرب**. الاستوديو ديالنا مجهز بأحدث التقنيات باش نسجلو ليك.\n\n🗺️ **البلاصة بالضبط:** [شوف فـ خرائط جوجل](https://maps.google.com)\n\nتعال زورنا!",
      pricing: "💰 **الباقات ديالنا:**\n\n🎓 **باقة الطلبة** - 700 درهم\n• تسجيل + مكساج + ماسترينغ\n• تصوير مجاني + محتوى وسائل التواصل\n\n🎵 **الباقة المهنية** - 1100 درهم\n• كلشي من باقة الطلبة\n• بيت حصري + تحسين صوتي متقدم\n\n⭐ **الباقة المميزة** - 1700 درهم\n• خدمة مميزة كاملة\n• بيت مش حصري + خدمات متقدمة\n\n📋 **باقة مخصصة** - عرض سعر مخصص",
      beats: "🎶 **أيوا، كنصنعو البيتس!**\n\nالخدمات ديالنا:\n• 🎹 صناعة بيتس مهنية\n• 🎵 إنتاج موسيقي كامل\n• 🎧 آلات موسيقية حصرية ومش حصرية\n• 🎤 تأليف على المقاس\n• 🎼 إنتاج خفي\n\nكنخدمو فـ جميع الأنماط: هيب هوب، آر أند بي، بوب، أفرو، تراب، وبزاف!",
      services: "🎯 **الخدمات المهنية ديالنا:**\n\n🎤 **التسجيل** - استوديو عالي الجودة\n🎛️ **المكساج** - صوت مهني\n🎵 **الماسترينغ** - جاهز للإذاعة\n📸 **التصوير** - محتوى مهني\n📱 **إدارة وسائل التواصل** - إدارة الشبكات\n🎹 **صناعة البيتس** - إنتاج أصلي\n🎼 **التأليف** - إبداع مخصص\n🎬 **موسيقى الأفلام** - موسيقى سينمائية",
      booking: "📅 **حجز الاستوديو:**\n\nتقدر تحجز بسهولة:\n• 💻 **عبر الإنترنت:** [احجز دابا](https://www.warddmusic.com/booking)\n• 📱 عبر واتساب مباشرة\n• ☎️ بالتيليفون على +212-617-869001\n\nحنا مفتوحين من الاثنين للسبت، من 9 الصباح لـ 8 المساء. الأحد مسدود.",
      artists: "🌟 **الفنانين ديالنا:**\n\nخدمنا مع بزاف د المواهب:\n• مدي، يوزار، آيسي، زهور\n• لورد مهدي، سعيد سافيولا، أنس فحاصة\n• وبزاف د الفنانين الموهوبين!\n\n🎵 اكتشف الإبداعات ديالهم فـ وسائل التواصل وسبوتيفاي.",
      team: "👥 **الفريق ديالنا:**\n\n🎛️ **عزيز العصماي** - مهندس صوت\n🎵 **عمران الفقير** - منتج\n\nفريق شغوف وعندو خبرة باش يحيي المشاريع الموسيقية ديالك!",
      contact: "📞 **تواصل معانا:**\n\n📱 **التيليفون:** +212-617-869001\n📧 **الإيميل:** contact@warddstudio.com\n🌐 **الموقع:** warddstudio.com\n📍 **البلاصة:** القنيطرة، المغرب",
      defaultResponse: "🤔 ماشي متأكد فهمت السؤال ديالك. هاشنو نقدر نعاونك فيه:\n\n• 📍 بلاصة الاستوديو\n• 💰 الأسعار والباقات\n• 🎵 صناعة البيتس\n• 🎤 الخدمات ديالنا\n• 📅 الحجوزات\n\nأولا تواصل معانا مباشرة عبر واتساب باش نجاوبك شخصيا!",
      quickReplies: ["📍 فين نتوما؟", "💰 الأسعار؟", "🎵 البيتس؟", "🎤 الخدمات؟", "📅 حجز؟"],
      languageButtons: ["🇫🇷 Français", "🇬🇧 English", "🏛️ الدارجة", "🇸🇦 العربية"],
      placeholder: "كتب الرسالة ديالك..."
    },
    ar: {
      welcomeMessage: "🎵 أهلاً بك في وارد ميوزيك!\n\nاختر لغتك المفضلة للمتابعة:",
      askName: "ما اسمك؟",
      personalizedWelcome: "ممتاز، {name}! أنا مساعدك الافتراضي في وارد ميوزيك. كيف يمكنني مساعدتك اليوم؟",
      location: "📍 استوديو وارد ميوزيك يقع في **القنيطرة، المغرب**. استوديونا المهني مجهز بأحدث التقنيات لتسجيلاتك.\n\n🗺️ **الموقع الدقيق:** [شاهد على خرائط جوجل](https://maps.google.com)\n\nتعال لزيارتنا!",
      pricing: "💰 **باقات الاستوديو:**\n\n🎓 **باقة الطلاب** - 700 درهم\n• تسجيل + مكساج + ماسترينغ\n• تصوير مجاني + محتوى وسائل التواصل\n\n🎵 **الباقة المهنية** - 1100 درهم\n• كل شيء من باقة الطلاب\n• بيت حصري + ضبط صوتي متقدم\n\n⭐ **الباقة المميزة** - 1700 درهم\n• خدمة مميزة كاملة\n• بيت غير حصري + خدمات متقدمة\n\n📋 **باقة مخصصة** - عرض سعر مخصص",
      beats: "🎶 **نعم، نحن ننتج البيتس!**\n\nخدماتنا تشمل:\n• 🎹 إنتاج بيتس مهني\n• 🎵 إنتاج موسيقي كامل\n• 🎧 آلات موسيقية حصرية وغير حصرية\n• 🎤 تأليف مخصص\n• 🎼 إنتاج خفي\n\nنعمل في جميع الأنماط: هيب هوب، آر أند بي، بوب، أفرو، تراب، والمزيد!",
      services: "🎯 **خدماتنا المهنية:**\n\n🎤 **التسجيل** - استوديو عالي الجودة\n🎛️ **المكساج** - صوت مهني\n🎵 **الماسترينغ** - الانتهاء جاهز للإذاعة\n📸 **التصوير الفوتوغرافي/الفيديو** - محتوى مهني\n📱 **إدارة وسائل التواصل** - إدارة الشبكات\n🎹 **صناعة البيتس** - إنتاج أصلي\n🎼 **التأليف** - إبداع مخصص\n🎬 **موسيقى الأفلام** - موسيقى سينمائية",
      booking: "📅 **حجز الاستوديو:**\n\nيمكنك الحجز بسهولة:\n• 💻 **عبر الإنترنت:** [احجز الآن](https://www.warddmusic.com/booking)\n• 📱 عبر واتساب مباشرة\n• ☎️ بالهاتف على +212-617-869001\n\nنحن مفتوحون من الاثنين إلى السبت، من 9 صباحاً إلى 8 مساءً. مغلق الأحد.",
      artists: "🌟 **فنانونا:**\n\nعملنا مع العديد من المواهب:\n• مدي، يوزار، آيسي، زهور\n• لورد مهدي، سعيد سافيولا، أنس فحاصة\n• والعديد من الفنانين الموهوبين الآخرين!\n\n🎵 اكتشف إبداعاتهم على وسائل التواصل الاجتماعي وسبوتيفاي.",
      team: "👥 **فريقنا:**\n\n🎛️ **عزيز العصماي** - مهندس صوت\n🎵 **عمران الفقير** - منتج\n\nفريق شغوف وذو خبرة لإحياء مشاريعك الموسيقية!",
      contact: "📞 **اتصل بنا:**\n\n📱 **الهاتف:** +212-617-869001\n📧 **البريد الإلكتروني:** contact@warddstudio.com\n🌐 **الموقع:** warddstudio.com\n📍 **الموقع:** القنيطرة، المغرب",
      defaultResponse: "🤔 لست متأكداً من فهم سؤالك. إليك ما يمكنني مساعدتك فيه:\n\n• 📍 موقع الاستوديو\n• 💰 الأسعار والباقات\n• 🎵 إنتاج البيتس\n• 🎤 خدماتنا\n• 📅 الحجوزات\n\nأو تواصل معنا مباشرة عبر واتساب للحصول على رد شخصي!",
      quickReplies: ["📍 أين أنتم؟", "💰 الأسعار؟", "🎵 البيتس؟", "🎤 الخدمات؟", "📅 حجز؟"],
      languageButtons: ["🇫🇷 Français", "🇬🇧 English", "🏛️ الدارجة", "🇸🇦 العربية"],
      placeholder: "اكتب رسالتك..."
    }
  };

  // Optimized knowledge base with multi-language keywords
  const knowledgeBase = {
    location: {
      keywords: ['où', 'adresse', 'localisation', 'lieu', 'situé', 'studio', 'position', 'map', 'carte', 
                'where', 'address', 'location', 'place', 'situated', 
                'أين', 'عنوان', 'موقع', 'مكان', 'استوديو',
                'فين', 'بلاصة', 'وين'],
      hasWhatsApp: true,
      hasLocation: true
    },
    pricing: {
      keywords: ['prix', 'tarif', 'coût', 'combien', 'session', 'pack', 'étudiant', 'professionnel', 'premium',
                'price', 'cost', 'how much', 'package', 'student', 'professional',
                'سعر', 'تكلفة', 'كم', 'باقة', 'طلاب', 'مهني',
                'شحال', 'فلوس', 'تمن'],
      hasWhatsApp: true
    },
    beats: {
      keywords: ['beat', 'instru', 'instrumental', 'production', 'beatmaking', 'musique', 'son',
                'music', 'sound',
                'بيت', 'موسيقى', 'إنتاج', 'صوت'],
      hasWhatsApp: true
    },
    services: {
      keywords: ['service', 'enregistrement', 'mixage', 'mastering', 'shooting', 'que faites', 'proposez',
                'recording', 'mixing', 'what do you do',
                'خدمة', 'تسجيل', 'مكساج', 'ماذا تفعلون',
                'خدمات', 'اشنو كتديرو'],
      hasWhatsApp: true
    },
    booking: {
      keywords: ['réserver', 'rendez-vous', 'booking', 'disponibilité', 'réservation', 'session',
                'book', 'appointment', 'availability',
                'حجز', 'موعد', 'توفر',
                'نحجز', 'موعد'],
      hasWhatsApp: true,
      hasBooking: true
    },
    artists: {
      keywords: ['artiste', 'qui', 'travaillé', 'clients', 'références', 'collaboration',
                'artist', 'who', 'worked', 'clients', 'references',
                'فنان', 'من', 'عملتم', 'عملاء',
                'فنانين', 'شكون'],
      hasWhatsApp: false
    },
    team: {
      keywords: ['équipe', 'producteur', 'ingénieur', 'aziz', 'imran', 'qui travaille',
                'team', 'producer', 'engineer', 'who works',
                'فريق', 'منتج', 'مهندس', 'من يعمل',
                'شكون كيخدم'],
      hasWhatsApp: false
    },
    contact: {
      keywords: ['contact', 'téléphone', 'numéro', 'email', 'joindre', 'appeler',
                'phone', 'number', 'call',
                'تواصل', 'هاتف', 'رقم', 'اتصال',
                'كيفاش نتواصل', 'تيليفون'],
      hasWhatsApp: true
    }
  };

  // Memoized functions for better performance
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const addBotMessage = useCallback((text, hasWhatsApp = false, hasLocation = false, hasBooking = false, showLanguageSelect = false) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      text,
      isBot: true,
      timestamp: new Date(),
      hasWhatsApp,
      hasLocation,
      hasBooking,
      showLanguageSelect
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const addUserMessage = useCallback((text) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const findBestMatch = useCallback((userInput) => {
    const input = userInput.toLowerCase();
    let bestMatch = null;
    let maxMatches = 0;

    Object.entries(knowledgeBase).forEach(([key, data]) => {
      const matches = data.keywords.filter(keyword => 
        input.includes(keyword.toLowerCase())
      ).length;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = { ...data, type: key };
      }
    });

    return bestMatch;
  }, []);

  const getQuickReplies = useCallback(() => {
    const lang = userLanguage || 'fr';
    return [
      { text: translations[lang].quickReplies[0], key: "location" },
      { text: translations[lang].quickReplies[1], key: "pricing" },
      { text: translations[lang].quickReplies[2], key: "beats" },
      { text: translations[lang].quickReplies[3], key: "services" },
      { text: translations[lang].quickReplies[4], key: "booking" }
    ];
  }, [userLanguage]);

  // Effects
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Modified welcome message to start with language selection
  useEffect(() => {
    if (isOpen && messages.length === 0 && conversationStep === 'welcome') {
      setTimeout(() => {
        addBotMessage(translations.fr.welcomeMessage, false, false, false, true);
        setShowLanguageButtons(true);
        setConversationStep('selectLanguage');
      }, 500);
    }
  }, [isOpen, messages.length, conversationStep, addBotMessage]);

  const handleLanguageSelection = useCallback((language) => {
    const langCode = language.includes('Français') ? 'fr' : 
                    language.includes('English') ? 'en' : 
                    language.includes('الدارجة') ? 'darija' : 'ar';
    
    setUserLanguage(langCode);
    setShowLanguageButtons(false);
    addUserMessage(language);
    
    setTimeout(() => {
      addBotMessage(translations[langCode].askName);
      setConversationStep('askName');
      setAwaitingName(true);
    }, 500);
  }, [addUserMessage, addBotMessage]);

  const handleSendMessage = useCallback((text = inputText) => {
    if (!text.trim()) return;

    // Handle name input
    if (awaitingName && conversationStep === 'askName') {
      setUserName(text.trim());
      addUserMessage(text);
      setInputText('');
      setAwaitingName(false);
      setIsTyping(true);

      setTimeout(() => {
        const welcomeMsg = translations[userLanguage].personalizedWelcome.replace('{name}', text.trim());
        addBotMessage(welcomeMsg);
        setConversationStep('chat');
        setShowQuickReplies(true);
        setIsTyping(false);
      }, 1000);
      return;
    }

    // Normal chat flow
    if (conversationStep === 'chat') {
      addUserMessage(text);
      setInputText('');
      setIsTyping(true);
      setShowQuickReplies(false);

      setTimeout(() => {
        const match = findBestMatch(text);
        const lang = userLanguage || 'fr';
        
        if (match) {
          const response = translations[lang][match.type];
          addBotMessage(response, match.hasWhatsApp, match.hasLocation, match.hasBooking);
        } else {
          addBotMessage(translations[lang].defaultResponse, true);
        }
        setIsTyping(false);
        setShowQuickReplies(true);
      }, 1500);
    }
  }, [inputText, awaitingName, conversationStep, userLanguage, addUserMessage, addBotMessage, findBestMatch]);

  const handleQuickReply = useCallback((reply) => {
    handleSendMessage(reply.text);
  }, [handleSendMessage]);

  const openWhatsApp = useCallback(() => {
    const phoneNumber = "212617869001";
    const message = userLanguage === 'darija' ? 
      "السلام! بغيت نعرف أكثر على الخدمات ديالكم فـ وارد ميوزيك." :
      userLanguage === 'ar' ? 
      "السلام عليكم! أريد معرفة المزيد عن خدماتكم في وارد ميوزيك." :
      userLanguage === 'en' ?
      "Hi Wardd Music! I'd like to know more about your services." :
      "Salut Wardd Music! J'aimerais avoir plus d'informations sur vos services.";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [userLanguage]);

  const openGoogleMaps = useCallback(() => {
    const mapsUrl = "https://www.google.com/maps?ll=34.261911,-6.584118&z=15&t=m&hl=en&gl=MA&mapclient=embed&cid=1333065819772539135";
    window.open(mapsUrl, '_blank');
  }, []);

  const openBookingPage = useCallback(() => {
    const bookingUrl = "https://www.warddmusic.com/booking";
    window.open(bookingUrl, '_blank');
  }, []);

  const formatTime = useCallback((date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[9997] bg-black/10 backdrop-blur-sm"></div>
      )}

      {/* Chat Button */}
      <div 
        className={`fixed bottom-6 right-6 z-[9999] ${isOpen ? 'scale-95' : 'scale-100'} transition-all duration-300 ease-out`}
        onClick={toggleChat}
      >
        <div className="relative">
          {/* Main Button */}
          <div className={`
            w-16 h-16 rounded-2xl cursor-pointer transition-all duration-500 ease-out shadow-2xl
            ${isOpen 
              ? 'bg-gradient-to-br from-red-500 to-red-600 rotate-45' 
              : 'bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 hover:scale-110 hover:rotate-12'
            }
            flex items-center justify-center group relative overflow-hidden
          `}>
            {/* Background Glow */}
            <div className={`
              absolute inset-0 rounded-2xl transition-all duration-500
              ${isOpen 
                ? 'bg-gradient-to-br from-red-400/20 to-red-600/20' 
                : 'bg-gradient-to-br from-green-400/20 to-emerald-600/20'
              }
              blur-xl scale-150 opacity-0 group-hover:opacity-100
            `}></div>

            {/* Icon */}
            <div className={`relative z-10 transition-all duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
              {isOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="transform rotate-45">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 8C9.79 8 8 9.79 8 12S9.79 16 12 16 16 14.21 16 12 14.21 8 12 8Z"/>
                </svg>
              )}
            </div>

            {/* Pulse Animation */}
            {!isOpen && (
              <div className="absolute inset-0 rounded-2xl bg-green-400 animate-ping opacity-20"></div>
            )}
          </div>

          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
          )}

          {/* Floating Label */}
          {!isOpen && (
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg animate-pulse">
              Assistant Wardd AI
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[650px] bg-white rounded-3xl shadow-2xl z-[9998] overflow-hidden transform transition-all duration-500 ease-out scale-100 opacity-100 border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="relative h-20 bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900 flex items-center px-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-600/10 animate-pulse"></div>
            
            <div className="relative z-10 flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg">Wardd AI</h3>
                <p className="text-green-300 text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  {userLanguage === 'darija' ? 'متصل' : 
                   userLanguage === 'ar' ? 'متصل' : 
                   userLanguage === 'en' ? 'Online' : 'En ligne'}
                </p>
              </div>
            </div>

            <button 
              onClick={toggleChat}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fadeIn`}>
                <div className={`max-w-xs lg:max-w-md ${message.isBot ? 'order-2' : 'order-1'}`}>
                  {message.isBot && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"/>
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Wardd AI</span>
                    </div>
                  )}

                  <div className={`
                    relative px-4 py-3 rounded-2xl shadow-md max-w-full
                    ${message.isBot 
                      ? 'bg-white border border-gray-200 text-gray-800' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white ml-auto'
                    }
                  `}>
                    {/* Message Content */}
                    <div className="text-sm leading-relaxed whitespace-pre-line">
                      {message.text.split('**').map((part, index) => 
                        index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                      )}
                    </div>

                    {/* Language Selection Buttons */}
                    {showLanguageButtons && conversationStep === 'selectLanguage' && message.isBot && (
                      <div className="flex flex-col gap-2 mt-3">
                        {translations.fr.languageButtons.map((language, index) => (
                          <button
                            key={index}
                            onClick={() => handleLanguageSelection(language)}
                            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                          >
                            {language}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    {(message.hasWhatsApp || message.hasLocation || message.hasBooking) && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.hasWhatsApp && (
                          <button 
                            onClick={openWhatsApp}
                            className="inline-flex items-center px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488"/>
                            </svg>
                            WhatsApp
                          </button>
                        )}
                        {message.hasLocation && (
                          <button 
                            onClick={openGoogleMaps}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            {userLanguage === 'darija' ? 'الخريطة' : 
                             userLanguage === 'ar' ? 'الخريطة' : 
                             userLanguage === 'en' ? 'Maps' : 'Maps'}
                          </button>
                        )}
                        {message.hasBooking && (
                          <button 
                            onClick={openBookingPage}
                            className="inline-flex items-center px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium rounded-lg transition-colors"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                            </svg>
                            {userLanguage === 'darija' ? 'حجز' : 
                             userLanguage === 'ar' ? 'حجز' : 
                             userLanguage === 'en' ? 'Book' : 'Réserver'}
                          </button>
                        )}
                      </div>
                    )}

                    <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-400' : 'text-green-100'}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Wardd AI</span>
                </div>
                <div className="max-w-xs lg:max-w-md">
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {showQuickReplies && conversationStep === 'chat' && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex flex-wrap gap-2">
                {getQuickReplies().map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-2 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-200 transform hover:scale-105"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={userLanguage ? translations[userLanguage].placeholder : translations.fr.placeholder}
                  disabled={isTyping || showLanguageButtons}
                  className="w-full pl-4 pr-12 py-3 bg-gray-100 border-0 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all disabled:opacity-50"
                />
                {inputText && (
                  <button
                    onClick={() => setInputText('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
                    </svg>
                  </button>
                )}
              </div>
              
              <button 
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping || showLanguageButtons}
                className={`
                  p-3 rounded-2xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                  ${inputText.trim() && !isTyping && !showLanguageButtons
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg' 
                    : 'bg-gray-200'
                  }
                `}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={inputText.trim() && !isTyping && !showLanguageButtons ? "white" : "#9CA3AF"}>
                  <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }

        .overflow-y-auto {
          scrollbar-width: none;
        }

        @media (max-width: 640px) {
          .fixed.bottom-24.right-6 {
            bottom: 90px;
            right: 16px;
            left: 16px;
            width: auto;
            max-height: 70vh;
          }
          
          .fixed.bottom-6.right-6 {
            bottom: 20px;
            right: 20px;
          }
        }

        @media (max-width: 480px) {
          .fixed.bottom-24.right-6 {
            bottom: 80px;
            right: 12px;
            left: 12px;
            height: 75vh;
            max-height: 75vh;
          }
          
          .fixed.bottom-6.right-6 {
            bottom: 16px;
            right: 16px;
          }
          
          .w-16.h-16 {
            width: 56px;
            height: 56px;
          }
          
          .absolute.right-20 {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default WarddChatbot;