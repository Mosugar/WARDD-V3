"use client";
import { useEffect } from "react";
import gsap from "gsap";import style from "@/styles/preloader.module.css";

const Preloader = () => {
  useEffect(() => {
    gsap.fromTo(
      "#pre",
      {
        y: 0,
      },
      {
        delay: 3,
        y: '-100%',
        duration: 1,
      }
    );
  }, []);
  return (
    <div className={style.content} id="pre">
      <div class={style.pulse}></div>
    </div>
  );
};

export default Preloader;
