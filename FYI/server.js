require('dotenv').config()
const https = require('https');
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
//let cookie_parser=require('cookie-parser')
const port = 3000
const authnew = require('./models/authnew')
var newUsers = [];
var userData = [];
var clientEndpoints = [];

var push = require('web-push');

let vapidKeys = {
	publicKey: 'BNwrb9_xQVsoC17OkhQh5s5zhqy4xZt8btyrfPbEGtKw2uiIxKKdvlMtaJSucYTY3M9w3eNatG9gHud5UUGjX3o',
	privateKey: 'Yz_24XyX9koGDApnwEqmeBd3IlQGVXwgGVjpGOhXgyM'
};



push.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);





app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/public/index.html')
});
app.get('/otp', (req, res) => {
	let otp = generateRandomOTP();
	//sms_sender(req.query.phoneNumber,otp);
	console.log(req.query.phoneNumber + ' otp is ' + otp)
	save(req.query.phoneNumber,otp)
})

app.post('/',(req,res)=>{
	if(validate(req.body.otp,req.body.phoneNumber)){
		const uniqueId = generateUniqueId();
		userData.push({phone:req.body.phoneNumber,status:"hello World!",uniqueId:uniqueId,endpoint:{}})
		console.log(userData)
		//delete this record from newUsers now
		res.cookie('uniqueId',uniqueId)
		res.redirect('/secure')

	}
	else{
		res.send('please try again')
	}
})
app.get('/secure', (req, res) => {
	if(req.cookies.uniqueId==undefined){
		res.redirect("/");
		return;
	}
	if(!checkIfUniqueIdExist(req.cookies.uniqueId)){
		res.redirect("/")
		return;
	}
	res.sendfile(__dirname + '/public/secure.html')
})

app.get('/updateStatus', (req, res) => {
	for(let i=0;i<userData.length;i++){
		if(userData[i].uniqueId==req.query.uniqueId){
			userData[i].status = req.query.status;
			
			
			for(let j=0;j<userData.length;j++){
				if(userData[j].uniqueId!=req.query.uniqueId){
					if(userData[j].endpoint.hasOwnProperty('endpoint')){
						let sub = userData[j].endpoint;
						push.sendNotification(sub,`phone Number:${userData[i].phone}  status:${userData[i].status}`);
					}
				}
			}
		}
	}
	console.log(userData)
	return;
})


app.get('/getContactsFYI', async (req, res) => {
	const uniqueId = req.query.uniqueId
	const contactList = req.query.contacts.split(',')
	var toSend = [];
	for(let i=0;i<userData.length;i++){
		if(userData[i].uniqueId!=uniqueId)
			toSend.push({status:userData[i].status,phoneNumber:userData[i].phone})
	}
	//toSend.push({status:findStatus(contactList[i]),phoneNumber:contactList[i]})
	res.json(toSend);	
})
app.get('/contacts', async (req, res) => {
	if(req.cookies.uniqueId==undefined){
		res.redirect("/");
		return;
	}
	if(!checkIfUniqueIdExist(req.cookies.uniqueId)){
		res.redirect("/")
		return;
	}
	res.sendfile(__dirname + '/public/contacts.html')	
})
app.get('/getRegisterForNotification', async (req, res) => {
	const uniqueId = req.query.uniqueId
	const endpoint = JSON.parse(req.query.endpoint);
	for(let i=0;i<userData.length;i++){
		if(userData[i].uniqueId==uniqueId){
			userData[i].endpoint=endpoint;
			break;
		}
	}
	console.log(userData)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
}) 
                  
function findStatus(phoneNumber){
	for(let i=0;i<userData.length;i++){
		if(userData[i].phone==phoneNumber) return userData[i].status
	}
	return ""
} 
function validate(otp,phoneNumber){	
	for(let i=0;i<newUsers.length;i++){
		if(newUsers[i].phone==phoneNumber && newUsers[i].otp==otp) return true;
	}
	return false;
}

function sms_sender(number,message){
	const accountSid = process.env.SID;
	const authToken = process.env.TOKEN;
	const client = require('twilio')(accountSid, authToken);
	client.messages.create({body: `Your FYI verification code is ${message}`, from: '+12058276053', to: `+91${number}`}).then(message => console.log(message.sid));
}  

function checkIfUniqueIdExist(uniqueId){
	for(let i=0;i<userData.length;i++){
		if(userData[i].uniqueId==uniqueId) return true;
	}
	return false;
}   
function generateRandomOTP(){
	return Math.floor(111111 + (888888*Math.random()));
}
function generateUniqueId(){
	//shouldnt be same as previous
	return Math.floor(111 + (888*Math.random()));
}
function save(phoneNumber,otp){
	newUsers.push({phone:phoneNumber,otp:otp});	
}
//schema
//newUsers[{
//	phone:NUMBER,
//	otp:NUMBER
//}]
//userData[{
//	phone:NUMBER,
//	status:STRING,
//	uniqueId:NUMBER,
//	endpoint:OBJECT
//}]       