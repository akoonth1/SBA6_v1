import express from 'express';

import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from '../models/user_schema.mjs';
import router from './foodroute.mjs';

dotenv.config();


const user_router = express();


user_router.get('/testing', (req, res) => {
    res.send('Hello World User Route');
});

//Create

user_router.post('/create', async (req, res) => {
    try {
        let newUser = new User(req.body);


        await newUser.save();

        res.json(newUser);
   
    } catch (err) {
        res.status(500).json({ error: err });
    }

});


//Read
user_router.get('/all', async (req, res) => {
    try {
        let allUsers = await User.find();
        res.json(allUsers);
   
    } catch (err) {
        res.status(500).json({ error: err });
    }

});

//Read USer by doc id
user_router.get('/single/:id', async (req, res) => {
    try {
        let oneUsers = await User.findById(req.params.id);
        res.json(oneUsers);
   
    } catch (err) {
        res.status(500).json({ error: err });
    }

});

// //Read by idNum
user_router.get('/idnum/:idNum', async (req, res) => {
    try {
        let oneUser = await User.findOne({ idNum: req.params.idNum });
        if (!oneUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(oneUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// Update by doc id
user_router.put('/update/:id', async (req, res) => {
    try {
        let updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updateUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Update by name
user_router.put('/update/name/:name', async (req, res) => {
    try {
        let updateUser = await User.findOneAndUpdate(
            { name: req.params.name },
            req.body,
            { new: true }
        );
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updateUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete by doc id
user_router.delete('/single/:id', async (req, res) => {
    try {
        let deleteOneUsers = await User.findByIdAndDelete(req.params.id);
        if (!deleteOneUsers) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(deleteOneUsers);
   
    } catch (err) {
        res.status(500).json({ error: err });
    }

});


// user_router.put('update/:id', async (req, res) => {
//     try {
//         //let updateUser = await User.findOneAndUpdate( req.params.id, req.body, {new: true});
//         let updateUser = await Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true})
//         res.json(updateUser);

   
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }

// });


// // Update
// router.put('/:id', async (req, res) => {
//     try {
//       let updatedFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true});
  
//       res.json(updatedFruit)
  
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ msg: 'Server Error' });
//     }
//   });

// // Delete
// router.delete('/:id', async (req, res) => {
//     try {
//       let deletedFruit = await Fruit.findByIdAndDelete(req.params.id)
  
//       res.json(deletedFruit)
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ msg: 'Server Error' });
//     }
//   });



//   //Find ripe
// router.get('/ripe', async (req, res) => {
//     try {
//         let ripeFruits = await Fruit.areRipe();
//         res.json(ripeFruits);
   
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }

// });


export default user_router;
