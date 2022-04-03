import React from "react";
import './ExtraContent.scss'

function ExtraContent({src}) {
  return (
    <>
      <article className="q-extra-content">
        <img src={src} alt="This is the Extra Content" />
      </article>
    </>
  );
}

export default ExtraContent;
