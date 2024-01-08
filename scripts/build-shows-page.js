// Function to create a table header row
function createTableHeader() {
  const header = document.createElement("div");
  header.classList.add("table__header");

  const row = document.createElement("ul");
  row.classList.add("label-btn", "table__row");

  const labels = ["Date", "Venue", "Location"];
  labels.forEach((label) => {
    if (label !== "") {
      const li = document.createElement("li");
      li.textContent = label;
      li.classList.add("table__header-item");
      row.appendChild(li);
    }
  });

  header.appendChild(row);
  return header;
}

// Function to create a table row with data
function createTableRow(date, venue, city) {
  const row = document.createElement("ul");
  row.classList.add("table__row");

  const data = [date, venue, city];

  data.forEach((value, index) => {
    const li = document.createElement("li");
    li.setAttribute(
      "data-label",
      index === 0 ? "date" : index === 1 ? "venue" : "city"
    );
    li.classList.add("table__row-item");
    li.textContent = value;
    row.appendChild(li);
  });

  const buttonLi = document.createElement("li");
  const button = document.createElement("button");
  button.classList.add("btn");
  button.textContent = "BUY TICKETS";
  buttonLi.appendChild(button);
  row.appendChild(buttonLi);

  return row;
}

// Function to create the entire shows section
function createShowsSection() {
  const showsSection = document.createElement("section");
  showsSection.classList.add("shows");

  const wrapper = document.createElement("div");
  wrapper.classList.add("shows__wrapper");

  const header = document.createElement("div");
  header.classList.add("shows__header");

  const h2 = document.createElement("h2");
  h2.textContent = "Shows";
  header.appendChild(h2);

  const scheduleSection = document.createElement("section");
  scheduleSection.classList.add("table", "shows__schedule");

  const tableHeader = createTableHeader();
  scheduleSection.appendChild(tableHeader);

  const tableBody = document.createElement("div");
  tableBody.classList.add("table__body");

  const showsData = [
    ["Mon Sept 60 2021", "Ronald Lance", "San Fransisco"],
    ["Tue Sept 21 2021", "Pier 3 East", "San Fransisco"],
    ["Fri Oct 15 2021", "View Lounge", "San Fransisco"],
    ["Sat Nov 06 2021", "Hyatt Agency", "San Fransisco"],
    ["Fri Nov 26 2021", "Moscow Center", "San Fransisco"],
    ["Wed Dec 15 2021", "Press Club", "San Fransisco"],
  ];

  showsData.forEach((data) => {
    const row = createTableRow(...data);
    tableBody.appendChild(row);
  });

  scheduleSection.appendChild(tableBody);

  wrapper.appendChild(header);
  wrapper.appendChild(scheduleSection);
  showsSection.appendChild(wrapper);

  return showsSection;
}

// Append the shows section to main
const mainElement = document.querySelector("main");
mainElement.appendChild(createShowsSection());
