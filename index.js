const app = require('./app')
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`SERVER is running at port: ${PORT}`);
})
