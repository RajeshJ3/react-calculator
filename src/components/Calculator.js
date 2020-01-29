import React, { Component } from "react";
import * as css from "./Styles";

class Calculator extends Component {
  state = {
    toDisplay: "",
    operator: "",
    valueX: null,
    valueY: null,
    result: null
  };

  handleClear = () => {
    this.setState({
      toDisplay: "",
      operator: "",
      valueX: null,
      valueY: null,
      result: null
    });
  };

  handleBack = () => {
    if (!this.state.valueY && !this.state.operator) {
      let x = this.state.valueX.toString();
      let newX = x.slice(0, this.state.valueX.toString().length - 1);
      let newToDisplay = this.state.toDisplay.slice(
        0,
        this.state.valueX.toString().length - 1
      );
      this.setState({
        ...this.state,
        valueX: parseInt(newX),
        toDisplay: newToDisplay
      });
    } else if (this.state.valueY) {
      let y = this.state.valueY.toString();
      let newY = y.slice(0, this.state.valueY.toString().length - 1);
      let newToDisplay = this.state.toDisplay.slice(
        0,
        this.state.toDisplay.length - 1
      );

      this.setState({
        ...this.state,
        valueY: parseInt(newY),
        toDisplay: newToDisplay
      });
    }
  };

  handleEqual = () => {
    const x = this.state.valueX;
    const y = this.state.valueY;
    const sum = x + y;
    const diff = x - y;
    const prod = x * y;
    let div = (x / y).toFixed(2);

    const decimalAt = div.toString().indexOf(".");
    if (div.toString().slice(decimalAt + 1, decimalAt + 3) === "00") {
      div = Math.round(div);
    } else if (
      div.toString().slice(decimalAt + 1, decimalAt + 2) !== "0" &&
      div.toString().slice(decimalAt + 2, decimalAt + 3) === "0"
    ) {
      div = (x / y).toFixed(1);
    }

    switch (this.state.operator) {
      case "+":
        this.setState({
          ...this.state,
          result: sum,
          valueX: sum,
          valueY: null,
          toDisplay: sum.toString(),
          operator: ""
        });
        break;
      case "-":
        this.setState({
          ...this.state,
          result: diff,
          valueX: diff,
          valueY: null,
          toDisplay: diff.toString(),
          operator: ""
        });
        break;
      case "x":
        this.setState({
          ...this.state,
          result: prod,
          valueX: prod,
          valueY: null,
          toDisplay: prod.toString(),
          operator: ""
        });
        break;
      case "/":
        this.setState({
          ...this.state,
          result: div,
          valueX: div,
          valueY: null,
          toDisplay: div.toString(),
          operator: ""
        });
        break;
      default:
        console.log("No operator");
    }
  };

  handlePlus = () => {
    if (this.state.operator === "") {
      let newToDisplay = this.state.toDisplay + "+";
      this.setState({
        ...this.state,
        operator: "+",
        toDisplay: newToDisplay
      });
    } else {
      this.handleEqual();
    }
  };

  handleMinus = () => {
    if (this.state.operator === "") {
      let newToDisplay = this.state.toDisplay + "-";
      this.setState({
        ...this.state,
        operator: "-",
        toDisplay: newToDisplay
      });
    } else {
      this.handleEqual();
    }
  };

  handleMultiply = () => {
    if (this.state.operator === "") {
      let newToDisplay = this.state.toDisplay + "x";
      this.setState({
        ...this.state,
        operator: "x",
        toDisplay: newToDisplay
      });
    } else {
      this.handleEqual();
    }
  };

  handleDivide = () => {
    if (this.state.operator === "") {
      let newToDisplay = this.state.toDisplay + "/";
      this.setState({
        ...this.state,
        operator: "/",
        toDisplay: newToDisplay
      });
    } else {
      this.handleEqual();
    }
  };

  handleSignChange = () => {
    const index = this.state.toDisplay[0];
    if (index === "-") {
      const newToDisplay = this.state.toDisplay.split(
        1,
        this.state.toDisplay.length
      );
      this.setState({
        ...this.state,
        valueX: this.state.valueX * -1,
        toDisplay: newToDisplay
      });
    } else {
      this.setState({
        ...this.state,
        valueX: this.state.valueX * -1,
        toDisplay: "-" + this.state.toDisplay
      });
    }
  };

  handleClick = key => {
    if (this.state.operator === "") {
      let newVal;
      let strKey = key.toString();
      if (!this.state.valueX) {
        newVal = strKey;
      } else {
        newVal = this.state.valueX.toString() + strKey;
      }
      let newIntVal = parseInt(newVal);
      this.setState({
        ...this.state,
        valueX: newIntVal,
        toDisplay: newVal
      });
    } else {
      let newVal;
      let strKey = key.toString();
      if (!this.state.valueY) {
        newVal = strKey;
      } else {
        newVal = this.state.valueY.toString() + strKey;
      }
      newVal = parseInt(newVal);
      this.setState({
        ...this.state,
        valueY: newVal,
        toDisplay: this.state.toDisplay + strKey
      });
    }
  };

  render() {
    return (
      <div>
        <div style={css.resultStyle}>
          <div style={css.rowAns}>
            <div style={css.colAnsLg}>{this.state.toDisplay.slice(0, 18)}</div>
          </div>
          <div style={css.rowSm}>
            <div style={css.colAnsSm}>{this.state.result}</div>
          </div>
        </div>
        <div style={css.keyboardStyle}>
          <div style={css.row}>
            {/* <div style={css.col}>CE</div> */}
            <div onClick={this.handleClear} style={css.colClear}>
              C
            </div>
            <div onClick={this.handleBack} style={css.col}>
              {"<"}
            </div>
            <div onClick={this.handleDivide} style={css.col}>
              /
            </div>
          </div>
          <div style={css.row}>
            <div
              onClick={() => {
                this.handleClick(7);
              }}
              style={css.colDark}
              className="btn"
            >
              7
            </div>
            <div
              onClick={() => {
                this.handleClick(8);
              }}
              className="btn"
              style={css.colDark}
            >
              8
            </div>
            <div
              onClick={() => {
                this.handleClick(9);
              }}
              className="btn"
              style={css.colDark}
            >
              9
            </div>
            <div onClick={this.handleMultiply} className="btn" style={css.col}>
              x
            </div>
          </div>
          <div style={css.row}>
            <div
              onClick={() => {
                this.handleClick(4);
              }}
              className="btn"
              style={css.colDark}
            >
              4
            </div>
            <div
              onClick={() => {
                this.handleClick(5);
              }}
              className="btn"
              style={css.colDark}
            >
              5
            </div>
            <div
              onClick={() => {
                this.handleClick(6);
              }}
              className="btn"
              style={css.colDark}
            >
              6
            </div>
            <div onClick={this.handleMinus} className="btn" style={css.col}>
              -
            </div>
          </div>
          <div style={css.row}>
            <div
              onClick={() => {
                this.handleClick(1);
              }}
              className="btn"
              style={css.colDark}
            >
              1
            </div>
            <div
              onClick={() => {
                this.handleClick(2);
              }}
              className="btn"
              style={css.colDark}
            >
              2
            </div>
            <div
              onClick={() => {
                this.handleClick(3);
              }}
              className="btn"
              style={css.colDark}
            >
              3
            </div>
            <div onClick={this.handlePlus} style={css.col}>
              +
            </div>
          </div>
          <div style={css.row}>
            <div
              onClick={() => {
                this.handleSignChange();
              }}
              style={css.col}
            >
              + -
            </div>
            <div
              onClick={() => {
                this.handleClick(0);
              }}
              className="btn"
              style={css.colDark}
            >
              0
            </div>
            <div style={css.col}>.</div>
            <div onClick={this.handleEqual} style={css.col}>
              =
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
