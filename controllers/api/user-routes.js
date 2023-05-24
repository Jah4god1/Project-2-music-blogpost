const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { User } = require('../../models');

// //NEED POST endpoints 
// //CREATE
// router.post('/', async(req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.is;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// //LOGIN endpoint (find User)
// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({where: {email: req.body.email} });

//     if (!userData) {
//       res
//         .status(400)
//         .json ({ message: 'Incorrect email or password, please try again'});
//         return;
//     }
// //COMPARES hashed password against stored password
//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or passwork, please try again'});
//       return;
//     }

// //UPDATE
//     req.session.save(() =>  {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.json ({ user: userData, message: 'You are now logged in!'});
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// //LOGOUT
// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// // Delete user account
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Delete the user by their ID
//     await User.destroy({ where: { id } });

//     res.status(204).end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to delete user' });
//   }
// });

// // Delete a user's post
// router.delete('/posts/:postId', async (req, res) => {
//   try {
//     const { postId } = req.params;

//     // Delete the post by its ID
//     await Post.destroy({ where: { id: postId } });

//     res.status(204).end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to delete post' });
//   }
// });

// module.exports = router;