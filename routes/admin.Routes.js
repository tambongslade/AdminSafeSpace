const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });
const news = [
    { id: 1, title: 'News Title 1', author: 'Author 1', date: '2024-07-05', content: 'Content of news 1' },
    { id: 2, title: 'News Title 2', author: 'Author 2', date: '2024-07-06', content: 'Content of news 2' }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', image: 'example.jpg' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', image: 'example.jpg' }
  ];
//get dashboard
router.get("/", (req, res) => {
    res.render("dashboard.ejs");
});
// get alert page
router.get("/alert", (req, res) => {
    res.render("alert.ejs");
});
//get emergency add responders page
router.get("/add_responders", (req, res) => {
    res.render("add_responder.ejs");
});
//add emergency responders
router.post("/add_responder", (req, res) => {
    res.render("dashboard.ejs");
});
//get emergency responders page
router.get('/responders', (req, res) => {
    const responders = [
      { name: 'Ambulance', location: 'Buea', contact: '911', category: 'Health' },
      { name: 'Police', location: 'Buea', contact: '911', category: 'Security' }
    ];
    res.render('responder.ejs', { responders });
  });
  // get news page
  router.get("/news", (req,res)=>{
    res.render("news.ejs",{news});})
    // get add page
  router.get("/add_news", (req,res)=>{
    res.render("add_news.ejs");})
    // post new page
    router.post('/add_news', upload.single('image'), (req, res) => {
        const { title, author, date, content } = req.body;
        const image = req.file ? req.file.filename : '';
        const id = news.length ? news[news.length - 1].id + 1 : 1;
        news.push({ id, title, author, date, content, image });
        res.redirect('/alert');
      });

      router.get("/user", (req, res) => {
        res.render("users.ejs",{users});
      })
module.exports = router