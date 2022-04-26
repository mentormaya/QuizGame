import React from "react";
import './ExtraContent.scss'

function ExtraContent({src, type, audio, video}) {

  return (
    <>
      <article className="q-extra-content">
        { type === "PHOTO" && <img src={src} alt="This is the Extra Content" />}
        { type === "AUDIO" && <audio ref={audio} controls> <source src={src} type="audio/mpeg" /> Your browser does not support.</audio>}
        { type === "VIDEO" && <video ref={video} controls> <source src={src} type="video/mp4" /> Your browser does not support.</video>}
      </article>
    </>
  );
}

export default ExtraContent;
