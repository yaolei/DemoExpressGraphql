import express from 'express'
import axios from 'axios'

const router = express.Router();

const middleware = (req, res, next) => { 
  req.body = {
    ...req.body,
    reqMsg: "Hello Evan Good Job !"
  }
  next()
}
/* GET home page. */
router.get('/', middleware, function(req, res, next) {
  const {reqMsg} = req.body;
  res.render('index', { title: 'Express', msg: reqMsg });
});

const getBacicServerAddress = (req, res, next) => {
  const serverAddress = `${req.protocol}://${req.hostname}:${req.socket.localPort}`;
  req.body = {
    ...req.body,
    basicUrl: serverAddress
  }
  next();
}

const handlePostUserData = async (serverUrl) => {
  const parames = {
      "query": "query RandomeDatas { randomeDatas { id, username ,dateCreate}}"
  }
  const url = `${serverUrl}/graphql/`
  const header = {
    headers:{
      'Content-Type': 'application/json'
    }
  }
  const res = await axios.post(url, parames, header);
  return res.data
}


const handleGetUserData = async (serverUrl) => {
  const query = "query RandomeDatas { randomeDatas {id, username}}"
  const header = {
    headers:{
      'Content-Type': 'application/json'
    }
  }

  const baseURL = `${serverUrl}/graphql`
  const fullUrl = `${baseURL}?query=${encodeURIComponent(query)}`
  const res = await axios.get(fullUrl, header)
  return res.data;
}

router.get('/a',getBacicServerAddress ,async (req, res, next) => {
  const result = await handlePostUserData(req?.body?.basicUrl);
  res.render('table', {userInfo:result.data.randomeDatas})
});

export default router
