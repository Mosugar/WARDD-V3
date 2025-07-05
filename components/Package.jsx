import { useState } from "react";
import style from "@/styles/package.module.css";
import Image from "next/image";

const Package = () => {
  const [activeService, setActiveService] = useState("RECORDING");

  const services = [
    {
      id: "RECORDING",
      name: "RECORDING", 
      number: "01",
      videoUrl: "https://www.youtube.com/embed/fWlUmFIdGnA?si=AoUaX3mgeUwhX6Ej"
    },
    {
      id: "MIXAGE",
      name: "MIXAGE",
      number: "02",
      videoUrl: "https://www.youtube.com/embed/3qLFE-tx5ec?si=6Ok3tAMW1tjdlZL7"
    },
    {
      id: "BEATMAKING",
      name: "BEATMAKING", 
      number: "03",
      videoUrl: "https://www.youtube.com/embed/S6HAWKi81bs?si=SFV8sw9Cr77-65c3"
    },
    {
      id: "PRODUCING",
      name: "PRODUCING",
      number: "04",
      videoUrl: "https://www.youtube.com/embed/iAKam37eHYM?si=maHdEj2InbZYi-_X"
    },
    {
      id: "GHOST_PRODUCTION", 
      name: "GHOST PRODUCTION",
      number: "05",
      videoUrl: "https://www.youtube.com/embed/HYtqFjUIh8Q?si=MfFj-Hnh20_vedha"
    },
    {
      id: "COMPOSITION", 
      name: "COMPOSITION",
      number: "06",
      videoUrl: "https://www.youtube.com/embed/927oWsK59Zk?si=7clUil03TcO18oMV"
    },
    {
      id: "VOICE_DUBBING",
      name: "VOICE DUBBING",
      number: "07", 
      videoUrl: "https://www.youtube.com/embed/8uT34tiBPR4?si=BMU1nZ6XIecNtDmk"
    },
    {
      id: "MOVIE_SOUNDTRACKS",
      name: "MOVIE SOUNDTRACKS",
      number: "08",
      videoUrl: "https://www.youtube.com/embed/E_59pKMr5Cs?si=rgxGxe1q2Bfhcj3I"
    }
  ];

  const packs = [
    {
      pack: "PACK ÉTUDIANT",
      email: "mailto:contact@warddstudio.com?subject=Pack%20Etudiant",
      features: [
        "Enregistrement",
        "Mixage", 
        "Mastering",
        "Shooting (Offert)",
        "Contenu vidéo pour réseaux sociaux",
        "Instru non exclusif"
      ]
    },
    {
      pack: "PACK PREMIUM", 
      email: "mailto:contact@warddstudio.com?subject=Pack%20Premium",
      features: [
        "Enregistrement",
        "Mixage",
        "Mastering",
        "Shooting (Offert)",
        "Contenu vidéo pour réseaux sociaux",
        "Instru non exclusif",
        "Tuning vocal avancé"
      ]
    },
    {
      pack: "PACK BASIC",
      email: "mailto:contact@warddstudio.com?subject=Pack%20Basic", 
      features: [
        "Enregistrement",
        "Mixage",
        "Mastering",
        "Shooting (Offert)",
        "Contenu vidéo pour réseaux sociaux",
        "Instru non exclusif",
        "Tuning vocal avancé"
      ]
    }
  ];

  const activeServiceData = services.find(service => service.id === activeService);

  return (
    <div className={style.content} id="package">
      <div className={style.container}>
        {/* Section Title - Moved to top */}
        <div className={style.sectionTitle}>
          <h2>Notre Expertise</h2>
        </div>

        {/* Main Section */}
        <div className={style.mainSection}>
          {/* Left Side - Video with Title */}
          {/* <div className={style.leftSide}>
            <div className={style.titleBadge}>
              <span>NOTRE EXPERTISE</span>
            </div>
            <div className={style.videoContainer}>
              <div className={style.microphoneIcon}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <iframe
                width="100%"
                height="100%"
                src={activeServiceData?.videoUrl}
                title="Service video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div> */}
          
          {/* Right Side - Services Menu */}
          <div className={style.rightSide}>
            {services.map((service) => (
              <button
                key={service.id}
                className={`${style.serviceButton} ${
                  activeService === service.id ? style.active : ""
                }`}
                onClick={() => setActiveService(service.id)}
              >
                <span className={style.serviceNumber}>{service.number}</span>
                <span className={style.serviceName}>{service.name}</span>
                <div className={style.arrowIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Packages Section */}
        <div className={style.packagesSection}>
          <div className={style.packagesHeading}>
            <h2>Choisis ton pack</h2>
          </div>
          
          <div className={style.packagesGrid}>
            {packs.map((pack, index) => (
              <div key={index} className={style.packageCard}>
                <div className={style.packageHeader}>
                  <h3>{pack.pack}</h3>
                </div>
                <div className={style.packageFeatures}>
                  {pack.features.map((feature, idx) => (
                    <div key={idx} className={style.featureItem}>
                      <div className={style.checkIcon}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" fill="currentColor"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className={style.packageFooter}>
                  <a href={pack.email} className={style.reserveButton}>
                    <span>RÉSERVEZ</span>
                    <div className={style.buttonArrow}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;