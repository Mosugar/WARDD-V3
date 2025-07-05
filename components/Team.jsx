import style from "@/styles/team.module.css";
import Image from "next/image";

const Team = () => {
  return (
    <div className={style.content} id="team">
      <div className={style.container}>
        <div className={style.heading}>
          <h1>Producteurs</h1>
        </div>
        
        <div className={style.producersGrid}>
          <div className={style.card}>
            <div className={style.picture}>
              <Image
                src={"/images/aziz.png"}
                alt="Aziz El Asmai"
                width={300}
                height={300}
              />
            </div>
            <div className={style.details}>
              <h3>Aziz El Asmai</h3>
              <span>Sound Engineer</span>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.picture}>
              <Image
                src={"/images/imran.png"}
                alt="Imran El Fakyr"
                width={300}
                height={300}
              />
            </div>
            <div className={style.details}>
              <h3>Imran El Fakyr</h3>
              <span>Producer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;