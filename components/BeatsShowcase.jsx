import React, { useState, useRef, useEffect } from 'react';

const BeatsShowcase = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [isPlaying, setIsPlaying] = useState(null);
  const [currentTime, setCurrentTime] = useState({});
  const audioRefs = useRef({});

  // Sample beats data with real open-source audio files
  const beats = [
    {
      id: 1,
      title: "Dark Nights",
      producer: "808sycko (Imran)",
      genre: "drill",
      bpm: 140,
      key: "C minor",
      duration: "2:45",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Free sound
      price: "50€",
      tags: ["Dark", "Heavy", "Drill"],
      mood: "aggressive",
      description: "Sombre et percutant, parfait pour un flow agressif"
    },
    {
      id: 2,
      title: "Summer Vibes",
      producer: "beamsounds (Aziz)",
      genre: "pop",
      bpm: 128,
      key: "G major",
      duration: "3:12",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      price: "45€",
      tags: ["Uplifting", "Bright", "Pop"],
      mood: "happy",
      description: "Ensoleillé et entraînant, idéal pour les hits d'été"
    },
    {
      id: 3,
      title: "UK Streets",
      producer: "808sycko (Imran)",
      genre: "uk-garage",
      bpm: 130,
      key: "F# minor",
      duration: "2:38",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      price: "55€",
      tags: ["Garage", "UK", "Underground"],
      mood: "energetic",
      description: "Groovy et authentique, l'essence du UK Garage"
    },
    {
      id: 4,
      title: "Trap King",
      producer: "beamsounds (Aziz)",
      genre: "trap",
      bpm: 150,
      key: "Bb minor",
      duration: "2:55",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      price: "60€",
      tags: ["Hard", "808s", "Trap"],
      mood: "aggressive",
      description: "808s puissantes et hi-hats rapides, du pur Trap"
    },
    {
      id: 5,
      title: "Smooth Jazz",
      producer: "808sycko (Imran)",
      genre: "pop",
      bpm: 95,
      key: "D major",
      duration: "3:45",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      price: "40€",
      tags: ["Jazz", "Smooth", "Chill"],
      mood: "chill",
      description: "Doux et sophistiqué, influences jazz modernes"
    },
    {
      id: 6,
      title: "Drill Sergeant",
      producer: "beamsounds (Aziz)",
      genre: "drill",
      bpm: 145,
      key: "E minor",
      duration: "2:30",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      price: "65€",
      tags: ["Aggressive", "Hard", "Drill"],
      mood: "aggressive",
      description: "Brutal et sans compromis, drill authentique"
    },
    {
      id: 7,
      title: "Midnight Drive",
      producer: "808sycko (Imran)",
      genre: "trap",
      bpm: 135,
      key: "A minor",
      duration: "3:20",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      price: "55€",
      tags: ["Atmospheric", "Night", "Trap"],
      mood: "mysterious",
      description: "Mystérieux et envoûtant, parfait pour la nuit"
    },
    {
      id: 8,
      title: "London Calling",
      producer: "beamsounds (Aziz)",
      genre: "uk-garage",
      bpm: 132,
      key: "C major",
      duration: "2:48",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      price: "50€",
      tags: ["UK", "Garage", "Classic"],
      mood: "energetic",
      description: "Hommage aux classiques du UK Garage londonien"
    }
  ];

  const genres = [
    { id: 'all', name: 'Tous les genres', count: beats.length },
    { id: 'pop', name: 'Pop', count: beats.filter(b => b.genre === 'pop').length },
    { id: 'drill', name: 'Drill', count: beats.filter(b => b.genre === 'drill').length },
    { id: 'uk-garage', name: 'UK Garage', count: beats.filter(b => b.genre === 'uk-garage').length },
    { id: 'trap', name: 'Trap', count: beats.filter(b => b.genre === 'trap').length }
  ];

  const filteredBeats = selectedGenre === 'all' 
    ? beats 
    : beats.filter(beat => beat.genre === selectedGenre);

  const handlePlayPause = (beatId) => {
    const audio = audioRefs.current[beatId];
    
    if (isPlaying === beatId) {
      audio?.pause();
      setIsPlaying(null);
    } else {
      // Stop all other playing beats
      Object.entries(audioRefs.current).forEach(([id, audioEl]) => {
        if (audioEl && !audioEl.paused && id !== beatId.toString()) {
          audioEl.pause();
        }
      });
      
      if (audio) {
        audio.play();
        setIsPlaying(beatId);
      }
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'aggressive': return 'from-red-500 to-orange-600';
      case 'happy': return 'from-yellow-400 to-orange-500';
      case 'energetic': return 'from-blue-500 to-purple-600';
      case 'chill': return 'from-green-400 to-blue-500';
      case 'mysterious': return 'from-purple-600 to-gray-800';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getKeyColor = (key) => {
    return key.includes('minor') ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800';
  };

  useEffect(() => {
    // Initialize audio elements
    beats.forEach(beat => {
      if (!audioRefs.current[beat.id]) {
        const audio = new Audio(beat.audioUrl);
        audio.addEventListener('ended', () => setIsPlaying(null));
        audio.addEventListener('loadstart', () => {
          // Handle loading
        });
        audioRefs.current[beat.id] = audio;
      }
    });

    return () => {
      // Cleanup
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.removeEventListener('ended', () => setIsPlaying(null));
        }
      });
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden" id="beats">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-green-600 bg-green-50 px-6 py-3 rounded-full uppercase tracking-wider border border-green-200" style={{fontFamily: 'Sequel Bold'}}>
              Nos Productions Exclusives
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-green-600 bg-clip-text text-transparent" style={{fontFamily: 'Sequel Bold'}}>
            Beats Wardd
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed" style={{fontFamily: 'Nexa bold'}}>
            Collection exclusive de beats de haute qualité pour tous vos projets musicaux.
          </p>

          {/* Floating Music Notes Animation */}
          <div className="relative w-full h-20 mb-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-green-400 text-2xl opacity-30 animate-float"
                style={{
                  left: `${15 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                ♪
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs - Enhanced Design */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`
                group relative px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 transform hover:scale-105
                ${selectedGenre === genre.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-green-50 border border-gray-200 hover:border-green-300 shadow-md'
                }
              `}
              style={{fontFamily: 'Sequel Bold'}}
            >
              <div className="flex items-center gap-3">
                <span>{genre.name}</span>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-bold transition-all duration-300
                  ${selectedGenre === genre.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-green-100 text-green-700 group-hover:bg-green-200'
                  }
                `}>
                  {genre.count}
                </span>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-green-400/5 to-emerald-600/5"></div>
            </button>
          ))}
        </div>

        {/* Producers Showcase - Enhanced */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                    <span className="text-white font-black text-xl">808</span>
                  </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-3xl font-black text-green-400 mb-2" style={{fontFamily: 'Sequel Bold'}}>50+</div>
                    <div className="text-gray-400 text-sm" style={{fontFamily: 'Nexa bold'}}>Beats Créés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-green-400 mb-2" style={{fontFamily: 'Sequel Bold'}}>100%</div>
                    <div className="text-gray-400 text-sm" style={{fontFamily: 'Nexa bold'}}>Satisfaction</div>
                  </div>
                </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-2xl mb-1" style={{fontFamily: 'Sequel Bold'}}>
                    808sycko
                  </h3>
                  <p className="text-green-600 font-bold" style={{fontFamily: 'Nexa bold'}}>
                    Imran • Producer • Beatmaker
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4" style={{fontFamily: 'Nexa bold'}}>
                Maître des productions <strong>Drill</strong>, <strong>Trap</strong> et <strong>Hip-Hop</strong>. 
                Spécialiste des 808s dévastatrices et des mélodies hypnotiques qui marquent les esprits.
              </p>
              <div className="flex gap-2">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">Drill Expert</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">808 Master</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                    <span className="text-white font-black text-xl">BS</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-2xl mb-1" style={{fontFamily: 'Sequel Bold'}}>
                    beamsounds
                  </h3>
                  <p className="text-blue-600 font-bold" style={{fontFamily: 'Nexa bold'}}>
                    Aziz • Producer • Sound Engineer
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4" style={{fontFamily: 'Nexa bold'}}>
                Virtuose du <strong>Pop</strong>, <strong>R&B</strong> et <strong>UK Garage</strong>. 
                Créateur de sonorités modernes et intemporelles qui transcendent les époques.
              </p>
              <div className="flex gap-2">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">Pop Genius</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">UK Garage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Beats Grid - Ultra Creative Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredBeats.map((beat, index) => (
            <div
              key={beat.id}
              className="relative group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-br ${getMoodColor(beat.mood)} rounded-3xl blur-xl opacity-0 
                group-hover:opacity-20 transition-all duration-700 transform group-hover:scale-110
              `}></div>
              
              {/* Main Card */}
              <div className="relative bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                
                {/* Header with Mood Gradient */}
                <div className={`h-3 bg-gradient-to-r ${getMoodColor(beat.mood)}`}></div>
                
                <div className="p-8">
                  {/* Beat Title & Producer */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="font-black text-gray-900 text-xl mb-2 group-hover:text-green-600 transition-colors duration-300" style={{fontFamily: 'Sequel Bold'}}>
                        {beat.title}
                      </h3>
                      <p className="text-gray-600 font-bold" style={{fontFamily: 'Nexa bold'}}>
                        by {beat.producer}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-green-600" style={{fontFamily: 'Sequel Bold'}}>
                        {beat.price}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 italic" style={{fontFamily: 'Nexa bold'}}>
                    "{beat.description}"
                  </p>

                  {/* Enhanced Waveform */}
                  <div className="mb-6 relative">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl h-20 flex items-center justify-center relative overflow-hidden border border-gray-200">
                      <div className={`
                        absolute inset-0 bg-gradient-to-r ${getMoodColor(beat.mood)} opacity-10
                        ${isPlaying === beat.id ? 'animate-pulse' : ''}
                      `}></div>
                      <div className="flex items-end space-x-1 h-16 relative z-10">
                        {[...Array(50)].map((_, i) => (
                          <div
                            key={i}
                            className={`
                              rounded-sm transition-all duration-200 transform
                              ${isPlaying === beat.id 
                                ? 'bg-gradient-to-t from-green-500 to-green-400' 
                                : 'bg-gradient-to-t from-gray-400 to-gray-300'
                              }
                            `}
                            style={{
                              width: '2px',
                              height: `${Math.random() * 100}%`,
                              animation: isPlaying === beat.id ? `bounce ${Math.random() * 0.8 + 0.5}s infinite` : 'none',
                              animationDelay: `${i * 0.05}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Beat Info Grid - Enhanced */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border border-gray-200">
                      <p className="text-gray-500 text-xs mb-1 font-bold" style={{fontFamily: 'Nexa bold'}}>BPM</p>
                      <p className="text-gray-900 font-black text-lg" style={{fontFamily: 'Sequel Bold'}}>{beat.bpm}</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border border-gray-200">
                      <p className="text-gray-500 text-xs mb-1 font-bold" style={{fontFamily: 'Nexa bold'}}>Durée</p>
                      <p className="text-gray-900 font-black text-lg" style={{fontFamily: 'Sequel Bold'}}>{beat.duration}</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border border-gray-200">
                      <p className="text-gray-500 text-xs mb-1 font-bold" style={{fontFamily: 'Nexa bold'}}>Tonalité</p>
                      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-bold ${getKeyColor(beat.key)}`}>
                        {beat.key}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {beat.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 px-3 py-1 rounded-full border border-gray-200 font-bold"
                        style={{fontFamily: 'Nexa bold'}}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons - Enhanced */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePlayPause(beat.id)}
                      className={`
                        flex-1 py-4 px-6 rounded-2xl font-black text-sm transition-all duration-500 transform hover:scale-105 relative overflow-hidden group
                        ${isPlaying === beat.id
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl'
                          : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:from-green-50 hover:to-emerald-50 hover:text-green-700 border border-gray-200 hover:border-green-300'
                        }
                      `}
                      style={{fontFamily: 'Sequel Bold'}}
                    >
                      <div className="flex items-center justify-center gap-3 relative z-10">
                        {isPlaying === beat.id ? (
                          <>
                            <div className="w-5 h-5 flex items-center justify-center">
                              <div className="flex gap-1">
                                <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
                                <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                            <span>En cours...</span>
                          </>
                        ) : (
                          <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                            </svg>
                            <span>Écouter</span>
                          </>
                        )}
                      </div>
                      
                      {/* Button Glow Effect */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-2xl
                        ${isPlaying === beat.id ? 'animate-pulse' : ''}
                      `}></div>
                    </button>

                    <button
                      className="py-4 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-black text-sm transition-all duration-500 transform hover:scale-105 hover:from-gray-800 hover:to-gray-700 shadow-lg hover:shadow-xl relative overflow-hidden group"
                      style={{fontFamily: 'Sequel Bold'}}
                    >
                      <div className="relative z-10">
                        Acheter
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-2xl"></div>
                    </button>
                  </div>
                </div>

                {/* Genre Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`
                    inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider
                    ${beat.genre === 'drill' ? 'bg-red-500 text-white' :
                      beat.genre === 'trap' ? 'bg-purple-500 text-white' :
                      beat.genre === 'pop' ? 'bg-yellow-500 text-white' :
                      beat.genre === 'uk-garage' ? 'bg-blue-500 text-white' :
                      'bg-gray-500 text-white'
                    }
                  `}>
                    {beat.genre.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-green-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 lg:p-16 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-green-400" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                      <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl lg:text-4xl font-black text-white mb-2" style={{fontFamily: 'Sequel Bold'}}>
                      Beat Sur Mesure ?
                    </h3>
                    <p className="text-green-400 font-bold text-lg" style={{fontFamily: 'Nexa bold'}}>
                      Créons ensemble votre son unique
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-12 max-w-3xl mx-auto text-lg leading-relaxed" style={{fontFamily: 'Nexa bold'}}>
                  Nos producteurs créent des instrumentales exclusives adaptées à votre style et vision artistique. 
                  Du concept à la livraison finale, nous transformons vos idées en chef-d'œuvre sonore.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a
                    href="/booking"
                    className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl inline-flex items-center justify-center gap-3 relative overflow-hidden"
                    style={{fontFamily: 'Sequel Bold'}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative z-10 flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                      <span>Réserver une Session</span>
                    </div>
                  </a>
                  
                  <a
                    href="https://wa.me/212617869001?text=Salut! Je suis intéressé par vos beats personnalisés et votre catalogue exclusif."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-black text-lg transition-all duration-500 transform hover:scale-110 hover:bg-white hover:text-gray-900 border border-white/20 hover:border-white inline-flex items-center justify-center gap-3 relative overflow-hidden"
                    style={{fontFamily: 'Sequel Bold'}}
                  >
                    <div className="relative z-10 flex items-center gap-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488"/>
                      </svg>
                      <span>Discutons sur WhatsApp</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BeatsShowcase;