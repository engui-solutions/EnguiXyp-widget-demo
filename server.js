process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const https = require('https')
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3456;

const agent = new https.Agent({
  rejectUnauthorized: false,
})

const token = 'Bearer ' + "Байгууллагын токен";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/create/token', async (req, res) => {
  try {
    const response = await axios.post('https://thirdparty.engui.mn/third/widget/create/token', req.body, {
      httpsAgent: agent,
      headers: {
        Authorization: token,
      }
    })
    res.json(response.data)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Алдаа гарлаа'});
  }
})

app.listen(port, () => {
  console.log(`Сервер http://localhost:${port} ажиллаж байна`)
})