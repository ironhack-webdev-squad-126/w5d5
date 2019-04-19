const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/database-name', {
  useNewUrlParser: true
});

const employeeSchema = new Schema({
  name: String,
  position: String,
  companies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  ],
  former_company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  }
});

const companySchema = new Schema({
  name: String,
  location: String
});

const Employee = mongoose.model('Employee', employeeSchema);
const Company = mongoose.model('Company', companySchema);

Employee.collection.drop();
Company.collection.drop();

const createCompanyAndFirstEmployee = (companyData, employeeData) => {
  return Company.create(companyData).then(company => {
    employeeData.companies = [company._id];
    employeeData.former_company = company._id;

    return Employee.create(employeeData).then(() => {
      console.log('created employee successfully');
    });
  });
};

const getEmployees = () => {
  return (
    Employee.find({})
      // .populate('companies')
      // .populate('former_company')
      .then(employees => {
        console.log(employees);
      })
  );
};

createCompanyAndFirstEmployee(
  { name: 'Ironhack', location: 'Berlin' },
  { name: 'Mike', position: 'GM' }
)
  .then(getEmployees)
  .catch(err => {
    console.error(err);
  });

// https://mongoosejs.com/docs/populate.html
