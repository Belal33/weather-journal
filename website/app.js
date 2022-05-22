/* Global Variables */
let button         = document.getElementById("generate");
let dateElement    = document.getElementById("date");
let contentElement = document.getElementById("content");
let tempElement = document.getElementById("temp");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// get temperature from api by fetch function
const get_api_data = async (apiurl)=>{
  let jsonData = await fetch(apiurl);
  let data = await jsonData.json();
  let temperature = data.main.temp;
  console.log(data.main.temp);
  return temperature
}

// post data to the server
const post_data = async (url, data) => {
  try {
    await fetch(url, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("POST data error", error);
  }
}

// get data from server
const get_server_data = async (url) => {
  try {
    let res = await fetch(url);
    let projectData = await res.json();
    console.log(projectData);
    return projectData;
  } catch (error) {
    console.log("get server data error", error);
  }
}; 

// update_ui
function update_ui(projectData) {
  try {
    dateElement.innerHTML = `today : ${projectData.date}`;
    tempElement.innerHTML = `temperature is : ${projectData.temp}`;
    contentElement.innerHTML = `feeling : ${projectData.content}`;
  } catch (error) {
    console.log("update ui error", error);
  }
};





// action when click on generate
button.onclick = async () => {
  let zipCode  = document.querySelector("#zip").value;
  let feelings = document.querySelector("#feelings").value;
  const apikey = "505a3eec3e074cc74ceda32f6b638955&units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apikey}`;
  try {
    if (zipCode) {
      console.log(`you feel ${feelings}`);
      console.log(`your zipcode :${zipCode}`);
      // to get the temperature data
      get_api_data(apiUrl).then((temperature) => {
        const postedData = {
          temp: temperature,
          date: newDate,
          content: feelings,
        };
        // send temperature in post request to the server side
        post_data("/temperatureData", postedData);
      });
      get_server_data("/ProjectData").then((projectData) => update_ui(projectData));
    } else {
      alert("enter your city zip code")
    }

  } catch (error) {
    console.log("error", error);
  }
}
