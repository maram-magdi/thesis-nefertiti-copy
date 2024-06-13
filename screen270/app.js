let screenDegree = 0;
let projection3 = document.getElementById('projection3');

let socket = io();

document.body.addEventListener('click', () => {
    notice.innerHTML = "";
})

// socket.on('screen90State', (data) => {
//     screen90 = data;
//     console.log(screen90);
//     if(screen90){
//         projection3.style.visibility = "visible";
//         projection3.currentTime = 0;
//         projection3.play();
//     } else {
//         projection3.pause();
//         projection3.style.visibility = "hidden";
//     }
// })

socket.on('currentDegree', (data) => {
    screenDegree = data;
    console.log(screenDegree);
    if(screenDegree === 270){
        projection3.style.visibility = "visible";
        projection3.currentTime = 0;
        projection3.play();
    } else {
        projection3.pause();
        projection3.style.visibility = "hidden";
    }
})