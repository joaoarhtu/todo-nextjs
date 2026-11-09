"use client";

import { useEffect, useState } from "react";
import Summary from "../components/Summary";
import TodoForm from "../components/TodoForm";
import FilterTabs from "../components/FilterTabs";
import TodoList from "../components/TodoList";

const STORAGE_KEY = "todo-nextjs:tarefas";

// Gera um identificador único para cada tarefa.
function criarId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas"); // "todas" | "pendentes" | "concluidas"
  const [carregado, setCarregado] = useState(false);

  // Desafio extra: lê as tarefas salvas no localStorage ao abrir a página.
  useEffect(() => {
    try {
      const salvas = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(salvas)) setTarefas(salvas);
    } catch {
      // localStorage indisponível ou conteúdo inválido: começa com a lista vazia.
    }
    setCarregado(true);
  }, []);

  // Desafio extra: salva a lista sempre que ela muda
  // (só depois da leitura inicial, para não apagar o que já estava salvo).
  useEffect(() => {
    if (!carregado) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch {
      // sem espaço ou sem permissão: o app continua funcionando, só não persiste.
    }
  }, [tarefas, carregado]);

  // --- Ações -------------------------------------------------------------

  function adicionarTarefa(texto) {
    setTarefas((atual) => [{ id: criarId(), texto, concluida: false }, ...atual]);
  }

  function alternarTarefa(id) {
    setTarefas((atual) =>
      atual.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
  }

  function excluirTarefa(id) {
    setTarefas((atual) => atual.filter((t) => t.id !== id));
  }

  function limparConcluidas() {
    setTarefas((atual) => atual.filter((t) => !t.concluida));
  }

  // --- Dados derivados ---------------------------------------------------

  const pendentes = tarefas.filter((t) => !t.concluida);
  const concluidas = tarefas.filter((t) => t.concluida);

  const tarefasVisiveis =
    filtro === "pendentes" ? pendentes : filtro === "concluidas" ? concluidas : tarefas;

  const contagens = {
    todas: tarefas.length,
    pendentes: pendentes.length,
    concluidas: concluidas.length,
  };

  return (
    <main className="page">
      <div className={`app${carregado ? "" : " app--loading"}`}>
        <h1 className="app__title">Tarefas</h1>

        <Summary
          total={contagens.todas}
          pendentes={contagens.pendentes}
          concluidas={contagens.concluidas}
        />

        <TodoForm onAdd={adicionarTarefa} />

        <FilterTabs filtroAtual={filtro} onChange={setFiltro} contagens={contagens} />

        {carregado ? (
          <TodoList
            tarefas={tarefasVisiveis}
            filtro={filtro}
            total={contagens.todas}
            onToggle={alternarTarefa}
            onDelete={excluirTarefa}
          />
        ) : (
          <p className="empty">Carregando suas tarefas…</p>
        )}

        {contagens.concluidas > 0 && (
          <div className="app__footer">
            <button type="button" className="btn btn--ghost" onClick={limparConcluidas}>
              Limpar concluídas
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
