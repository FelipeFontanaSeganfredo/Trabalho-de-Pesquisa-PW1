const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

async function runTests() {
  try {
    console.log('\n🔸 Criando usuário...');
    const userRes = await axios.post(`${BASE_URL}/users`, {
      name: 'Jeferson',
      email: 'jefferson@email.com',
    });
    const user = userRes.data;
    console.log('Usuário criado:', user);

    console.log('\n  Criando tag...');
    const tagRes = await axios.post(`${BASE_URL}/tags`, {
      name: 'JavaScript',
    });
    const tag = tagRes.data;
    console.log('Tag criada:', tag);

    console.log('\n Criando post...');
    const postRes = await axios.post(`${BASE_URL}/posts`, {
      title: 'Meu primeiro post',
      content: 'Este é um conteúdo usando Bookshelf.js!',
      user_id: user.id,
    });
    const post = postRes.data;
    console.log('Post criado:', post);

    console.log('\n🔸 Associando tag ao post...');
    await axios.post(`${BASE_URL}/posts/${post.id}/tags/${tag.id}`);
    console.log('Tag associada com sucesso!');

    console.log('\n🔸 Buscando post com relações...');
    const getPost = await axios.get(`${BASE_URL}/posts/${post.id}`);
    console.log('Post com usuário e tags:', JSON.stringify(getPost.data, null, 2));

    console.log('\n Testes concluídos com sucesso!');

  } catch (err) {
    console.error('\n Erro durante testes:', err.response?.data || err.message);
  }
}

runTests();
