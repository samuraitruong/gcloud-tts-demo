// console.log("",React)
const TIME_LIMIT = 20;
const WORD_COUNT = 20;
const DATA_URL =
"https://samuraitruong.github.io/gcloud-tts-demo/oxford-500.json";
const play = word => {
  const audio = new Audio(
  `https://samuraitruong.github.io/gcloud-tts-demo//voices/${word.toLowerCase()}_en-UK.mp3`);

  audio.play();
};

function ListView({ data, current, isBlur }) {
  return (
    React.createElement("ul", { className: "mt-2 list-group d-flex flex-row flex-wrap" },
    data.map((word, index) =>
    React.createElement("li", {
      onClick: () => play(word),
      className:
      "list-group-item d-flex justify-content-between align-items-center list-group-item-action w-50 " + (
      word === current ? "active" : ""),

      key: word },

    index + 1, ".", " ",
    React.createElement("span", { className: isBlur ? "blurry-text" : "" }, word),
    React.createElement("span", { class: "right" },
    React.createElement("i", { className: "fas fa-volume-up", onClick: () => play(word) }))))));






  return React.createElement("h1", null, "Hello, ", props.name);
}
const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [source, setSource] = React.useState([]);
  const [running, setRunning] = React.useState(false);
  const [timer, setTimer] = React.useState(TIME_LIMIT);
  const [interval, setIntervalId] = React.useState(null);
  const [current, setCurrent] = React.useState("");
  const loadData = () => {
    fetch(DATA_URL).
    then(res => res.json()).
    then(data => {
      setLoading(false);
      setSource(data);
    });
  };

  const buttonClicked = () => {
    if (data.length == WORD_COUNT && running) {
      setRunning(false);
      setCurrent("");
      clearInterval(interval);
      return;
    }
    console.log("click", running, data);
    if (!running) {
      setData([]);
      setRunning(true);
    } else {
      const word = nextWord();
    }
  };
  const nextWord = () => {
    let exist = true;
    let word;
    do {
      const rnd = Math.ceil(Math.random() * source.length);
      word = source[rnd];
      exist = data.some(x => x == word);
    } while (exist);
    setData([...data, word]);
    setCurrent(word);
    play(word);
    return word;
  };
  const startTimer = () => {
    if (interval) clearInterval(interval);
    const intervaldI = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
    setIntervalId(intervaldI);
  };
  React.useEffect(() => {
    if (running) {
      nextWord();
    }
  }, [running]);
  React.useEffect(() => {
    if (timer === 0) {
      if (data.length === WORD_COUNT) {
        setRunning(false);
        setCurrent("");
        clearInterval(interval);
      } else {
        setTimer(TIME_LIMIT);
        nextWord();
      }
    }
  }, [timer]);
  React.useEffect(() => {
    setTimer(TIME_LIMIT);
    if (current) startTimer();
    return () => clearInterval(interval);
  }, [current]);

  React.useEffect(() => {
    loadData();
  }, [loading]);
  const getText = () => {
    const res = {
      icon: "fas fa-play",
      text: "Start",
      className: "btn  btn-lg  btn-success btn-block" };

    if (running) {
      res.text = "Next word";
      res.icon = "fas fa-forward";
      res.className = "btn  btn-lg  btn-primary btn-block";
    }
    if (data.length == WORD_COUNT && running) {
      res.text = "Finish and Show me text";
      res.icon = "fas fa-check-circle";
      res.className = "btn btn-lg btn-danger btn-block";
    }
    return res;
  };
  const btn = getText();
  // console.log("aaa", btn)
  const getTimerClass = ti => {
    if (ti > 15) return "bg-success";

    if (ti > 10) return "bg-primary";

    if (ti > 5) return "bg-warning";

    return "bg-danger";
  };
  return (
    React.createElement("div", { className: "container mt-3 bg-light shadow" },
    loading && React.createElement("div", null, " Please wait...."),
    React.createElement("div", { className: "row" },
    React.createElement("div", { className: "col-md-8" },
    React.createElement(ListView, { isBlur: running, data: data, current: current }),
    React.createElement("div", { className: "mt-3 mb-3" },
    React.createElement("button", { onClick: buttonClicked, className: btn.className },
    React.createElement("i", { className: btn.icon }), " ", btn.text))),



    React.createElement("div", { className: "col-md-4 p-5 text-center d-flex justify-content-center border border-white shadow" },
    React.createElement("div", {
      className:
      "timer border rounded-circle p-5 font-weight-bold text-white " +
      getTimerClass(timer) },


    timer < 10 ? `0${timer}` : timer)))));





};

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));