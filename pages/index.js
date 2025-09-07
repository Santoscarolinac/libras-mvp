import { useEffect, useRef } from "react";

export default function Home() {
  const textareaRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      if (window.VLibras && !window._vlibrasInitialized) {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
        window._vlibrasInitialized = true;
      }
    };
    document.body.appendChild(script);
  }, []);

  function handleTranslate() {
    const text = textareaRef.current.value;
    const out = document.getElementById("vlibras-text-output");
    if (out) out.textContent = text; // envia o texto para o VLibras interpretar
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Projeto Libras — MVP</h1>
      <p>Escreva o que você quer que o avatar mostre em Libras:</p>
      <textarea ref={textareaRef} rows={5} cols={60} placeholder="Digite aqui..." />
      <br />
      <button onClick={handleTranslate} style={{ marginTop: 10 }}>
        Traduzir para Libras
      </button>

      <div id="vlibras-text-output" style={{ marginTop: 20, minHeight: 40 }} />

      {/* Área do VLibras */}
      <div
        id="vlibras-root"
        dangerouslySetInnerHTML={{
          __html: `
            <div vw class="enabled">
              <div vw-access-button class="active"></div>
              <div vw-plugin-wrapper>
                <div class="vw-plugin-top-wrapper"></div>
              </div>
            </div>
          `,
        }}
      />
    </div>
  );
}
