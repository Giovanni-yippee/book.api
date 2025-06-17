// const express = require('express');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// app.use(express.json());
// const PORT = 3000;

// const users = [
//     { id: 1, name: 'Маржан', age: 25 },
//     { id: 2, name: 'Ахмет', age: 29 },
//     { id: 3, name: 'Аружан', age: 31 },
//     { id: 4, name: 'Санжар', age: 18 },
//     { id: 5, name: 'Даулет', age: 65 },
// ]

// app.get('/', (req, res) => {
//     res.send('Hello, World! Its my first Backend application!');
// });

// http://localhost:3000/api/users?sort=asc(desc)
// app.get('/api/users', (req, res) => {
//     const { sort } = req.query;

//     let result = [...users];

//     if (sort === 'asc') {
//         result.sort((a, b) => a.age - b.age);
//     } else if (sort === 'desc') {
//         result.sort((a, b) => b.age - a.age);
//     }

//     res.json(result);
// });

// http://localhost:3000/api/users/search?name=?
// app.get('/api/users/search', (req, res) => {
//     const { name } = req.query;

//     if (!name) {
//         res.json(users);
//     }

//     const filtered = users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));

//     res.json(filtered);
// })

// http://localhost:3000/api/users/id'
// app.get('/api/users/:id', (req, res) => {
//     const { id } = req.params
//     const user = users.find(u => u.id === parseInt(id));

//     if (!user) {
//         res.status(404).json({ error: 'Пайдаланушы табылмады' });
//     }

//     res.json(user);
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

const books = [
  { id: 1, title: 'Абай жолы', author: 'М. Әуезов', year: 1942 },
  { id: 2, title: 'Менің атым Қожа', author: 'Б. Соқпақбаев', year: 1957 },
  { id: 3, title: 'Алтын сақа', author: 'Ертегі', year: 1970 },
  { id: 4, title: 'Батырлар жыры', author: 'Халық шығармашылығы', year: 1950 }
];

app.get('/', (req, res) => {
    res.send('Hello, World! Its my first Backend application!');
});

// http://localhost:3000/api/books
app.get('/api/books', (req, res) => {
    const { sort } = req.query;

    let result = [...books];

    if (sort === 'asc') {
        result.sort((a, b) => a.year - b.year);
    } else if (sort === 'desc') {
        result.sort((a, b) => b.year - a.year);
    }

    res.json(result);
});

// http://localhost:3000/api/books?sortBy=title&order=as
app.get('/api/books', (req, res) => {
  const { sortBy = 'title', order = 'asc' } = req.query;

  const sortedBooks = [...books].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (typeof valA === 'string') {
      return order === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else {
      return order === 'asc'
        ? valA - valB
        : valB - valA;
    }
  });

  res.json(sortedBooks);
});


// http://localhost:3000/api/books/search?author=?
app.get('/api/books/search', (req, res) => {
    const { author } = req.query;

    if (!author) {
        res.json(books);
    }

    const filtered = books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));

    res.json(filtered);
});

// http://localhost:3000/api/books/:id
app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find(b => b.id === parseInt(id));

    if (!book) {
        res.status(404).json({ error: 'Кітап табылмады' });
    }

    res.json(book);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
