const EMPLOYEE_LEVELS = [1, 2, 3, 4, 5].map(level => {
    const base = Math.ceil(10 * Math.log(level + 1));

    return {
        level,
        cost: Math.pow(base, 3),
        salary: Math.pow(base, 2),
        productivity: base * 10,
    };
});

class Employee {
    constructor(props) {
        this.name = props.name;
        this.salary = props.salary; // daily
        this.gender = props.gender;
        this.productivity = props.productivity;
        this.lunchHour = props.lunchHour;
    }
    doWork(time) {
        // hourly work
        const { hour, day } = time;
        let dayModifier = 1;
        let hourModifier = 1;

        if (hour === this.lunchHour) {
            hourModifier = 0;
        }

        if (day === 'Fri') {
            dayModifier = 0.8;
        }

        if (hour >= this.lunchHour-1 && hour <= this.lunchHour+1) {
           hourModifier = 0.8;
        }
        
        if (hour >= this.company.closingHour - 1) {
            hourModifier = 0.5;
        }
        return this.productivity * this.desk.productivity * hourModifier * dayModifier;
    }
}