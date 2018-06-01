function car(make, model, year, vType, fType, color, price, owner, phone, img) {
	return {make, model, year, vType, fType, color, price, owner, phone, img}
};
function log(text, status, date = new Date()) { return {text, status, date}}
var cars = [
	car('Audi', 'Q3', '2015', 'Off-road', 'Diesel', 'White', 11200, 'Henry', '+1-255-457-1478', 'img/Audi.png'),
	car('Volvo', 'S60', '2014', 'Sedan', 'Petrol', 'Brown', 3600, 'Alex', '+1-202-456-1441', 'img/Volvo.png'),
	car('Jaguar', 'F-Pace', '2013', 'Off-road', 'Petrol', 'White', 7500, 'John', '+1-806-357-7912', 'img/Jaguar-F-PACE.png'),
	car('Mercedes', 'GLE', '2016', 'Off-road', 'Diesel', 'Gray', 13800, 'Andy', '+3-754-456-9874', 'img/2016-mercedes-benz-gle-300d-4wd-suv.png'),
	car('Hyundai', 'Elantra', '2017', 'Sedan', 'Petrol', 'White', 6200, 'Sam', '+1-492-374-9851', 'img/elantra.png')
].sort(function compareName(nameA, nameB) {
  if (nameA.make > nameB.make) return 1;
  else if (nameA.make < nameB.make) return -1
	else if (nameA.model > nameB.model) return 1;
	else if (nameA.model < nameB.model) return -1;
	else if (+nameA.price > +nameB.price) return 1;
})

var app = new Vue({
	el: '#app',
	data: {
		cars: cars,
		car: cars[0],
		activeCarIndex: 0,
		phoneVisibility: false,
		search: '',
		modalVisibility: false,
		logs: []
	},
	methods: {
		selectCar: function(index){
			this.car = cars[index];
			this.activeCarIndex = index;
			this.phoneVisibility = false;
		},
		cancelOrder: function() {
			this.modalVisibility=false;
			this.logs.unshift(log(`Canceled order: ${this.car.make} ${this.car.model}, ${this.car.price}€`, 'cnl'));
		},
		newOrder: function() {
			this.modalVisibility=false;
			this.logs.unshift(log(`New order: ${this.car.make} ${this.car.model}, ${this.car.price}€`, 'ok'));
		}
	},
	computed: {
		phoneBtnText: function() {
			return this.phoneVisibility ? 'Hide phone' : 'Show phone' 
		},
		phoneLink: function() {
			return 'tel:' + this.car.phone
		},
		filteredCars() {
			const self = this;
			return this.cars.filter(function(car) {
				return car.make.toLowerCase().indexOf(self.search.toLowerCase()) > -1 || car.model.toLowerCase().indexOf(self.search.toLowerCase()) > -1
			})
		}
	},
	filters: {
		date: function(date) {
			return date.toLocaleString()
		}
	}
}) 