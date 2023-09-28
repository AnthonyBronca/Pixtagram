export default function daysSincePost(post) {
  const calendar = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
  };

  let postedDate = post.created_at.split(" ");
  let convertedMonth;
  for (let key in calendar) {
    if (key === postedDate[2]) {

      convertedMonth = calendar[key];
    }
  }

  let dateCreated = [
    parseInt(`${postedDate[3]}`),
    parseInt(`${convertedMonth}`),
    parseInt(`${postedDate[1]}`)
  ];
  // console.log(dateCreated, "this is dateCreated") // 2022, 6, 01
  let date = new Date();
  const yearPosted = dateCreated[0];
  const monthPosted = dateCreated[1];
  const dayPosted = dateCreated[2];
  const datePosted = [yearPosted, monthPosted, dayPosted];
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear()
  ];
  const today = [year, month + 1, day];

  const calcDate = calculator(today, datePosted);
  return calcDate;
}

const calculator = (today, datePosted) => {


  let yrsSince = today[0] - datePosted[0]; //0
  let monthsSince = today[1] - datePosted[1]; //0
  let daysSince = today[2] - datePosted[2]; //0
  if (yrsSince > 1) return `${yrsSince} years ago`;
  if (yrsSince === 1) return `${yrsSince} year ago`;
  if (monthsSince > 1) return `${monthsSince} months ago`;
  if (monthsSince === 1) return `${monthsSince} month ago`;
  if (daysSince > 1) return `${daysSince} days ago`;
  if (daysSince === 1) return `${daysSince} day ago`;
  return "today";
};
