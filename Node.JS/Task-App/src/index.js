const express = require("express");
require("./db/mongoose");
const userRouter=require('./routers/user');
const taskRouter=require('./routers/task');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log("Server is listening on " + PORT);
});

/*
1** Informational
2** Success
    200 Ok
    201 Created
    202 Accepted    
3** Redirection
4** Client side Error
    400 Bad Request
    401 Unauthorised
    403 Forbidden
    404 Not Found
    405 Method not allowed
5** Server side Error
    500 Internal Server Error
    501 Not implemented
    502 Bad Gateway
    503 Service Unavailble
*/
