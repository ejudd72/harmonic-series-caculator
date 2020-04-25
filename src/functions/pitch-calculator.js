export const calculateFrequencyFromNotation = note => {
  const noteSegments = Array.from(note);

  const letter = noteSegments.shift().toUpperCase();

  let accidental = "";

  if (noteSegments[0] === "#" || noteSegments[0] === "b") {
    accidental = noteSegments.shift();
  }

  const octave = noteSegments.join("");

  const getBaseSemitones = () => {
    switch (letter) {
      case "B":
        return 2;
      case "C":
        return -9;
      case "D":
        return -7;
      case "E":
        return -5;
      case "F":
        return -4;
      case "G":
        return -2;
      case "A":
        return 0;
    }
  };

  const getAccidentalSemitones = () => {
    switch (accidental) {
      case "#":
        return 1;
      case "b":
        return -1;
      default:
        return 0;
    }
  };

  const octaveSemitones = (octave - 4) * 12;

  const semitonesAway =
    getBaseSemitones() + getAccidentalSemitones() + octaveSemitones;

  const calculation = Math.pow(Math.pow(2, 1 / 12), semitonesAway) * 440;

  console.log("frequency is:", calculation.toFixed(5));

  return calculation.toFixed(5);
};

export const producePartials = (frequency, numberOfPartials) => {
  console.log("from producePartials: ", frequency, numberOfPartials);
  //calculation to produce partials
  let partials = [];
  for (let i = 0; i <= numberOfPartials; i += 1) {
    let newVal = frequency * i;
    console.log(calculateNotationFromFrequency(newVal));
    partials.push({
      frequency: newVal,
      pitch: calculateNotationFromFrequency(newVal),
      deviation: getDeviation(newVal)
    });
  }
  const allPartials = partials.splice(1, partials.length - 1);

  return allPartials;
};

const calculateNotationFromFrequency = frequency => {
  let numberSemitonesAwayFrom440 =
    (12 / Math.log(2)) * Math.log(frequency / 440);

  let roundedSemitonesAway = Math.round(numberSemitonesAwayFrom440) % 12;

  const getPitchClass = () => {
    const keepAboveTwelve =
      roundedSemitonesAway < 1
        ? roundedSemitonesAway + 12
        : roundedSemitonesAway;
    console.log(keepAboveTwelve);

    switch (keepAboveTwelve) {
      case 0 || 12:
        return "A";
      case 1:
        return "A#/Bb";
      case 2:
        return "B";
      case 3:
        return "C";
      case 4:
        return "C#/Db";
      case 5:
        return "D";
      case 6:
        return "D#/Eb";
      case 7:
        return "E";
      case 8:
        return "F";
      case 9:
        return "F#/Gb";
      case 10:
        return "G";
      case 11:
        return "G#/Ab";
      default:
        return "IDK";
    }
  };
  const getOctave = () => {
    const pitchClass = getPitchClass();
    let stepOne = Math.floor(numberSemitonesAwayFrom440 / 12) + 4;

    console.log("step one:; ", stepOne);
    const addOneConditions = ["A", "A#/Bb", "B"];

    if (addOneConditions.indexOf(pitchClass) === -1) {
      return stepOne + 1;
    }
    return stepOne;
  };

  return { pitchClass: getPitchClass(), octave: getOctave() };
};

const getDeviation = frequency => {
  const notation = calculateNotationFromFrequency(frequency);
  const noteString = notation.pitchClass.split("/")[0] + notation.octave;
  const closestTempered = calculateFrequencyFromNotation(noteString);

  let calc = (1200 / Math.log(2)) * Math.log(frequency / closestTempered);
  return calc === 0 ? calc : calc.toFixed(2);
};
