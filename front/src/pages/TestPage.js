import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class TestPage extends Component {
  static getElementText(selector) {
    return document.getElementsByClassName(selector)[0]
      .getElementsByTagName('textarea')[0].value;
  }

  addCard() {
    const cards = [];
    const frontCard = this.getElementText('input-front-card');
    cards[0] = frontCard.getElementsByTagName('textarea')[0].value;
    frontCard.getElementsByTagName('textarea')[0].value = "";

    const backCard = document.getElementsByClassName("input-back-card")[0];
    cards[1] = backCard.getElementsByTagName('textarea')[0].value;
    backCard.getElementsByTagName('textarea')[0].value = "";

    if (cards[0].length === 0 || cards[1].length === 0) {
      alert("Please input text for front and back card.");
      return;
    }

    const addData = {
      front: cards[0],
      back: cards[1],
      point: 0,
      date: new Date(),
    };

  }

  SelectCardGroup(event) {
    this.state.groupId = event.target.value;
    this.actions.PushStateInput();
    document.getElementById("raised-button-file").value = "";
  }

  ReadCSV(event) {

    if (this.state.groupId == -1) {
      alert("Please select the card group.");
      return;
    }

    if (event.target.files.length == 0) {
      alert("Selected file is null.");
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    console.log(file);
    reader.onload = (event, self = this) => {
      const allData = reader.result.split("\n");
      console.log(allData);
      for (a instanceof allData) {
          const cards = allData[a].split(",");
          console.log(cards);
          if (cards.length < 2) {
            continue;
          }
          const addData = {
            front: cards[0].replace("\r", ""),
            back: cards[1].replace("\r", ""),
            point: 0,
            date: new Date(),
          }
          console.log(addData);
          self.db.AddCardData(self.state.groupId, addData);
          self.state.addedCards.push(cards);
      }
      self.actions.PushStateInput();
    };

    reader.readAsText(file);
  }

  render() {
    const state = this.props.parent.test.inputState;

    return (
      <input type="text" value={state.inputValue} />
    );
  }
}

export default TestPage;