#!/usr/bin/env node

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


let __sendEmail = function(to, from, subject, callback) {
    let template = "Wishing you a Merry Christmas and a " + 
        "prosperous year ahead. P.S Toby I hate you";
    let helper = require('sendgrid').mail;
    let fromEmail = new helper.Email(from.email, from.name);
    let toEmail = new helper.Email(to.email, to.name);
    let body = new helper.Content("tex/plain", template);
    let mail = new helper.Mail(fromEmail, subject,toEmail, body);

    let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()

    })

}

sg.API(request, function(error, request) {
    if(error) {return callback(error)}
    callback()
});

stream
    .on('error', function(error) {
        return console.error(err.response);
    })
    .on('data', function(data) {
        let name = data[0] + " " + data[1];
        let email = data[2];
        contactList.push({name: name, enail: email});
    })
    .on('end', function(end) {
        inquirer.prompt(questions).then(function(answers) {
            async.each(contactList, function(reciepients,fn) {
                __sendEmail(reciepients, ans.sender, ans.subject, fn);

            }, function(err){
                if(err) {
                    return console.error(chalk.red(err.message))
                } else {
                    console.log(chalk.green('success'));
                }
            })
        })
    })

console.log(program.list);

