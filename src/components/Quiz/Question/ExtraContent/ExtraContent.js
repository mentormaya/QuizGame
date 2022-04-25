import React from "react";
import './ExtraContent.scss'

function ExtraContent({src, type}) {
  return (
    <>
      <article className="q-extra-content">
        { type === "PHOTO" && <img src={src} alt="This is the Extra Content" />}
        { type === "AUDIO" && <audio controls> <source src={src} type="audio/mpeg" /> Your browser does not supported.</audio>}
      </article>
    </>
  );
}

export default ExtraContent;
