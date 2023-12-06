const express = require('express');
const config = require('./config')
const helmet = require('helmet');
const tweetsRouter = require('./routes/tweetsRouter')
const { logError, wrapError, errorHandler } = require('./utils/middlewares/errorMiddlewares');
const { notFound } = require('@hapi/boom');

const app = express()
const port = config.port; 

// global middlewares
app.use(helmet())
app.use(express.json());


tweetsRouter(app)
// app.use("/tweets", tweetsRouter)


// Catch 404

app.use(notFound)

// error middleware
app.use(logError)
app.use(wrapError)
app.use(errorHandler);

app.listen(port, () => 
    console.log(`Server running at http://localhost:${port}`)
)
