"use client";

// A identidade visual de cada produto.
//
// Growth e Steel vivem em mundos opostos: um é tela, número e série temporal;
// o outro é chão de fábrica, vergalhão e desenho cotado. Em vez de dar o mesmo
// card com ícone genérico e cor diferente, cada um é desenhado no vernáculo do
// próprio ofício — um é um gráfico com grade e eixo, o outro é um estribo com
// cotas, como sai de uma prancha de armadura.
//
// Os dois se traçam ao entrar na tela (ver .draw em globals.css).

/** Série de ROAS subindo, com grade, eixo e o último ponto destacado. */
export function ArteGrowth() {
  // Meses fictícios só para a forma da curva — o ponto é a linguagem visual,
  // não o dado.
  const pontos = "0,74 40,66 80,70 120,52 160,44 200,46 240,26 280,12";

  return (
    <svg viewBox="0 0 280 96" className="w-full h-auto" role="img"
      aria-label="Gráfico de retorno sobre investimento subindo ao longo dos meses">
      {/* grade */}
      <g stroke="var(--line)" strokeWidth="1">
        {[12, 36, 60, 84].map((y) => <line key={y} x1="0" y1={y} x2="280" y2={y} />)}
      </g>

      {/* área sob a curva */}
      <defs>
        <linearGradient id="areaGrowth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--growth)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--growth)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon className="fade-late" points={`${pontos} 280,96 0,96`} fill="url(#areaGrowth)" />

      {/* a série */}
      <polyline
        className="draw"
        style={{ ["--len" as string]: 340 }}
        points={pontos}
        fill="none"
        stroke="var(--growth)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* último ponto — onde o número está hoje */}
      <g className="fade-late">
        <circle cx="280" cy="12" r="8" fill="var(--growth)" opacity="0.15" />
        <circle cx="280" cy="12" r="3" fill="var(--growth)" />
      </g>

      {/* leitura do eixo, em mono */}
      <g className="fade-late mono" fill="var(--text-muted)" fontSize="7">
        <text x="0" y="93">jan</text>
        <text x="127" y="93">jun</text>
        <text x="258" y="93">dez</text>
      </g>
    </svg>
  );
}

/** Estribo cotado — o artefato que o módulo técnico do Steel produz. */
export function ArteSteel() {
  return (
    <svg viewBox="0 0 280 96" className="w-full h-auto" role="img"
      aria-label="Diagrama de dobra de um estribo com cotas de comprimento e bitola">
      {/* corpo do estribo: retângulo fechado com cantos dobrados */}
      <path
        className="draw"
        style={{ ["--len" as string]: 420 }}
        d="M74 74 L74 30 Q74 24 80 24 L196 24 Q202 24 202 30 L202 74 Q202 80 196 80 L80 80 Q74 80 74 74 Z"
        fill="none"
        stroke="var(--steel)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* as duas pernas do gancho de 135° no canto — o que fecha o estribo */}
      <path
        className="draw draw-2"
        style={{ ["--len" as string]: 60 }}
        d="M196 24 L214 12 M202 34 L220 22"
        fill="none"
        stroke="var(--steel)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* cotas */}
      <g className="fade-late" stroke="var(--text-muted)" strokeWidth="0.75">
        {/* horizontal */}
        <line x1="74" y1="90" x2="202" y2="90" />
        <line x1="74" y1="86" x2="74" y2="94" />
        <line x1="202" y1="86" x2="202" y2="94" />
        {/* vertical */}
        <line x1="60" y1="24" x2="60" y2="80" />
        <line x1="56" y1="24" x2="64" y2="24" />
        <line x1="56" y1="80" x2="64" y2="80" />
      </g>
      <g className="fade-late mono" fill="var(--text-secondary)" fontSize="7.5">
        <text x="128" y="88" textAnchor="middle">25</text>
        <text x="52" y="55" textAnchor="end">15</text>
        <text x="226" y="16">135°</text>
      </g>

      {/* bitola e norma, como aparece na etiqueta da peça */}
      <g className="fade-late mono" fill="var(--steel)" fontSize="8" opacity="0.85">
        <text x="74" y="16">Ø 8,0 mm</text>
      </g>
    </svg>
  );
}
