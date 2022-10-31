const express = require('express')
const parseUrl = require('parseUrl')
const path = require('path');
var bodyParser = require('body-parser')
//const puppeteer = require('puppeteer');
const Client = require("twitter-api-sdk");
const keys = require('./keys')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine','ejs')

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', function(req, res) {
	var toClient = {
		name:"Name",
		username:"username",
		tweetText:"Tweet Text",
		time:"1:35 PM",
		dateYear:"Oct 14, 2022",	
		version:"Twitter for iPhone",
		profileUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png?20150316143248"
	}
	res.render('index',toClient);
});
app.post('/',async (req,res) => {
	if(typeof req.body.tweetLink === 'undefined'){
		res.status(400).json({ error: 'missing parameter tweetLink', data: null }); // Only an  example
		return;
	}
	try {

	let tweetLink = req.body.tweetLink;
	console.log(tweetLink)
	let data = await classifyTweetParameters(tweetLink);

	let date = new Date(data.data.created_at);
	let timeModified="";
	if(date.getHours()<12){
		timeModified+=(date.getHours() + ":" + date.getMinutes() + " AM");
	}else if(date.getHours()==12){
		timeModified+=(date.getHours() + ":" + date.getMinutes() + " PM")
	}else{
		timeModified+=((date.getHours()-12) + ":" + date.getMinutes() + " PM")
	}
	let dateYear = "" + date.toDateString().split(" ")[1] + " " + date.toDateString().split(" ")[2] + ", " + date.toDateString().split(" ")[3];
	const toClient = {
		name:data.includes.users[0].name,
		username:data.includes.users[0].username,
		tweetText:data.data.text,
		time:timeModified,
		dateYear:dateYear,	
		version:data.includes.tweets[0].source,
		profileUrl:data.includes.users[0].profile_image_url
	}
	res.render('index',toClient);
}
catch(err) {
	var toClient = {
		name:"Name",
		username:"username",
		tweetText:"Tweet Text",
		time:"1:35 PM",
		dateYear:"Oct 14, 2022",	
		version:"Twitter for iPhone",
		profileUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png?20150316143248"
	}
  res.render('index',toClient);
}
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
});
//classifyTweetParameters("https://twitter.com/");
async function classifyTweetParameters(tweetLink){
	var param = tweetLink.split("https://twitter.com/")
	if(param.length!=2) return "invalid"
	param = param[1];
	const final_split = param.split("/status/")
	if(final_split.length!=2) return "invalid";
	const usr = final_split[0];
	const status = final_split[1].split("?")[0];
	const tweetData = await twitterAPI(usr,status);
	return tweetData;
}
async function twitterAPI(usr,status){
	const client = new Client.Client(keys.bearerToken);

const response = await client.tweets.findTweetById(status, {
    "tweet.fields": [
        "attachments",
        "created_at",
        "geo",
        "lang",
        "referenced_tweets",
        "source",
        "text",
        "withheld"
    ],
    "expansions": [
        "attachments.media_keys",
        "attachments.poll_ids",
        "author_id",
        "edit_history_tweet_ids",
        "entities.mentions.username",
        "geo.place_id",
        "in_reply_to_user_id",
        "referenced_tweets.id",
        "referenced_tweets.id.author_id"
    ],
    "media.fields": [
        "alt_text",
        "duration_ms",
        "height",
        "media_key",
        "organic_metrics",
        "preview_image_url",
        "type",
        "url",
        "variants",
        "width"
    ],
    "user.fields": [
        "created_at",
        "description",
        "entities",
        "id",
        "location",
        "name",
        "profile_image_url",
        "url",
        "username",
        "verified",
        "withheld"
    ],
    "place.fields": [
        "contained_within",
        "country",
        "country_code",
        "full_name",
        "geo",
        "id",
        "name",
        "place_type"
    ]
  });

  
  return response;

}
//use new Date(Z time goes here)