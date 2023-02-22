const express= require("express");
const fs=require("fs");
const sharp = require("sharp");
const {Client}=require("pg");

var client= new Client({database:"proiect", user:"murica", password:"1234", host:"localhost", port:5432});
client.connect();


app= express();

app.set("view engine","ejs");


app.use(["/resurse", "/resurse123"], express.static(__dirname+"/resurse"))

console.log("Director proiect:",__dirname);

app.get(["/", "/index", "/home"], function(req, res){
    console.log(obImagini);
    //res.sendFile(__dirname+"/index1.html");
    res.render("pagini/index", {ip:req.ip, imagini:obImagini.imagini});
})

app.get("/produse", function(req, res){
    client.query("select * from unnest( enum_range(null::categ_produse))", function(err, rezCateg){
        //console.log(rezCateg);
        var cond_where=req.query.tip ? ` categorie='${req.query.tip}'` : " 1=1";
        client.query("select * from adidasi where "+cond_where, function(err, rezQuery) {
            //console.log(rezQuery);
            res.render("pagini/produse", {produse: rezQuery.rows, optiuni:rezCateg.rows});
        });
    });
});

app.get("/produs/:id", function(req, res){
    console.log("qw");
    client.query(`select * from adidasi where id=${req.params.id}`, function(err, rezQuery) {
        //console.log(rezQuery);
        res.render("pagini/produs", {prod: rezQuery.rows[0]});
    });
});


app.get("/*.ejs", function(req, res){
    //res.sendFile(__dirname+"/index1.html");
    res.status(403).render("pagini/403");
})

/*
app.get("/despre", function(req, res){
    //res.sendFile(__dirname+"/index1.html");
    res.render("pagini/despre");
})
*/
app.get("/ceva", function(req, res, next){
    res.write("<p style='color:pink'>Salut-1</p>");
    console.log("1");
    next();
    //res.end();
})
app.get("/ceva", function(req, res, next){
    res.write("Salut-2");
   
    console.log("2");
    next();
})


app.get("/*", function(req, res){
    res.render("pagini"+req.url, function(err, rezRender){
        if (err){
            if(err.message.includes("Failed to lookup view")){
                console.log(err);
                res.status(404).render("pagini/404");
            }
            else{
                
                res.render("pagini/eroare_generala");
            }
        }
        else{
            console.log(rezRender);
            res.send(rezRender);
        }
    });
   
    //console.log("generala:",req.url);
    res.end();
})





function creeazaImagini(){
    var buf=fs.readFileSync(__dirname+"/resurse/json/galerie.json").toString("utf8");
    obImagini=JSON.parse(buf);//global

    //console.log(obImagini);
    for (let imag of obImagini.imagini){
        let nume_imag, extensie;
        [nume_imag, extensie ]=imag.fisier.split(".")// "abc.de".split(".") ---> ["abc","de"]
        let dim_mic=150;
        
        imag.mic=`${obImagini.cale_galerie}/mic/${nume_imag}-${dim_mic}.webp` //nume-150.webp // "a10" b=10 "a"+b `a${b}`
        //console.log(imag.mic);

        let dim_mediu=300;
        imag.mediu=`${obImagini.cale_galerie}/mediu/${nume_imag}-${dim_mediu}.png`

        imag.mare=`${obImagini.cale_galerie}/${imag.fisier}`;
        if (!fs.existsSync(imag.mic))
            sharp(__dirname+"/"+imag.mare).resize(dim_mic).toFile(__dirname+"/"+imag.mic);

        if (!fs.existsSync(imag.mediu))
            sharp(__dirname+"/"+imag.mare).resize(dim_mediu).toFile(__dirname+"/"+imag.mediu);
    }

}
creeazaImagini();






app.listen(8080);
console.log("A pornit")