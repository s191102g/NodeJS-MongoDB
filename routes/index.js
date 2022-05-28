var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mc = mongo.MongoClient;
var url = "mongodb://localhost:27017/";
/* GET home page. */
router.get('/', function(req, res, next) {
  mc.connect(url, function(err, client) {
    var db = client.db("shop");
    db.collection("categories").find({}).toArray(function(err, data) {
        res.render("loai",{loai:data});            
        client.close();
    });
});
  
});


router.get('/addCate',function (req, res, next) {
  mc.connect(url, function(err, client) {
    var db = client.db("shop");
    db.collection("categories").find({}).toArray(function(err, data) {
      let idL = data.length + 1;
        res.render("addCate",{id:idL});            
        client.close();
    });
});
 
})

router.post('/cate', function (req, res, next){
  
  let name_c = req.body.name;
  let id = parseInt(req.body.id_c);
  mc.connect(url, function(err, client) {
    var db = client.db("shop");

    var doc1 = { "id_c":id, "name_c": name_c };
    db.collection("categories").insertOne(doc1, function(err, res) {        
        console.log("Đã chèn document");
        
        client.close();
       
    });
    res.redirect("/");
});
})




router.get('/fix/:id', function (req, res, next){
  
  let id= parseInt(req.params.id) ;   
    mc.connect(url, function(err, client) {
        var db = client.db("shop");        
        var myquery = { "id_c":id };
        db.collection("categories").findOne(myquery, function(err, data) {
            res.render("fix",{cate:data});
            client.close();
        });
    });
})
router.post('/fixCate', function (req, res, next){
  let name_c = req.body.name;
  let id = parseInt(req.body.id) ;
  mc.connect(url, function(err, client) {
    var db = client.db("shop");
    var idquery = { id_c: id };
    var values = { $set: {"name_c": name_c} };
    db.collection("categories").updateOne(idquery, values,  function(err, res) {
      console.log("Da cap nhat");
      client.close();
    });
    res.redirect("/");
});
})

router.get('/dell/:id', function (req, res, next){
  let id = parseInt(req.params.id) ;
  mc.connect(url, function(err, client) {
    var db = client.db("shop");
    var myquery = { id_c: id};
    db.collection("categories").deleteOne(myquery, function(err, obj) {
        console.log("Da xoa record");
        client.close();
    });
    res.redirect("/");
});
})
module.exports = router;
