import axios from "axios";
let data = JSON.stringify({
  year: "2024",
});

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "http://localhost:3000/api/track-rev/standings/constructors",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
