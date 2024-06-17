const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dcRouter = require('./routes/dcs.js');
const marvelRouter = require('./routes/marvels.js');
const pokemonRouter = require('./routes/pokemons.js');

// Body Parse MiddleWare
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// New Logging Middleware 
// Supports keeping trac of requests during testing
app.use((req, res, next) => {
  const time = new Date();

  console.log(`-----${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`);

  if (Object.keys(req.body).length > 0) {
    console.log('Containing the data:');
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Serve static files from the 'styles' directory
app.use(express.static('styles'));

// API Routes
app.use('/api/dcs', dcRouter);
app.use('/api/marvels', marvelRouter);
app.use('/api/pokemons', pokemonRouter);

app.get('/', (req, res) => {
  res.json({
    links: [
      {
        href: '/api',
        rel: 'api',
        type: 'GET',
      },
    ],
  });
});

// Adding some HATEOAS links.
app.get('/api', (req, res) => {
  res.json({
    links: [
      {
        href: 'api/dcs',
        rel: 'dc',
        type: 'GET',
      },
      {
        href: 'api/dcs',
        rel: 'dc',
        type: 'POST',
      },
      {
        href: 'api/marvels',
        rel: 'marvel',
        type: 'GET',
      },
      {
        href: 'api/marvels',
        rel: 'marvel',
        type: 'POST',
      },
      {
        href: 'api/pokemons',
        rel: 'pokemon',
        type: 'GET',
      },
      {
        href: 'api/pokemons',
        rel: 'pokemon',
        type: 'POST',
      },
    ],
  });
});

// Creating a new DC Section using forms
app.get('/dcs/new', (req, res) => {
  res.send(`
    <div class="dc">
      <link rel="stylesheet" type="text/css" href="/styles.css">
      <h1>Add Another Superhero to your Justice League</h1>
      <form action="/api/dcs" method="POST">
        Name: <input type="text" name="name" /> <br><br>
        Affiliation: <input type="text" name="affiliation" /> <br/><br/>
        Enemy: <input type="text" name="enemy" /> <br><br>
        Species: <input type="text" name="species" /> <br><br>
        <input type="submit" value="Create Section" /> 
      </form>
    </div>`
  )
})

// Creating a new Marvel Section using forms
app.get('/marvels/new', (req, res) => {
  res.send(
    `<div class="marvel">
      <link rel="stylesheet" type="text/css" href="/styles.css">
      <h1>Add Another Superhero to your Avengers Team</h1>
      <form action="/api/marvels" method="POST">
        Name: <input type="text" name="name" /> <br><br>
        Affiliation: <input type="text" name="affiliation" /> <br><br>
        Enemy: <input type="text" name="enemy" /> <br><br>
        Species: <input type="text" name="species" /> <br><br>
        <input type="submit" value="Create Section" /> 
      </form>
    </div>`
  )
})

// Creating a new Pokemon Section using forms
app.get('/pokemons/new', (req, res) => {
  res.send(
    `<div class="pokemon">
      <link rel="stylesheet" type="text/css" href="/styles.css">
      <h1>Add Another Pokemon to your Team</h1>
      <div class="dcInput">
      <form action="/api/pokemons" method="POST">
        Name: <input type="text" name="name" /> <br><br>
        Type: <input type="text" name="type" /> <br><br>
        Pokedex: <input type="text" name="pokedex" /> <br><br>
        Gen: <input type="text" name="gen" /> <br><br>
        <input type="submit" value="Create Section" /> 
      </form>
      </div>
    </div>`
  )
})

// Middleware Support
app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Resource Not Found' });
});

app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});

// app.get("/", (req, res) => {

//   res.send("Welcome to the base/home page");
// });

// app.get("/express", (req, res) => {
//   res.send("Made it to the express page");
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}`);
// });
