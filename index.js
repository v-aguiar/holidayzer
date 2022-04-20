import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());

const holidays = [
  [{ date: "1/1/2022", name: "Confraternização mundial" }],
  [{ date: "2/28/2022", name: "Carnaval" }],
  [{ date: "3/2/2022", name: "Quarta-feira de cinzas" }],
  [
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
  ],
  [{ date: "5/1/2022", name: "Dia do trabalho" }],
  [{ date: "6/16/2022", name: "Corpus Christi" }],
  [{}],
  [{}],
  [{ date: "9/7/2022", name: "Independência do Brasil" }],
  [{ date: "10/12/2022", name: "Nossa Senhora Aparecida" }],
  [
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
  ],
  [{ date: "12/25/2022", name: "Natal" }],
];

function getTodayHoliday(res) {
  // Test on a holiday day, uncomment next line, and comment the line right beneath the next one. (Or change the 'Date(year, month_index, day)' parameters to match a holiday you prefer)
  // const today = new Date(2022, 1, 28).toLocaleDateString();
  const today = new Date().toLocaleDateString();

  const filteredHoliday = holidays.filter((el) => el[0].date === today);

  const { name: holiday } =
    filteredHoliday.length > 0 ? filteredHoliday[0][0] : "";

  const [month, day, year] = today.split("/");

  filteredHoliday.length > 0
    ? res.send(
        `<p>Hoje é: ${day}/${month < 10 ? "0" + month : month}/${year}</p>` +
          `<p>Sim, hoje é <strong>${holiday}</strong> 🎉</p>`
      )
    : res.send(
        `<p>Hoje é: ${day}/${month < 10 ? "0" + month : month}/${year}</p>` +
          "<p>Não, hoje <strong>não é feriado!</strong> 😫</p>"
      );
}

app.get("/holidays", (req, res) => {
  res.send(holidays);
});

app.get("/holidays/:monthId", (req, res) => {
  const id = req.params.monthId;

  res.send(holidays[id * 1 - 1]);
});

app.get("/is-today-holiday", (req, res) => {
  getTodayHoliday(res);
});

app.listen(5050, () =>
  console.log(
    chalk.cyanBright("Server is running on ") +
      chalk.whiteBright("5050 🚀\n") +
      chalk.greenBright.bold("Link: http://localhost:5050")
  )
);
