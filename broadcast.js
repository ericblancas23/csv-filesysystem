const program = require('commander');
const csv = require('csv');
const fs = require('fs');



program 
    .version('0.0.1')
    .option('-l, --list, [list]', 'list of customers in csv file')
    .parse(process.argv);

let questions = [
    {
        type: "input",
        name: "sender.name",
        message: "Sender's email address"
    },
    {
        type: "input",
        name: "sender.name",
        message: "Sender's name"
    },
    {
        type: "input",
        name: "subject",
        message: "Subject - "
    }
]


let  contactList = []
let parse = csv.parse;
let stream = fs.createReadStream(program.list)
    .pipe(parse({ delimiter: ','}));

stream
    .on('error', function(error) {
        return console.error(err.message);
    })
    .on('data', function(data) {
        let firsname = data[0];
        let lastname = data[1];
        let email = data[2];
        console.log(firstname, lastname, email);
    })
    .on('end', function(end) {
        inquirer.prompt(questions).then(function(answers) {
            console.log(answers);
        })
    })

console.log(program.list);

