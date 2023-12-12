document.getElementById('botonnavbar').addEventListener('click', desplegarMenu);

function desplegarMenu(){

    if(document.getElementById('navbarNavDropdown').style.display=="block"){
        console.log("display none");
        console.log("tuqui");
        document.getElementById('navbarNavDropdown').style.display="none";
    }else{
        console.log("display block");
        document.getElementById('navbarNavDropdown').style.display="block";
    }

    // document.getElementById('navbarNavDropdown').style.display="block";
}