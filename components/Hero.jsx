"use client";
import { useEffect } from "react";
import gsap from "gsap";
import style from "@/styles/hero.module.css";
import Image from "next/image";

const Hero = () => {
  // useEffect(() => {
  //   gsap.fromTo(
  //     ".ov-g5e4",
  //     {
  //       y: "100%",
  //       opacity: 0,
  //     },
  //     {
  //       delay: 0.6,
  //       y: 0,
  //       opacity: 1,
  //       duration: 0.3,
  //       stagger: 0.2,
  //     }
  //   );
  // }, []);
  return (
    <div className={style.content}>
      <div className={style.container}>
        <div className={style.bold}>
          <div className={style.textB}>
            <h1>
              Vis ta passion avec
              <br />
              Wardd Music
            </h1>
          </div>
          <div className={style.description}>
            <p>
              Découvrez Wardd Music, le studio d'enregistrement, production qui
              vous donnera la liberté de création et une qualité de production
              fidèle à notre passion.
            </p>
          </div>
          <div className="overflow-hidden">
            <a href="#about" className="ov-g5e4">
              <button>
                <span>Commencez</span>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="hero-background-image">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/images/bg/vol.jpg"
            type="image/jpeg"
          />
          <source
            media="(max-width: 767px)"
            srcSet="/images/rev.jpg"
            type="image/jpeg"
          />
          <Image
            src="/images/rev.jpg"
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </picture>
      </div>
    </div>
  );
};

export default Hero;
