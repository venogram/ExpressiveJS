// document.getElementById('myButton').addEventListener('click', () => {
//   console.log("your click makes me giggle");
//   const myReq = new XMLHttpRequest();
//   myReq.open('GET', 'http://localhost:3000/route', true);
//   myReq.send();
// })

$('#myButton').on('click', () => {
  console.log("your click makes me giggle");
  $('body').load('/route', (data) => {
    console.log("i done got get");
  });
})

$('#closeButton').on('click', () => {
  $.get('/fakeRoute', () => {
    console.log("i done got done");
  });
})