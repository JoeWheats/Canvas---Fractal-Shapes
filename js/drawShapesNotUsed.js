// function drawSquare(side){
//     ctx.rect(mouseX - (side / 2),mouseY - (side / 2),side,side);
//     ctx.fill(); 
//     ctx.stroke();
// }

// function drawEqTriangle(side){
//     var h = side * (Math.sqrt(3)/2);
//     ctx.beginPath();

//         ctx.moveTo(mouseX, mouseY +  -h / 2);
//         ctx.lineTo(mouseX +  -side / 2,mouseY + h / 2);
//         ctx.lineTo(mouseX + side / 2, mouseY + h / 2);
//         ctx.lineTo(mouseX, mouseY + -h / 2);
        
//         ctx.stroke();
//         ctx.fill(); 
        
//     ctx.closePath();
// }

// function drawCircle(radius){
//     var radius = 70;

//     ctx.beginPath();
//     ctx.arc(mouseX, mouseY, radius, 0, 2 * Math.PI, false);
//     ctx.stroke();
// }