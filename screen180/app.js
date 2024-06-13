let screenDegree = 0;
let projection2 = document.getElementById('projection2');

let socket = io();

document.body.addEventListener('click', () => {
    notice.innerHTML = "";
})

// socket.on('screen90State', (data) => {
//     screen90 = data;
//     console.log(screen90);
//     if(screen90){
//         projection2.style.visibility = "visible";
//         projection2.currentTime = 0;
//         projection2.play();
//     } else {
//         projection2.pause();
//         projection2.style.visibility = "hidden";
//     }
// })

socket.on('currentDegree', (data) => {
    screenDegree = data;
    console.log(screenDegree);
    if(screenDegree === 180){
        projection2.style.visibility = "visible";
        projection2.currentTime = 0;
        projection2.play();
    } else {
        projection2.pause();
        projection2.style.visibility = "hidden";
    }
})