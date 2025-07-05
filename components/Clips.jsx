import style from "@/styles/clip.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Clips = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 800 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  const clips = [
    {
      clip: "https://www.youtube.com/embed/iAKam37eHYM?si=maHdEj2InbZYi-_X",
    },
    {
      clip: "https://www.youtube.com/embed/HYtqFjUIh8Q?si=MfFj-Hnh20_vedha",
    },
    {
      clip: "https://www.youtube.com/embed/fWlUmFIdGnA?si=AoUaX3mgeUwhX6Ej",
    },
    {
      clip: "https://www.youtube.com/embed/8uT34tiBPR4?si=BMU1nZ6XIecNtDmk",
    },
    {
      clip: "https://www.youtube.com/embed/3qLFE-tx5ec?si=6Ok3tAMW1tjdlZL7",
    },
    {
      clip: "https://www.youtube.com/embed/S6HAWKi81bs?si=SFV8sw9Cr77-65c3",
    },
    {
      clip: "https://www.youtube.com/embed/E_59pKMr5Cs?si=rgxGxe1q2Bfhcj3I",
    },
    {
      clip: "https://www.youtube.com/embed/927oWsK59Zk?si=7clUil03TcO18oMV",
    },
    {
      clip: "https://www.youtube.com/embed/5efXnfS7aY4?si=I tFoL4CG8PHxbaYW",
    },
  ];
  return (
    <div className={style.content} id="clips">
      <div className={style.container}>
        <div className={style.heading}>
          <h1>Nos clips</h1>
        </div>
        {/* <div className={style.cards}> */}
        <Carousel
          responsive={responsive}
          draggable={true}
          customTransition="all .5s ease"
          ssr={true}
        >
          {clips.map((clip, index) => (
            <div className={style.card} key={index}>
              <iframe
                width="100%"
                height="315"
                src={`${clip.clip}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          ))}
        </Carousel>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Clips;
