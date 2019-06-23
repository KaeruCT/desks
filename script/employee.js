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