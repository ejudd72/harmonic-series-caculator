import React from "react";

const Result = ({ partials }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Partial Number</th>
          <th>Frequency (Hz)</th>
          <th>Closest Tempered Pitch</th>
          <th>Deviation from Tempered Pitch (cents)</th>
        </tr>
      </thead>

      <tbody>
        {partials.map((partial, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{partial.frequency}</td>
            <td>
              {partial.pitch.pitchClass}
              <sub>{partial.pitch.octave}</sub>
            </td>
            <td>{partial.deviation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Result;
