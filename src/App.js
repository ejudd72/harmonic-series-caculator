import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Header/Header";
import FrequencyInput from "./FrequencyInput/FrequencyInput";
import Result from "./Result/Result";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  calculateFrequencyFromNotation,
  producePartials
} from "./functions/pitch-calculator";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      frequencyInput: true,
      frequency: "",
      numberOfPartials: 32,
      pitchName: "",
      partials: []
    };
  }

  changeInputType = value => {
    this.setState({
      frequencyInput: value
    });
  };

  handleInputChange = (type, e) => {
    switch (type) {
      case "frequency": {
        return this.setState({ frequency: e.target.value, pitchName: "" });
      }
      case "pitchName": {
        return this.setState({ pitchName: e.target.value, frequency: "" });
      }
      case "partials":
        return this.setState({
          numberOfPartials: e.target.value
        });
    }
  };

  convert = () => {
    console.log("convert ran");
    const frequency = calculateFrequencyFromNotation(this.state.pitchName);
    const partials = producePartials(frequency, this.state.numberOfPartials);

    console.log(
      "partials produced",
      producePartials(
        calculateFrequencyFromNotation(this.state.pitchName),
        this.state.numberOfPartials
      )
    );
    this.setState({
      frequency,
      partials
    });
  };

  calculatePartials = () => {
    console.log("calculatePartials ran");
    console.log(
      producePartials(this.state.frequency, this.state.numberOfPartials)
    );

    const partials = producePartials(
      this.state.frequency,
      this.state.numberOfPartials
    );

    this.setState({
      partials
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <FrequencyInput
          changeInputType={this.changeInputType}
          frequencyInput={this.state.frequencyInput}
          frequency={this.state.frequency}
          pitchName={this.state.pitchName}
          handleInputChange={this.handleInputChange}
          numberOfPartials={this.state.numberOfPartials}
          calculate={
            this.state.frequencyInput ? this.calculatePartials : this.convert
          }
        />
        {this.state.partials !== [] && (
          <Result partials={this.state.partials} />
        )}
      </div>
    );
  }
}

export default App;
