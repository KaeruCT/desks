class Company {
    constructor({ maxDesks, funds, openingHour, closingHour }) {
        this.employees = [];
        this.desks = [];
        this.maxDesks = maxDesks;
        this.funds = funds;
        this.openingHour = openingHour;
        this.closingHour = closingHour;
        this.time = {
            hour: openingHour,
            day: 0,
        };

        this.createDesks();
    }

    increaseHour() {
        const { closingHour, openingHour } = this;
        this.time.hour += 1;
        if (this.time.hour == closingHour + 1) {
            // day ended
            this.time.day += 1;
            this.time.hour = openingHour;

            if (this.time.day === DAYS.length) {
                // week ended
                this.time.day = 0;
            }
        }
    }

    addFunds(funds) {
        this.funds += funds;
    }

    takeFunds(funds) {
        this.funds -= funds;
    }

    makeDesk(props) {
        return {
            productivity: props.productivity,
            employee: null,
        };
    }

    createDesks() {
        for (let i = 0; i < this.maxDesks; i++) {
            // TODO add different productivities to desks
            this.desks.push(this.makeDesk({ productivity: 1 }));
        }
    }

    addEmployee(employee) {
        console.log('adding employee');
        this.employees.push(employee);
        employee.company = this;
    }

    findEmptyDesk() {
        return this.desks.find(desk => !desk.employee);
    }

    doWork() {
        const totalFunds = this.desks.reduce((acc, desk) => {
            if (desk.employee) {
                acc += desk.employee.doWork(this.time);
            }
            return acc;
        }, 0);
        this.addFunds(totalFunds);
    }

    startOfDay() {
        // allocate seating
        this.employees.forEach(employee => {
            const emptyDesk = this.findEmptyDesk();
            if (emptyDesk) {
                emptyDesk.employee = employee;
                employee.desk = emptyDesk;
            }
        });
    }

    endOfDay() {
        // clear seating
        this.desks.forEach(desk => {
            const { employee } = desk;
            if (employee) {
                employee.desk = null;
            }
            desk.employee = null;
        });

        // pay salaries
        const salariesPaid = this.employees.reduce((acc, employee) => {
            return acc + employee.salary;
        }, 0);
        this.takeFunds(salariesPaid);
    }
}
