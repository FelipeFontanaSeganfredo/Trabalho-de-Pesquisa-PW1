const express = require('express');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post');
const Tag = require('./models/Tag');

app.use(express.json());

const PORT = 3000;

// CREATE
app.post('/users', async (req, res) => {
  try {
    const user = await new User(req.body).save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
app.get('/users', async (req, res) => {
  try {
    const users = await User.fetchAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ BY ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.where('id', req.params.id).fetch({ require: false });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.where('id', req.params.id).fetch({ require: false });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    await user.save(req.body, { patch: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.where('id', req.params.id).fetch({ require: false });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    await user.destroy();
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POSTS -----------------------------

// CREATE post
app.post('/posts', async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.fetchAll({ withRelated: ['user', 'tags'] });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ post by ID
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.where('id', req.params.id).fetch({ withRelated: ['user', 'tags'], require: false });
    if (!post) return res.status(404).json({ error: 'Post não encontrado' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE post
app.put('/posts/:id', async (req, res) => {
  try {
    const post = await Post.where('id', req.params.id).fetch({ require: false });
    if (!post) return res.status(404).json({ error: 'Post não encontrado' });

    await post.save(req.body, { patch: true });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE post
app.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.where('id', req.params.id).fetch({ require: false });
    if (!post) return res.status(404).json({ error: 'Post não encontrado' });

    await post.destroy();
    res.json({ message: 'Post excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TAGS -----------------------------

// CREATE tag
app.post('/tags', async (req, res) => {
  try {
    const tag = await new Tag(req.body).save();
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL tags
app.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.fetchAll({ withRelated: ['posts'] });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ tag by ID
app.get('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.where('id', req.params.id).fetch({ withRelated: ['posts'], require: false });
    if (!tag) return res.status(404).json({ error: 'Tag não encontrada' });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE tag
app.put('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.where('id', req.params.id).fetch({ require: false });
    if (!tag) return res.status(404).json({ error: 'Tag não encontrada' });

    await tag.save(req.body, { patch: true });
    res.json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE tag
app.delete('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.where('id', req.params.id).fetch({ require: false });
    if (!tag) return res.status(404).json({ error: 'Tag não encontrada' });

    await tag.destroy();
    res.json({ message: 'Tag excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RELACIONAMENTO POSTS <-> TAGS -----------------------------

// ADICIONAR tag a um post
app.post('/posts/:postId/tags/:tagId', async (req, res) => {
  try {
    const post = await Post.where('id', req.params.postId).fetch({ require: true });
    const tag = await Tag.where('id', req.params.tagId).fetch({ require: true });

    await post.tags().attach(tag);
    res.json({ message: 'Tag associada ao post com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// REMOVER tag de um post
app.delete('/posts/:postId/tags/:tagId', async (req, res) => {
  try {
    const post = await Post.where('id', req.params.postId).fetch({ require: true });
    const tag = await Tag.where('id', req.params.tagId).fetch({ require: true });

    await post.tags().detach(tag);
    res.json({ message: 'Tag removida do post com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT);
});
