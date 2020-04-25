import React from "react";

const Header = ({}) => {
  return (
    <>
      <header className="header">
        <h1>Harmonic Series Pitch Calculator</h1>
        <div className="header__description">
          <p>
            This tool will take a given pitch, provided in either Hz or{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Scientific_pitch_notation"
            >
              scientific pitch notation,
            </a>{" "}
            and calculate the pitches in its harmonic series. The output pitches
            are given as frequencies in Hz, along with their closest equal
            tempered pitches and their deviation from these pitches in cents.
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
