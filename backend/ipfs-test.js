const https = require("https")

const projectId = "bf6c5a9dbce0402bba3b067371a06b51"
const projectSecret = "s2Ng3g6MSpXCoGSY5UK5rsTPzkD74Gwbqn6XaoNA7DAeFJa7DFI1Nw"

const options = {
  host: "ipfs.infura.io",
  port: 5001,
  path: "/api/v0/pin/add?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn",
  method: "POST",
  auth: projectId + ":" + projectSecret,
}

let req = https.request(options, (res) => {
  let body = ""
  res.on("data", function (chunk) {
    body += chunk
  })
  res.on("end", function () {
    console.log(body)
  })
})
req.end()