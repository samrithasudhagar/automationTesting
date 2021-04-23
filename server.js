var express = require('express');
const fs = require('fs')
const nodepath = require('path');
const axios = require('axios');
const favicon = require("serve-favicon")


var app = express();

var path = __dirname + '/src/web/build';
var port = 8080;

// const defaultImg = "https://d11z36dj5c0s43.cloudfront.net/public-assets/images/icons/apple-touch-icon-precomposed-152x152.png"
const defaultImg = 'http://s3.amazonaws.com/v3-media.dashingdish.com/media/images/000/003/571/original/Icon.png?1580904803'

const hostedUrl = "https://new-dashingdish.herokuapp.com"
const getMetaDateUrl = "https://new-dashingdish-backend.herokuapp.com"


app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';

  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.use(express.static(path, { index: false }));



// app.use(favicon(nodepath.join(__dirname, 'src', 'web', 'build', 'img', 'favicon.png')))


app.get('/', function (request, response) {


  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }


    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, 'Home Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "Dashing Dish | Real. Simple. Healthy Living");
    result = data.replace(/\$OG_IMAGE/g, defaultImg);


    response.send(result);

  });
});


app.get('/home', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }


    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, 'Home Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "Dashing Dish | Real. Simple. Healthy Living");
    result = data.replace(/\$OG_IMAGE/g, defaultImg);


    response.send(result);

  });
});




app.get('/recipe/:slug', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    axios.get(`${getMetaDateUrl}/api/recipes/intro/${request.params.slug}`)
      .then(res => {
        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, `${res.data.title} | Dashing Dish`);
        data = data.replace(/\$OG_DESCRIPTION/g, `${res.data.description}`);
        result = data.replace(/\$OG_IMAGE/g, `${(res.data.images.square_400) ? res.data.images.square_400 : defaultImg}`);
        response.send(result);
      })
      .catch(err => {
        console.log(err)
        response.redirect(`${hostedUrl}/recipes`)
      })

  });
})

app.get('/workout/:slug', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }


    axios.get(`${getMetaDateUrl}/api/workouts/intro/${request.params.slug}`)
      .then(res => {
        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, `${res.data.title} | Dashing Dish`);
        data = data.replace(/\$OG_DESCRIPTION/g, `${res.data.description}`);
        result = data.replace(/\$OG_IMAGE/g, `${(res.data.images.square_400) ? res.data.images.square_400 : defaultImg}`);
        response.send(result);
      })
      .catch(err => {
        console.log(err)
        response.redirect(`${hostedUrl}/workouts`)
      })




  });
})


const metaBuilder = (data, name) => {
  // replace the special strings with server generated strings
  data = data.replace(/\$OG_TITLE/g, name);
  data = data.replace(/\$OG_DESCRIPTION/g, `${name} | Dashing Dish`);
  result = data.replace(/\$OG_IMAGE/g, defaultImg);

  return result

}

app.get('/blog/:slug', function (request, response) {



  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  if (request.params.slug === "preview") {
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        return console.log("err", err);
      }


      const result = metaBuilder(data, 'Blog')

      response.send(result);

    });
  }

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }


    axios.get(`${getMetaDateUrl}/api/blogs/intro/${request.params.slug}`)
      .then(res => {

        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, `${res.data.title} | Dashing Dish`);
        data = data.replace(/\$OG_DESCRIPTION/g, '');
        result = data.replace(/\$OG_IMAGE/g, `${(res.data.images.square_400) ? res.data.images.square_400 : defaultImg}`);
        response.send(result);
      })
      .catch(err => {
        console.log(err)
        response.redirect(`${hostedUrl}/blog/preview`)
      })

  });
})

app.get('/video/:slug', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }


    axios.get(`${getMetaDateUrl}/api/videos/intro/${request.params.slug}`)

      .then(res => {
        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, `${res.data.title} | Dashing Dish`);
        data = data.replace(/\$OG_DESCRIPTION/g, '');
        result = data.replace(/\$OG_IMAGE/g, `${(res.data.images.square) ? res.data.images.square : defaultImg}`);
        response.send(result);
      })
      .catch(err => {
        response.redirect(`${hostedUrl}/videos`)

        console.log(err)
      })


  });
});


app.get('/about', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }


    const result = metaBuilder(data, 'About Us')

    response.send(result);

  });

});

app.get('/recipes', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }


    const result = metaBuilder(data, 'Recipes')

    response.send(result);

  });

});

app.get('/workouts', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }


    const result = metaBuilder(data, 'Workouts')

    response.send(result);

  });

});



app.get('/my-story', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'My Story')

    response.send(result);

  });
});

app.get('/books', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Books')

    response.send(result);

  });
});

app.get('/press-kit', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Press Kit')

    response.send(result);

  });
});

app.get('/get-started', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Getting Started Tutorials')

    response.send(result);

  });
});

app.get('/application', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'App')

    response.send(result);

  });
});

app.get('/contact', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Contact Us')

    response.send(result);

  });
});


app.get('/tv-show', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'TV Show')

    response.send(result);

  });
});

app.get('/shop/gift-memberships', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Gift of Healthy Living')

    response.send(result);

  });
});



app.get('/account/membership', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Membership')

    response.send(result);

  });
});

app.get('/account/referral', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Referral')

    response.send(result);

  });
});

app.get('/account/updates', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Updates')

    response.send(result);

  });
});


app.get('/faqs', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, `FAQ's`)

    response.send(result);

  });
});


app.get('/account', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Account')

    response.send(result);

  });
});



app.get('/videos', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Videos')

    response.send(result);

  });
});



app.get('/recipes/favorites', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Recipes Favorites')

    response.send(result);

  });
});

app.get('/workouts/favorites', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Workouts Favorites')

    response.send(result);

  });
});

app.get('/blog/favorites', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Blogs Favorites')

    response.send(result);

  });
});

app.get('/videos/favorites', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Videos Favorites')

    response.send(result);

  });
});



app.get('/grocery-list', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Grocery List')

    response.send(result);

  });
});

app.get('/calendar', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Calender')

    response.send(result);

  });
});

app.get('/login', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Login')

    response.send(result);

  });
});

app.get('/register', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Free 7-Day Trial')

    response.send(result);

  });
});



app.get('/choose-plan', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Choose Plan')

    response.send(result);

  });
});


app.get('/Payment', function (request, response) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    const result = metaBuilder(data, 'Payment')

    response.send(result);

  });
});

// Links that redirect for SEO needs
app.get('/recipes/:type', function (req, res) {
  res.redirect(`${hostedUrl}/recipes?food-types=${req.params.type}`)
})

app.get('/workouts/:type', function (req, res) {
  res.redirect(`${hostedUrl}/workouts?workout-types=${req.params.type}`)
})

app.get('/videos/:type', function (req, res) {
  res.redirect(`${hostedUrl}/videos?categories=${req.params.type}`)
})


app.get('/*', function (req, res) {

  const filePath = nodepath.resolve(__dirname + '/src/web/build/index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log("err", err);
    }

    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, '404 Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "Sorry, This page is not found");
    result = data.replace(/\$OG_IMAGE/g, defaultImg);

    res.send(result);

  });
});

app.get('*', function (req, res) {

  res.sendFile(path + '/index.html');
});



app.listen(process.env.PORT || port, () => console.log(`server started at ${port} - new bluid`));
