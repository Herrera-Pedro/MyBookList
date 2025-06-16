document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const booksList = document.getElementById('booksList');

    // Carregar livros ao iniciar
    loadBooks();

    // Adicionar novo livro
    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            titulo: document.getElementById('titulo').value,
            autor: document.getElementById('autor').value,
            ano: document.getElementById('ano').value,
            genero: document.getElementById('genero').value
        };

        try {
            const response = await fetch('/api/livros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                bookForm.reset();
                loadBooks();
            } else {
                alert('Erro ao adicionar livro');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar livro');
        }
    });

    // Função para carregar livros
    async function loadBooks() {
        try {
            const response = await fetch('/api/livros');
            const livros = await response.json();
            
            booksList.innerHTML = '';
            livros.forEach(livro => {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.innerHTML = `
                    <h3>${livro.titulo}</h3>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Ano:</strong> ${livro.ano || 'Não especificado'}</p>
                    <p><strong>Gênero:</strong> ${livro.genero || 'Não especificado'}</p>
                `;
                booksList.appendChild(bookCard);
            });
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
        }
    }
});