import React from "react";

import './footer.scss'

function Footer({year}) {
  return (
    <>
      <footer>
        <div className="quiz-footer">
          <div className="copyright">
            &copy; Copyright &nbsp;
            <a href="https://mentormaya.com/" title="Ajay Singh">
              @mentormaya
            </a>
            &nbsp;
            {year === "2022" ? "2022" : `2022 - ${year}`}.
          </div>
          <div className="rights-info">All the rights are reserved.</div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
