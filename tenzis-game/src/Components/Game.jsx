import React, { useEffect } from "react";
import Die from "./Die";
import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const Game = () => {
  // This function generates an array of objects containing random numbers ranging from 1 to 6
  const generateNewDie = () => ({
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid(),
  });

  const allNewDice = () => {
    // the loops pushes the objects into newDice array
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  };

  // A state initialized to hold the array of numbers generated
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  // useEffect(() => console.log("dice state changed"), [dice]);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  const rollDice = () => {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  };
  //   setDice(oldDice => oldDice.map(die => {
  //     return die.id === id ?
  //         {...die, isHeld: !die.isHeld} :
  //         die
  // }))
  const holdDice = (id) => {
    setDice((prevState) => {
      return prevState.map((di) => {
        return di.id === id ? { ...di, isHeld: !di.isHeld } : di;
      });
    });
  };

  const diceElements = dice?.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => {
        holdDice(die.id);
      }}
    />
  ));

  return (
    <div className="bg-slate-400 max-w-[800px] m-auto h-[400px] flex justify-center items-center flex-col  p-[20px] ">
      {tenzies && <Confetti />}
      <h1 className="title font-extrabold text-lg capitalize text-center text-black">
        Tenzies
      </h1>

      <p className="instructions font-medium text-base text-slate-200 text-center max-w-md mb-4">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="bg-slate-100 p-[20px] flex-col flex rounded-lg items-center justify-around">
        <div className="grid bg-white grid-cols-5 m-auto gap-2">
          {diceElements}
        </div>
        <button
          onClick={rollDice}
          className="mt-8 bg-pink-400 p-3 active:bg-red-400 font-bold rounded-lg "
        >
          {tenzies ? "New Game" : "Roll"}{" "}
        </button>
      </div>
    </div>
  );
};

export default Game;
