import style from "@/styles/contact.module.css";
import Image from "next/image";

const Contact = () => {
  return (
    <div className={style.content} id="contact">
      <div className={style.container}>
        <div className={style.left_part}>
          <div className={style.heading}>
            <h1>Nous pouvons tirer le meilleur parti de ton potentiel.</h1>
          </div>
          <div className={style.description}>
            <p>
              Nous sommes déterminés à vous offrir un résultat exceptionnel
              <br />
              avec une qualité irréprochable.
            </p>
          </div>
          <div className={style.btn}>
            <button>
              <a href="mailto:contact@warddstudio.com">Contactez nous</a>
            </button>
          </div>
        </div>

        {/* ✅ Add this right_part for the background */}
        {/* <div className={style.right_part}></div> */}
      </div>
      <div className={style.hero_background_image}>
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/images/bg/aziz-banner.jpg"
            type="image/jpeg"
          />
          <source
            media="(max-width: 767px)"
            srcSet="/images/pic.jpg"
            type="image/jpeg"
          />
          <Image
            src="/images/pic.jpg"
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

export default Contact;
