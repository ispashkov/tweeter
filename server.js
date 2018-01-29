import express from 'express'
import Twitter from 'twitter'

const app = express();
const client = new Twitter({
  consumer_key: 'gK0S9GypjsKiMytmLJ9gvvm1a',
  consumer_secret: 'kFbMVQLK6OsLCMJso7VEaz0BFv0nycBplzkYz3JK20hroqbmZJ',
  access_token_key: '887751309885153282-M2fMGYWalcXEYjY7ARY2JwVQWD6fPuQ',
  access_token_secret: 'Sn9dHJfrjDCERf3P3OJjCAr7JHlw2MutQ2ce6HwomrHj2'
});

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.post('/search/:query', (req, res) => {
  client.get('https://api.twitter.com/1.1/search/tweets.json', {
    q: req.params.query,
    count: 15
  }).then(data => {
    res.status(200).json({
      tweets: data.statuses
    })
  }).catch(error => {
    res.status(500).json({
      error
    })
  })
})

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

app.listen(3000, () => console.log('Server running on localhost:3000'))
