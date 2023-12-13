import express,{json} from 'express';
import router from './routers/router.js'

const app = express();
const port = 3000; 

app.use(json());
app.get('/', (req,res)=>{
    res.send("Submitted by priyanshu vyas");
})
app.use('/',router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
