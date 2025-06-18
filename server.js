const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const books = [
  { id: 1, title: 'Абай жолы', author: 'М. Әуезов', year: 1942 },
  { id: 2, title: 'Менің атым Қожа', author: 'Б. Соқпақбаев', year: 1957 }
];

app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title және author жолдары толтырылуы керек.' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year: year || null, 
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT} мекенжайында іске қосылды`);
});
