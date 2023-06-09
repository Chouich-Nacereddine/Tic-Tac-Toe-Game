import { X_O } from "./X_O.js";

export class Presenter {
  Status = "X";
  static winningCombinations = [
    ["A", "B", "C"],
    ["D", "E", "F"],
    ["G", "H", "I"],
    ["A", "D", "G"],
    ["B", "E", "H"],
    ["C", "F", "I"],
    ["A", "E", "I"],
    ["C", "E", "G"],
  ];

  constructor() {
    this.squares = Array.from(document.getElementsByTagName("span"));
    this.Xpositions = [];
    this.Opositions = [];

    this.squares.forEach((span) => {
      span.addEventListener("click", this.handleClick.bind(this, span));
    });
  }

  handleClick(span) {
    let imgContent = document.createElement("img");
    imgContent.setAttribute("src", this.#renderXorO(span));

    if (imgContent.getAttribute("src") === "../assets/O.png") {
      imgContent.classList.add("O");
    } else {
      imgContent.classList.add("X");
    }
    span.appendChild(imgContent);

    const winner = this.checkWinner();
    if (winner) {
      window.alert(`Le joueur ${winner} a gagné !`);
      this.resetGame();
    }
  }

  #renderXorO(span) {
    const firstRender = new X_O();
    const isAllEmpty = this.squares.every((span) => span.innerHTML === "");

    if (isAllEmpty) {
      this.Xpositions.push(span.getAttribute("id"));
      return firstRender.getImg();
    } else {
      if (this.Status === "X") {
        firstRender.setImg(this.Status);
        this.Status = "O";
        this.Opositions.push(span.getAttribute("id"));
        return firstRender.getImg();
      } else {
        firstRender.setImg(this.Status);
        this.Status = "X";
        this.Xpositions.push(span.getAttribute("id"));
        return firstRender.getImg();
      }
    }
  }

  checkWinner() {
    for (const combination of Presenter.winningCombinations) {
      const [pos1, pos2, pos3] = combination;
      const Xwinner = this.checkCombination(pos1, pos2, pos3, "X");
      if (Xwinner) {
        return "X";
      }
      const Owinner = this.checkCombination(pos1, pos2, pos3, "O");
      if (Owinner) {
        return "O";
      }
    }

    return null;
  }

  checkCombination(pos1, pos2, pos3, player) {
    return (
      this[player + "positions"].includes(pos1) &&
      this[player + "positions"].includes(pos2) &&
      this[player + "positions"].includes(pos3)
    );
  }

  resetGame() {
    this.Xpositions = [];
    this.Opositions = [];
    this.squares.forEach((span) => {
      span.innerHTML = "";
    });
  }
}
