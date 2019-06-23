const q = selector => document.querySelector(selector);

const start = () => {
  const company = new Company({
    maxDesks: 5,
    funds: 1000,
    openingHour: 7,
    closingHour: 19
  });

  const initialEmployees = 5;

  for (let i = 0; i < initialEmployees; i++) {
    const { name, gender } = randValue(employeeValues);
    company.addEmployee(
      new Employee({
        name: name,
        gender: gender,
        salary: 10,
        productivity: 1,
        lunchHour: randValue([12, 1, 2])
      })
    );
  }

  const hourLength = 1; // in seconds
  let dayCounter = 0;
  let timer = 0;
  let calledStartOfDay = false;
  let calledEndOfDay = false;
  let prevDay;

  const step = () => {
    const {
      time: { hour, day },
      openingHour,
      closingHour
    } = company;
    if (prevDay !== day) {
      calledStartOfDay = false;
    }

    if (hour === openingHour && !calledStartOfDay) {
      company.startOfDay();
      calledStartOfDay = true;
      calledEndOfDay = false;
    }

    if (hour >= openingHour && hour < closingHour) {
      company.doWork();
    }

    if (hour === closingHour && !calledEndOfDay) {
      company.endOfDay();
      calledEndOfDay = true;
    }

    if (timer % hourLength === 0) {
      company.increaseHour();
    }

    updateUI(company, timer);

    timer += 1;
    prevDay = day;
    setTimeout(step, 1000);
  };

  step();
};

const initializeUI = () => {
  const label = (label, id) => {
    const container = document.createElement("div");
    container.className = "info";
    const labelEl = document.createElement("span");
    labelEl.className = "label";
    labelEl.innerText = `${label}: `;
    const value = document.createElement("span");
    value.id = id;
    container.append(labelEl);
    container.append(value);
    return container;
  };

  const info = document.createElement("div");

  info.appendChild(label("Funds", "funds"));
  info.appendChild(label("Employees", "employees"));
  info.appendChild(label("Desks", "desks"));
  info.appendChild(label("Day", "day"));
  info.appendChild(label("Time", "time"));

  q("#main").append(info);
};

const updateUI = (company, timer) => {
  const busyDesks = company.desks.reduce((acc, desk) => {
    if (desk.employee) {
      acc += 1;
    }
    return acc;
  }, 0);
  q("#funds").innerText = `$${company.funds.toFixed(2)}`;
  q("#employees").innerText = company.employees.length;
  q("#desks").innerText = `${busyDesks} / ${company.desks.length}`;
  q("#day").innerText = Calendar.days[company.time.day];
  q("#time").innerText = `${company.time.hour}:00`;
};

initializeUI();
start();
