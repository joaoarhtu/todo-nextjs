# Lista de Tarefas (To-do List) com Next.js

Aplicação para cadastrar e gerenciar tarefas, feita com **Next.js (App Router)** e **React**.

## Funcionalidades

- Adicionar tarefas por meio de um formulário (campo de texto + botão, ou Enter).
- Marcar tarefas como concluídas ou pendentes (concluídas ficam riscadas e em verde).
- Excluir tarefas individualmente e limpar todas as concluídas de uma vez.
- Filtrar por **Todas**, **Pendentes** e **Concluídas**.
- Exibir a quantidade de tarefas: pendentes em destaque, total, concluídas e barra de progresso.
- Interface responsiva e acessível (navegação por teclado, rótulos para leitores de tela).
- **Desafio extra:** persistência com `localStorage` — as tarefas continuam após recarregar ou fechar o navegador.

## Conceitos de React utilizados

- Componentes funcionais reutilizáveis (`Summary`, `TodoForm`, `FilterTabs`, `TodoList`, `TodoItem`).
- `useState` para tarefas, filtro e estado de carregamento; `useEffect` para o `localStorage`.
- `map()` para renderizar a lista e `filter()` para os filtros e a exclusão.
- Eventos: `onSubmit`, `onChange` e `onClick`.

## Estrutura

```
app/
  layout.js        # layout raiz, fonte e metadados
  page.js          # estado da aplicação e ações (adicionar, alternar, excluir)
  globals.css      # estilos
components/
  Summary.js       # contagem de tarefas e barra de progresso
  TodoForm.js      # formulário de nova tarefa
  FilterTabs.js    # filtros todas / pendentes / concluídas
  TodoList.js      # lista (map) e mensagens de lista vazia
  TodoItem.js      # uma tarefa
```

## Como rodar localmente

Requisitos: Node.js 18.18 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Para testar o build de produção:

```bash
npm run build
npm start
```

## Como publicar

### 1. GitHub

```bash
git init
git add .
git commit -m "To-do list com Next.js"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/todo-nextjs.git
git push -u origin main
```

(Crie antes um repositório vazio chamado `todo-nextjs` em https://github.com/new.)


- Repositório: _cole aqui o link do GitHub_
- Site hospedado: _cole aqui o link da Vercel_
