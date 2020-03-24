const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
const messageOne=document.querySelector("#message1");
const messageTwo=document.querySelector("#message2");
const port=5000;
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  messageOne.textContent="Loading...";
  messageTwo.textContent='';
  const location = searchLocation.value;
  fetch("http://localhost:"+port+"/weather?address=" + location).then((response) => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent=data.error;
      } else {
        messageOne.textContent=data.location;
        messageTwo.textContent='Weather Summary:'+data.forecast.summary+'\nCurrent Temperature is '+data.forecast.temperature+' \nChances of raining:'+data.forecast.precipProbability;
      }
    });
  });
  //console.log(location);
});
