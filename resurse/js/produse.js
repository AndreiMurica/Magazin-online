window.onload=function()    {
    document.getElementById("inp-pret").onchange=function() {
        document.getElementById("infoRange").innerHTML="("+this.value+")";
    }

    var btn=document.getElementById("filtrare");
    btn.onclick=function(){
        var valNume=document.getElementById("inp-nume").value.toLowerCase();
        var butoaneRadio=document.getElementsByName("gr_rad");
        for (let rad of butoaneRadio) {
            if (rad.checked) {
                var valMarime=rad.value;
                break;
            }
        }
        var valPret=document.getElementById("inp-pret").value;
        var articole=document.getElementsByClassName("produs");
        var optiuni=document.getElementById("i_sel_multiplu").options;
        console.log(optiuni);
        var valCategorie=document.getElementById("inp-categorie").value;
        for(let art of articole){

            art.style.display="none";


            var numeArt=art.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase();
            var cond1=numeArt.startsWith(valNume); 

            let marimeArt=art.getElementsByClassName("val-marimi")[0].innerHTML;
            let cond2=marimeArt.includes(valMarime.toString());
            if(valMarime=="toate") {
                cond2=true;
            }
            console.log(marimeArt);


            var pret=parseInt(art.getElementsByClassName("val-pret")[0].innerHTML);
            let cond3=(valPret<=pret);

            let categorieArt=art.getElementsByClassName("val-categorie")[0].innerHTML;
            console.log(categorieArt);
            console.log(valCategorie);
            let cond4=(valCategorie=="toate") || (categorieArt==valCategorie);

            let culoriArt=art.getElementsByClassName("val-culori")[0].innerHTML;
            let cond5=true;
            for(let opt of optiuni){
                if(opt.selected) {
                    if (!culoriArt.includes( opt.value)){
                        cond5=false;
                    }
                    if(opt.value=="toate") {
                        cond5=true;
                        break;
                    }
                }
            }
             let conditieFinala=cond1 && cond2 && cond3 && cond4 && cond5;
            if (conditieFinala) {
                art.style.display="block";
            }
        }
    
    }
    var reset=document.getElementById("resetare");

    function sorteaza(semn){
        var articole=document.getElementsByClassName("produs");
        var v_articole=Array.from(articole);
        v_articole.sort(function(a,b){
            var pret_a=parseInt(a.getElementsByClassName("val-pret")[0].innerHTML);
            var pret_b=parseInt(b.getElementsByClassName("val-pret")[0].innerHTML);
            if(pret_a!=pret_b){
                return semn*(pret_a-pret_b);
            }
            else{
                
                var marimi_a=a.getElementsByClassName("val-marimi")[0].innerHTML;
                var marimi_b=b.getElementsByClassName("val-marimi")[0].innerHTML;
                return semn*(marimi_a.length-marimi_b.length);
            }
        });
        for(let art of v_articole){
            art.parentNode.appendChild(art);
        }
    }

    var btn2=document.getElementById("sortCrescNume");
    btn2.onclick=function(){
        
        sorteaza(1)
    }

    var btn3=document.getElementById("sortDescrescNume");
    btn3.onclick=function(){
        sorteaza(-1)
    }
  
  reset.onclick=function(){
    document.getElementById("i_rad9").checked=true;
    document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
    document.getElementById("infoRange").innerHTML="("+document.getElementById("inp-pret").min+")";
    document.getElementById("inp-nume").value="";
    document.getElementById("inp-categorie").value="toate";

    var articole=document.getElementsByClassName("produs");
    for(let art of articole){

        art.style.display="block";
    }
}

 }

  


 window.onkeydown=function(e){
    console.log(e);
    if(e.key=="c" && e.altKey==true){
        var suma=0;
        var articole=document.getElementsByClassName("produs");
        for(let art of articole){
            if(art.style.display!="none")
                suma+=parseFloat(art.getElementsByClassName("val-pret")[0].innerHTML);
        }

        var spanSuma;
        spanSuma=document.getElementById("numar-suma");
        if(!spanSuma){
            spanSuma=document.createElement("span");
            spanSuma.innerHTML=" Suma:"+suma;//<span> Suma:...
            spanSuma.id="numar-suma";//<span id="..."
            document.getElementById("p-suma").appendChild(spanSuma);
            setTimeout(function(){document.getElementById("numar-suma").remove()}, 1500);
        }
    }


 }