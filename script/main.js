const q = selector => document.querySelector(selector);

const company = new Company({
    maxDesks: 5,
    funds: 1000,
    openingHour: 7,
    closingHour: 19
});

const makeEmployee = props => new Employee({
    salary: 10,
    productivity: 1,
    lunchHour: randValue([12, 1, 2]),
    ...props,
});

const start = () => {
    const initialEmployees = 5;

    for (let i = 0; i < initialEmployees; i++) {
        const { name, gender } = randValue(employeeValues);
        company.addEmployee(makeEmployee({ name, gender }));
    }

    const hourLength = 1; // in seconds
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
    const info = document.createElement('div');
    info.className = 'bb b--moon-gray pa3 info';

    info.appendChild(makeLabel('Funds', 'funds'));
    info.appendChild(makeLabel('Employees', 'employees'));
    info.appendChild(makeLabel('Desks', 'desks'));
    info.appendChild(makeLabel('Day', 'day'));
    info.appendChild(makeLabel('Time', 'time'));

    const toolbar = document.createElement('div');
    toolbar.className = 'pa3';

    const levelDropdown = makeDropdown(EMPLOYEE_LEVELS.map(el => ({
        text: `Level ${el.level} ($${el.cost})`,
        value: el.level,
    })));
    levelDropdown.className += ' mr1';
    toolbar.appendChild(levelDropdown);

    toolbar.appendChild(makeButton('Hire', () => {
        const level = EMPLOYEE_LEVELS.find(el => el.level == levelDropdown.value);
        company.costOperation(level.cost, () => {
            const { name, gender } = randValue(employeeValues);
            company.addEmployee(makeEmployee({ name, gender, ...level }));
            return true;
        });
    }));

    q('#main').append(info);
    q('#main').append(toolbar);
};

const updateUI = (company, timer) => {
    const busyDesks = company.desks.reduce((acc, desk) => {
        if (desk.employee) {
            acc += 1;
        }
        return acc;
    }, 0);
    q('#funds').innerText = `$${company.funds.toFixed(2)}`;
    q('#employees').innerText = company.employees.length;
    q('#desks').innerText = `${busyDesks} / ${company.desks.length}`;
    q('#day').innerText = DAYS[company.time.day];
    q('#time').innerText = `${company.time.hour}:00`;
};

initializeUI(company);
start();
