const imgPoss = [];

let maxX, maxY;

function laceImg() {
    const backcircle = 'pics/circle.png';
    const {random: r} = Math;
   
    const x = r() * maxX;
    const y = r() * maxY;
    
    if(!isOverlap(x,y)) {
        var link = `<img class="circle" style="left: ${x}px; top: ${y}px;" src="${backcircle}" />`;
        var bodyHtml = document.body.innerHTML;
        document.body.innerHTML =  bodyHtml + link;
        
        imgPoss.push({x, y}); // record all img positions
    }
}

function isOverlap(x, y) { // return true if overlapping
    const backcircle = {x: 128, y:160};
    
    for(const imgPos of imgPoss) {
        if( x>imgPos.x-backcircle.x && x<imgPos.x+backcircle.x &&
            y>imgPos.y-backcircle.y && y<imgPos.y+backcircle.y ) return true;
    }
    return false;
}

onload = function() {
    maxX = innerWidth - 128;
    maxY = innerHeight - 160;
    for(i=0;i<100;i++){
        placeImg();
    }
    
   
    //setInterval(placeImg, 1);
}

onresize = function() {
    maxX = innerWidth - 128;
    maxY = innerHeight - 160;
}