let screenDegree = 0;
let projection1 = document.getElementById('projection1');

let socket = io();

document.body.addEventListener('click', () => {
    notice.innerHTML = "";
})

// socket.on('screen90State', (data) => {
//     screen90 = data;
//     console.log(screen90);
//     if(screen90){
//         projection1.style.visibility = "visible";
//         projection1.currentTime = 0;
//         projection1.play();
//     } else {
//         projection1.pause();
//         projection1.style.visibility = "hidden";
//     }
// })

socket.on('currentDegree', (data) => {
    screenDegree = data;
    console.log(screenDegree);
    if(screenDegree === 90){
        projection1.style.visibility = "visible";
        projection1.currentTime = 0;
        projection1.play();
    } else {
        projection1.pause();
        projection1.style.visibility = "hidden";
    }
})