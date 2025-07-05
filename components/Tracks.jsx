import style from "@/styles/tracks.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Tracks = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
  const tracks = [
    {
      track: "https://open.spotify.com/embed/track/6H7g2D6qPuMQtPbgUU4b0p?utm_source=generator"
    },
    {
      track: "https://open.spotify.com/embed/track/5C3ELRGBnth9x69FfKj9dk?utm_source=generator"
    },
    {
      track: "https://open.spotify.com/embed/track/74BHqwtauWi2JYYdeT29ue?utm_source=generator"
    },
    {
      track: "https://open.spotify.com/embed/track/2xNMlZRscen8MP3d7aH5e7?utm_source=generator"
    },
    {
      track: "https://open.spotify.com/embed/track/7sZpukocfCzN4Erg0KlaBE?utm_source=generator"
    },
    {
      track: "https://open.spotify.com/embed/track/4d521I3jDRpewk3Ag6VKpL?utm_source=generator"
    },
    {
      track:
        "https://open.spotify.com/embed/track/6NuQTF90fzQhejBAH5JPaK?utm_source=generator&theme=0",
    },
    {
      track:
        "https://open.spotify.com/embed/track/1CFKAVlA9kUwO5l4NqDVFt?utm_source=generator&theme=",
    },
    {
      track:
        "https://open.spotify.com/embed/track/7085mckZcZSlEeFsmkhHBg?utm_source=generator",
    },
    {
      track:
        "https://open.spotify.com/embed/track/5r2ChVy981wysLw7947oqk?utm_source=generator&theme=",
    },
    {
      track:
        "https://open.spotify.com/embed/track/3IxwyEJPyeWcMZHVZ6OMbp?utm_source=generator&theme=",
    },
    {
      track:
        "https://open.spotify.com/embed/track/3T2wnWn2KCaRGk7fLvseo2?utm_source=generator&theme=",
    },
    {
      track:
        "https://open.spotify.com/embed/track/766GuXqkVG2RNJHtRTGhZb?utm_source=generator&theme=",
    },
    {
      track:
        "https://open.spotify.com/embed/track/4gV700by37eebOxyy8Xaep?utm_source=generator&theme=",
    },
    {
      track:
        "https://open.spotify.com/embed/track/7kNgCY3U1EXmLlxI9rjghO?utm_source=generator&theme=",
    },
    {
      track:
        "https://open.spotify.com/embed/track/2H52Y3Dtc4jPBXQYzQJvLl?utm_source=generator&theme=",
    },
    {
      track:
        "https://open.spotify.com/embed/track/0YR92IzIgCbk8dYV2m0D7T?utm_source=generator&theme=",
    },
    {
      track:
        "https://open.spotify.com/embed/track/1CkB42RbAw4Wbcd8vhH74t?utm_source=generator&theme=",
    },
    {
      track:
        "https://open.spotify.com/embed/track/0mzWzP3TA6KqTcT3qQKEyd?utm_source=generator&theme=",
    },
    {
      track:
        "https://open.spotify.com/embed/track/6fspOHbnuhJNC3BZyF37on?utm_source=generator&theme=",
    }
  ];
  return (
    <div className={style.content} id="tracks">
      <div className={style.container}>
        <div className={style.heading}>
          <h1>Nos dernières sorties</h1>
        </div>
        <Carousel
          responsive={responsive}
          draggable={true}
          customTransition="all .5s ease"
          ssr={true}
        >
          {tracks.map((track, index) => (
            <div className={style.card} key={index}>
              <iframe
                src={`${track.track}`}
                width="100%"
                height="400px"
                frameBorder="0"
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          ))}
        </Carousel>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Tracks;
