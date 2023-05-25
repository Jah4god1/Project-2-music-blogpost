const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the main page
router.get('/', (req, res) => {
  console.log('i made it to this route')
  res.render('frontpage');
});

// Use withAuth middleware to prevent access to route
router.get('/userhome', withAuth, async (req, res) => {
  // router.get('/userhome', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('userhome', {
      ...user,
      // style: "userhome.css",
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }finally{
    res.render('frontpage');
  }
  
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/userhome');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/userhome');
    return;
  }

  res.render('signup');
});


router.get('/post', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('post', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// maybe need for posts 

// Use withAuth middleware to prevent access to route
// router.get('/post', async (req, res) => {
// router.get('/post', withAuth, async (req, res) => {  
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       // const userData = User.findAll( {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('post', {
//       ...user,
//       // style: "userhome.css",
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//    }//finally{
// //     res.render('post');
// //   }
  
// });









// router.get('/signup', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/userhome');
//     return;
//   }

//   res.render('signup');
// });


module.exports = router;

// app.get("/profile", (req, res) => {
//   db.Joke.findAll({ raw: true, where: { UserId: req.user.id } }).then(
//     (data) => {
//       const userList = {
//         Joke: data,
//         style: "profile.css",
//         logic: "profile.js",
//       };
//       res.render("profile", userList);
//     }
//   );
// });
