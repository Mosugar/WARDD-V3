"use client";
import { useState, useEffect } from "react";
import style from "@/styles/faqs.module.css";

const Faqs = () => {
  const [showAnswer, setShowAnswer] = useState(null);

  const handleClick = (index) => {
    setShowAnswer(index === showAnswer ? null : index);
  };

  const faq = [
    {
      question: "Quels services proposez-vous dans le studio ?",
      answer:
        "Nous offrons des services d'enregistrement audio, de mixage, de mastering, ainsi que la production musicale et l'accompagnement artistique.",
    },
    {
      question: "Est-ce que je peux réserver du temps en studio pour mes propres projets ?",
      answer:
      "Oui, vous pouvez réserver des sessions en studio pour enregistrer vos propres projets musicaux. Contactez-nous pour connaître les disponibilités.",
    },
    {
      question: "Quels sont les tarifs pour une session en studio ?",
      answer:
        "Nos tarifs varient en fonction de la durée de la session et des services demandés. Veuillez consulter notre page tarifs ou nous contacter pour plus de détails.",
    },
    {
      question: "Dois-je apporter mon propre matériel ou le studio est-il équipé ?",
      answer:
      "Notre studio est entièrement équipé avec des instruments et du matériel professionnel. Toutefois, vous êtes libre d'apporter votre propre équipement si vous le souhaitez.",
    },
    {
      question: "Puis-je obtenir des conseils pour améliorer ma musique pendant l'enregistrement ?",
      answer:
       "Oui, notre équipe d'ingénieurs du son et de producteurs peut vous fournir des conseils techniques et créatifs pour améliorer votre projet musical.",
    },
  ];

  return (
    <div className={style.content} id="faqs">
      <div className={style.container}>
      <div className={style.heading}>
          <h1>FAQs</h1>
        </div>
        <div className={style.cards}>
          {faq.map((question, index) => (
            <div
              className={`${style.card} `}
              key={index}
              onClick={() => handleClick(index)}
            >
              <div className={style.title}>
                <div className={style.question}>
                  <h2>{question.question}</h2>
                </div>
                <div className={style.icon}>
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    fill="var(--green)"
                    width={40}
                    height={40}
                    className={`${showAnswer === index ? 'active' : ''}`}
                  >
                    <path
                      d="M25,1A24,24,0,1,0,49,25,24,24,0,0,0,25,1Zm1.91,26.48c0,2.51,0,5,0,7.54a1.91,1.91,0,0,1-3.81.09c0-1.31,0-2.63,0-3.95V26.92H22.5c-2.52,0-5,0-7.54,0a1.91,1.91,0,1,1,.11-3.81h8v-.54c0-2.53,0-5.06,0-7.58a1.91,1.91,0,1,1,3.81.08v8h.57c2.52,0,5,0,7.54,0a1.9,1.9,0,0,1,1.82,2.61A1.93,1.93,0,0,1,35,26.92h-8Z"
                      transform="translate(-1 -1)"
                    />
                  </svg>
                </div>
              </div>
              {showAnswer === index && (
                <div className={`${style.answer} card_fb5`}>
                  <p>{question.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
