const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
const messageOne=document.querySelector("#message1");
const messageTwo=document.querySelector("#message2");
const messageThree=document.querySelector("#message3");
const messageFour=document.querySelector("#message4");
// const port=5000;
const port=process.env.Port || 5000;
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  
  messageOne.textContent="Loading...";
  messageTwo.textContent='';
  messageThree.textContent='';
  messageFour.textContent='';

  const location = searchLocation.value;
  //"http://localhost:"+port+
  fetch("/weather?address=" + location).then((response) => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent=data.error;
      } else {
        messageOne.textContent=data.location;
        messageTwo.textContent='Weather Summary:'+data.forecast.summary;
        messageThree.textContent='Current Temperature: '+data.forecast.temperature;
        messageFour.textContent='Chances of raining: '+data.forecast.precipProbability;
      }
    });
  });
  //console.log(location);
});
