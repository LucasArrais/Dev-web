import React from "react";

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (pagina: number) => void;
}

export default function Paginacao({ 
  paginaAtual, 
  totalPaginas, 
  onPaginaChange 
}: PaginacaoProps) {
  const maxBotoes = 5;
  
  let inicio = Math.max(1, paginaAtual - Math.floor(maxBotoes / 2));
  let fim = Math.min(totalPaginas, inicio + maxBotoes - 1);
  inicio = Math.max(1, fim - maxBotoes + 1);

  const paginas = [];
  for (let i = inicio; i <= fim; i++) {
    paginas.push(i);
  }

  return (
    <nav aria-label="Navegação de páginas">
      <ul className="pagination justify-content-center mb-0">
        <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPaginaChange(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            &laquo;
          </button>
        </li>

        {inicio > 1 && (
          <>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => onPaginaChange(1)}
              >
                1
              </button>
            </li>
            {inicio > 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}

        {paginas.map(pagina => (
          <li
            key={pagina}
            className={`page-item ${pagina === paginaAtual ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => onPaginaChange(pagina)}
            >
              {pagina}
            </button>
          </li>
        ))}

        {fim < totalPaginas && (
          <>
            {fim < totalPaginas - 1 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => onPaginaChange(totalPaginas)}
              >
                {totalPaginas}
              </button>
            </li>
          </>
        )}

        <li className={`page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPaginaChange(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}