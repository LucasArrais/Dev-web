import { create } from 'zustand';

interface Disciplina {
  id: number;
  nome: string;
  cargaHoraria?: number;
}

interface Professor {
  id: number;
  nome: string;
  email?: string;
}

interface Turma {
  id: number;
  codigo?: string;
  nome: string;
  ano: number;
  periodo: number;
  professor?: Professor;
  disciplina?: Disciplina;
}

interface Aluno {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

interface InscricaoState {
  disciplinaSelecionada: Disciplina | null;
  turmaSelecionada: Turma | null;
  alunoSelecionado: Aluno | null;
  termoPesquisa: string;
  paginaAtual: number;
  
  setDisciplinaSelecionada: (disciplina: Disciplina | null) => void;
  setTurmaSelecionada: (turma: Turma | null) => void;
  setAlunoSelecionado: (aluno: Aluno | null) => void;
  setTermoPesquisa: (termo: string) => void;
  setPaginaAtual: (pagina: number) => void;
  limparEstado: () => void;
}

export const useInscricaoStore = create<InscricaoState>((set) => ({
  disciplinaSelecionada: null,
  turmaSelecionada: null,
  alunoSelecionado: null,
  termoPesquisa: '',
  paginaAtual: 1,
  
  setDisciplinaSelecionada: (disciplina) => set({ 
    disciplinaSelecionada: disciplina,
    turmaSelecionada: null,
    alunoSelecionado: null,
    paginaAtual: 1 
  }),
  
  setTurmaSelecionada: (turma) => set({ 
    turmaSelecionada: turma,
    alunoSelecionado: null,
    paginaAtual: 1 
  }),
  
  setAlunoSelecionado: (aluno) => set({ alunoSelecionado: aluno }),
  setTermoPesquisa: (termo) => set({ termoPesquisa: termo, paginaAtual: 1 }),
  setPaginaAtual: (pagina) => set({ paginaAtual: pagina }),
  
  limparEstado: () => set({
    disciplinaSelecionada: null,
    turmaSelecionada: null,
    alunoSelecionado: null,
    termoPesquisa: '',
    paginaAtual: 1
  })
}));