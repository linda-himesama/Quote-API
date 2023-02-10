const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });

app.get('/api/quotes/random',(req,res,next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
});

app.get('/api/quotes',(req,res,next) => {
    //console.log("the query is" + res.query);
    if (req.query.person !== '') {
        const personalQuotes = quotes.filter(quote => quote.person === req.query.person);
        res.send({quotes: personalQuotes});
    }else{
    res.send({ quotes: quotes });
    }
});

app.post('/api/quotes', (req,res,next) => {
    if (req.query.quote !== '' && req.query.person !== ''){
        let newQuote =
        {
            quote: req.query.quote,
            person:  req.query.person
        }

        quotes.push(newQuote);
        res.status(201).send({ quote: newQuote });
    } else {
        res.status(400).send();
    }
});