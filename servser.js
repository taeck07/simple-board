const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();
const fs = require('fs');

server.use(middlewares);

server.get('/comments/paging', async (req, res) => {
  const { limit, page } = req.query;
  fs.readFile('./data.json', 'utf-8', function (err, data) {
    if (err) throw err;
    let json = JSON.parse(data);
    const commentsCnt = json.comments.length;
    const totalPage = Math.ceil(commentsCnt / limit);
    res.jsonp({
      totalPage,
      page: parseInt(page),
      limit: parseInt(limit),
      commentsCnt,
    });
  });
});

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running');
});
