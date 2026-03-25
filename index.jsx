import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  dark: "#061426",
  silver: "#7b7e7d",
  light: "#F2F2F2",
  white: "#FFFFFF",
  sL: "#B0B3B5",
  sD: "#5A5D5E",
};

const GlobalCSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{font-family:'Montserrat',sans-serif;background:${C.light};color:${C.dark};overflow-x:hidden}
    ::selection{background:${C.silver};color:${C.white}}
    a{text-decoration:none;color:inherit}
    input,textarea,select,button{font-family:'Montserrat',sans-serif}
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .7s ease both}
    .d1{animation-delay:.12s}.d2{animation-delay:.24s}.d3{animation-delay:.36s}.d4{animation-delay:.48s}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:${C.light}}
    ::-webkit-scrollbar-thumb{background:${C.silver};border-radius:2px}
  `}</style>
);

const CursorEffect = () => {
  const dRef = useRef(null);
  const rRef = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      if (dRef.current) {
        dRef.current.style.left = e.clientX + "px";
        dRef.current.style.top = e.clientY + "px";
      }
      if (rRef.current) {
        rRef.current.style.left = e.clientX + "px";
        rRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  const base = { position: "fixed", pointerEvents: "none", zIndex: 9999, borderRadius: "50%", transform: "translate(-50%,-50%)" };
  return (
    <>
      <div ref={dRef} style={{ ...base, width: 5, height: 5, background: C.silver, transition: "all .05s" }} />
      <div ref={rRef} style={{ ...base, width: 28, height: 28, border: `1px solid ${C.silver}`, transition: "all .1s ease-out" }} />
    </>
  );
};

const LogoFull = ({ h = 26 }) => (
  <svg viewBox="0 0 340 55" height={h} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lgF" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7A7F9A" />
        <stop offset="35%" stopColor="#B8BCC8" />
        <stop offset="65%" stopColor="#D0D4E0" />
        <stop offset="100%" stopColor="#8A8FA8" />
      </linearGradient>
    </defs>
    <text x="0" y="44" fill="url(#lgF)" fontFamily="'Montserrat',sans-serif" fontWeight="900" fontSize="50" letterSpacing="8">EXACTA</text>
  </svg>
);

const LogoMark = ({ s = 34 }) => (
  <svg viewBox="0 0 88 68" width={s} height={s * 0.77} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lgM" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7A7F9A" />
        <stop offset="45%" stopColor="#C0C5D0" />
        <stop offset="100%" stopColor="#8A8FA8" />
      </linearGradient>
    </defs>
    <text x="0" y="55" fill="url(#lgM)" fontFamily="'Montserrat',sans-serif" fontWeight="900" fontSize="62" letterSpacing="2">EX</text>
  </svg>
);

const Diag = ({ c = C.silver, o = 0.06, n = 5 }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", top: `${-18 + i * 26}%`, left: "-10%",
        width: "130%", height: 1, background: c, opacity: o,
        transform: `rotate(${-14 + i * 2}deg)`,
      }} />
    ))}
  </div>
);

const NAVS = [
  { id: "home", l: "Início" },
  { id: "sobre", l: "Sobre" },
  { id: "blog", l: "Blog" },
  { id: "trabalhe", l: "Trabalhe Conosco" },
];

const Header = ({ page, go }) => {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: sc ? "rgba(6,20,38,.97)" : "transparent",
      backdropFilter: sc ? "blur(12px)" : "none",
      transition: "all .4s",
      borderBottom: sc ? "1px solid rgba(123,126,125,.12)" : "none",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: sc ? 58 : 74, transition: "height .4s",
      }}>
        <div onClick={() => go("home")} style={{ cursor: "pointer" }}>
          <LogoFull h={sc ? 18 : 22} />
        </div>
        <nav style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {NAVS.map(it => (
            <button key={it.id} onClick={() => go(it.id)} style={{
              background: "none", border: "none", fontSize: 11, cursor: "pointer",
              fontWeight: page === it.id ? 700 : 500, letterSpacing: 1.5,
              color: page === it.id ? C.white : "rgba(255,255,255,.5)",
              padding: "8px 12px", textTransform: "uppercase", position: "relative",
            }}>
              {it.l}
              {page === it.id && (
                <span style={{
                  position: "absolute", bottom: 3, left: "50%",
                  transform: "translateX(-50%)", width: 16, height: 1.5,
                  background: C.silver,
                }} />
              )}
            </button>
          ))}
          <button onClick={() => go("contato")} style={{
            background: `linear-gradient(135deg,${C.silver},${C.sL})`,
            border: "none", fontSize: 10, fontWeight: 700, cursor: "pointer",
            color: C.dark, padding: "9px 20px", letterSpacing: 1.5,
            textTransform: "uppercase", marginLeft: 8,
          }}>
            Fale Conosco
          </button>
        </nav>
      </div>
    </header>
  );
};

const HeroSection = ({ go }) => (
  <section style={{
    minHeight: "100vh", display: "flex", alignItems: "center",
    justifyContent: "center", position: "relative", overflow: "hidden",
    background: C.dark,
  }}>
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
    }}>
      <iframe
        src="https://www.youtube.com/embed/856kajhnNE4?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=856kajhnNE4&playsinline=1&modestbranding=1"
        title="bg"
        allow="autoplay"
        style={{
          position: "absolute", top: "50%", left: "50%",
          width: "180vw", height: "180vh",
          transform: "translate(-50%,-50%)",
          border: "none", pointerEvents: "none", opacity: 0.18,
        }}
      />
    </div>
    <div style={{ position: "absolute", inset: 0, background: "rgba(6,20,38,.68)" }} />
    <Diag c={C.sL} o={0.03} n={8} />

    <div style={{
      maxWidth: 1200, margin: "0 auto", padding: "140px 24px 80px",
      position: "relative", zIndex: 1, textAlign: "center",
    }}>
      <div className="fu" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        border: "1px solid rgba(123,126,125,.25)", padding: "5px 18px", marginBottom: 30,
      }}>
        <div style={{ width: 4, height: 4, background: C.silver }} />
        <span style={{
          fontSize: 10, color: C.silver, letterSpacing: 3,
          textTransform: "uppercase", fontWeight: 600,
        }}>
          Manipulação Estéril de Injetáveis
        </span>
      </div>

      <h1 className="fu d1" style={{
        fontSize: "clamp(34px,6vw,68px)", fontWeight: 900,
        color: C.white, lineHeight: 1.05, marginBottom: 22, letterSpacing: -1,
      }}>
        Farmácia de<br />
        <span style={{
          background: `linear-gradient(90deg,${C.sL},${C.silver})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Alta Precisão</span>
      </h1>

      <p className="fu d2" style={{
        fontSize: 15, color: "rgba(242,242,242,.55)", lineHeight: 1.8,
        maxWidth: 520, margin: "0 auto 40px",
      }}>
        Especialistas em injetáveis estéreis. Entregamos soluções com a segurança e a qualidade que médicos e odontologistas exigem.
      </p>

      <div className="fu d3" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => go("contato")} style={{
          background: `linear-gradient(135deg,${C.silver},${C.sL})`,
          border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer",
          color: C.dark, padding: "15px 38px", letterSpacing: 1, textTransform: "uppercase",
        }}>Solicitar Contato</button>
        <button onClick={() => go("sobre")} style={{
          background: "transparent", border: "1px solid rgba(242,242,242,.18)",
          fontSize: 13, fontWeight: 500, color: C.light, cursor: "pointer",
          padding: "15px 38px", letterSpacing: 1, textTransform: "uppercase",
        }}>Conheça a Exacta</button>
      </div>

      <div className="fu d4" style={{ display: "flex", gap: 44, justifyContent: "center", marginTop: 56 }}>
        {[
          { n: "100%", l: "Manipulação Estéril" },
          { n: "CRM/CRO", l: "Exclusivo para Médicos" },
          { n: "ANVISA", l: "Regulamentação" },
        ].map((b, i) => (
          <div key={i}>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.sL }}>{b.n}</div>
            <div style={{ fontSize: 9, color: "rgba(242,242,242,.3)", letterSpacing: 1, marginTop: 3, textTransform: "uppercase" }}>{b.l}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 90,
      background: `linear-gradient(to top,${C.light},transparent)`,
    }} />
  </section>
);

const PageHero = ({ title, subtitle }) => (
  <section style={{
    background: C.dark, padding: "126px 24px 66px", textAlign: "center",
    position: "relative", overflow: "hidden",
  }}>
    <Diag />
    <div className="fu" style={{ position: "relative", zIndex: 1 }}>
      <h1 style={{ fontSize: 38, fontWeight: 800, color: C.white, marginBottom: 8, letterSpacing: -0.5 }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontSize: 14, color: "rgba(242,242,242,.4)", maxWidth: 460, margin: "0 auto" }}>
          {subtitle}
        </p>
      )}
    </div>
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 44,
      background: `linear-gradient(to top,${C.light},transparent)`,
    }} />
  </section>
);

const Footer = ({ go }) => (
  <footer style={{ background: C.dark, color: C.white, position: "relative", overflow: "hidden" }}>
    <Diag o={0.025} />
    <div style={{
      maxWidth: 1200, margin: "0 auto", padding: "52px 24px 24px",
      display: "flex", gap: 36, flexWrap: "wrap", position: "relative", zIndex: 1,
    }}>
      <div style={{ flex: "1 1 240px" }}>
        <div style={{ marginBottom: 14 }}><LogoFull h={18} /></div>
        <p style={{ fontSize: 11, color: "rgba(242,242,242,.35)", lineHeight: 1.7, maxWidth: 240 }}>
          Farmácia de manipulação estéril especializada em injetáveis. Parte da Évora Holding.
        </p>
      </div>
      <div style={{ flex: "1 1 130px" }}>
        <div style={{ fontSize: 10, color: C.silver, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>
          Navegação
        </div>
        {NAVS.map(it => (
          <div key={it.id} onClick={() => go(it.id)} style={{
            fontSize: 12, color: "rgba(242,242,242,.4)", marginBottom: 7, cursor: "pointer",
          }}>{it.l}</div>
        ))}
      </div>
      <div style={{ flex: "1 1 220px" }}>
        <div style={{ fontSize: 10, color: C.silver, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>
          Contato
        </div>
        <div style={{ fontSize: 12, color: "rgba(242,242,242,.4)", lineHeight: 1.7 }}>
          Rua da Matriz, 39 — Botafogo<br />Rio de Janeiro, RJ
        </div>
      </div>
    </div>
    <div style={{
      maxWidth: 1200, margin: "0 auto", padding: "14px 24px",
      borderTop: "1px solid rgba(242,242,242,.04)", position: "relative", zIndex: 1,
    }}>
      <span style={{ fontSize: 9, color: "rgba(242,242,242,.2)" }}>
        © 2026 Exacta Farma — Manipulação Estéril
      </span>
    </div>
  </footer>
);

/* ═══════════════════ BLOG DATA ═══════════════════ */
const DEFS = [
  { id: "d1", title: "Tirzepatida: o que médicos precisam saber", excerpt: "Mecanismo de ação, indicações e benefícios na prática médica.", category: "Ciência", date: "20 Mar 2026" },
  { id: "d2", title: "Manipulação estéril: a escolha faz diferença", excerpt: "Protocolos que garantem segurança na produção de injetáveis.", category: "Segurança", date: "13 Mar 2026" },
  { id: "d3", title: "GLP-1 e o futuro da obesidade", excerpt: "Tendências em terapias baseadas em incretinas.", category: "Tendências", date: "06 Mar 2026" },
  { id: "d4", title: "Controle de qualidade: do insumo ao produto", excerpt: "Cada etapa do nosso controle de qualidade.", category: "Qualidade", date: "27 Fev 2026" },
  { id: "d5", title: "ANVISA e farmácias estéreis em 2026", excerpt: "Atualizações regulatórias e conformidade.", category: "Regulatório", date: "20 Fev 2026" },
];

const BlogCard = ({ post }) => (
  <div style={{
    background: C.white, overflow: "hidden",
    border: "1px solid rgba(123,126,125,.1)",
  }}>
    <div style={{ height: 2, background: `linear-gradient(90deg,${C.silver},${C.sL})` }} />
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <span style={{
          fontSize: 9, fontWeight: 700, color: C.silver,
          background: "rgba(123,126,125,.07)", padding: "3px 9px",
          letterSpacing: 1, textTransform: "uppercase",
        }}>{post.category}</span>
        <span style={{ fontSize: 9, color: C.silver }}>{post.date}</span>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.dark, lineHeight: 1.35, marginBottom: 6 }}>
        {post.title}
      </h3>
      <p style={{ fontSize: 12, color: C.silver, lineHeight: 1.6 }}>{post.excerpt}</p>
      <div style={{
        marginTop: 14, fontSize: 11, fontWeight: 700, color: C.dark,
        letterSpacing: 1, textTransform: "uppercase",
      }}>
        Ler artigo →
      </div>
    </div>
  </div>
);

/* ═══════════════════ HOME ═══════════════════ */
const HomePage = ({ go, posts }) => (
  <>
    <HeroSection go={go} />

    {/* Values */}
    <section style={{ background: C.white, borderBottom: "1px solid rgba(123,126,125,.08)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "44px 24px",
        display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap",
      }}>
        {[
          { t: "Segurança", d: "Protocolos rigorosos de manipulação" },
          { t: "Precisão", d: "Controle de qualidade em cada etapa" },
          { t: "Saúde", d: "Qualidade de vida para pacientes" },
          { t: "Confiança", d: "Exclusivo para CRM e CRO" },
        ].map((v, i) => (
          <div key={i} style={{
            flex: "1 1 200px", padding: "14px 0",
            borderLeft: i > 0 ? "1px solid rgba(123,126,125,.08)" : "none",
            paddingLeft: i > 0 ? 20 : 0,
          }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 3 }}>{v.t}</div>
            <div style={{ fontSize: 11, color: C.silver, lineHeight: 1.5 }}>{v.d}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Product */}
    <section style={{ background: C.light, padding: "88px 24px", position: "relative", overflow: "hidden" }}>
      <Diag o={0.025} />
      <div style={{
        maxWidth: 1200, margin: "0 auto", display: "flex", gap: 72,
        alignItems: "center", flexWrap: "wrap", position: "relative", zIndex: 1,
      }}>
        <div style={{ flex: "1 1 340px" }}>
          <div style={{
            width: "100%", maxWidth: 360, aspectRatio: "3/4",
            background: C.dark, position: "relative", overflow: "hidden",
            display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 32,
          }}>
            <Diag c={C.sL} o={0.05} n={6} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 9, color: C.silver, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Destaque</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: C.white, lineHeight: 1.15 }}>Tirzepatida</div>
              <div style={{ fontSize: 12, color: "rgba(242,242,242,.4)", marginTop: 10, lineHeight: 1.7 }}>
                Agonista duplo GIP/GLP-1 manipulado em ambiente estéril controlado.
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, position: "relative", zIndex: 1 }}>
              {["Injetável", "Estéril", "GLP-1/GIP"].map((t, i) => (
                <span key={i} style={{
                  background: "rgba(242,242,242,.05)", border: "1px solid rgba(242,242,242,.07)",
                  padding: "4px 10px", fontSize: 9, color: "rgba(242,242,242,.5)",
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: "1 1 380px" }}>
          <div style={{ fontSize: 9, color: C.silver, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
            Nosso Produto
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: C.dark, lineHeight: 1.15, marginBottom: 18 }}>
            Excelência em<br /><span style={{ color: C.silver }}>manipulação estéril</span>
          </h2>
          <p style={{ fontSize: 13, color: C.silver, lineHeight: 1.8, marginBottom: 24 }}>
            A Tirzepatida é o carro-chefe da Exacta Farma — produzida em ambiente controlado, seguindo os mais rigorosos protocolos.
          </p>
          {["Sala limpa classificada", "Controle microbiológico por lote", "Rastreabilidade completa", "Atendimento exclusivo CRM/CRO"].map((x, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
              <div style={{ width: 18, height: 1, background: C.silver, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: C.dark }}>{x}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Blog scroll */}
    <section style={{ background: C.white, padding: "72px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: 36, flexWrap: "wrap", gap: 14,
        }}>
          <div>
            <div style={{ fontSize: 9, color: C.silver, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>Blog</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: C.dark }}>Conteúdo para profissionais</h2>
          </div>
          <button onClick={() => go("blog")} style={{
            background: "none", border: "none", fontSize: 11, fontWeight: 700,
            color: C.dark, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
          }}>Ver todos →</button>
        </div>
        <div style={{
          display: "flex", gap: 18, overflowX: "auto", paddingBottom: 10,
          scrollSnapType: "x mandatory",
        }}>
          {(posts.length > 0 ? posts : DEFS).slice(0, 5).map((p) => (
            <div key={p.id} style={{ flex: "0 0 300px", scrollSnapAlign: "start" }}>
              <BlogCard post={p} />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{
      background: C.dark, padding: "64px 24px", textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      <Diag c={C.sL} o={0.025} n={6} />
      <div style={{ maxWidth: 520, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: C.white, marginBottom: 12 }}>
          Pronto para o <span style={{ color: C.sL }}>melhor</span>?
        </h2>
        <p style={{ fontSize: 13, color: "rgba(242,242,242,.45)", lineHeight: 1.8, marginBottom: 28 }}>
          Descubra como a Exacta Farma pode ser parceira da sua prática clínica.
        </p>
        <button onClick={() => go("contato")} style={{
          background: `linear-gradient(135deg,${C.silver},${C.sL})`,
          border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer",
          color: C.dark, padding: "15px 40px", letterSpacing: 1, textTransform: "uppercase",
        }}>Solicitar Contato</button>
      </div>
    </section>
  </>
);

/* ═══════════════════ SOBRE ═══════════════════ */
const SobrePage = () => (
  <>
    <PageHero title="Sobre a Exacta" subtitle="Onde o mercado aceita o 'suficiente', nós exigimos a perfeição" />
    <section style={{ background: C.white, padding: "66px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", gap: 48, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 380px" }}>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: C.dark, marginBottom: 12 }}>Quem Somos</h3>
          <p style={{ fontSize: 13, color: C.silver, lineHeight: 1.9, marginBottom: 16 }}>
            A Exacta Farma nasce sob o DNA de solidez da Évora Holding com uma missão clara: redefinir o padrão ouro dos injetáveis.
          </p>
          <p style={{ fontSize: 13, color: C.silver, lineHeight: 1.9 }}>
            Unimos o rigor científico da Évora Farma à tecnologia de última geração para entregar segurança real, pureza absoluta e resultados exatos.
          </p>
        </div>
        <div style={{ flex: "1 1 280px" }}>
          <div style={{ background: C.dark, padding: 32, position: "relative", overflow: "hidden" }}>
            <Diag c={C.sL} o={0.035} />
            {[
              { l: "Missão", t: "Redefinir o padrão ouro dos injetáveis com segurança real." },
              { l: "Visão", t: "Referência nacional em manipulação estéril." },
              { l: "Valores", t: "Segurança, Qualidade, Transparência, Ética." },
            ].map((x, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 22 : 0, position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 9, color: C.silver, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>{x.l}</div>
                <p style={{ fontSize: 11, color: "rgba(242,242,242,.5)", lineHeight: 1.7 }}>{x.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section style={{ background: C.light, padding: "66px 24px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: C.dark, marginBottom: 36 }}>Nossos Diferenciais</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 18 }}>
          {[
            { t: "Manipulação Estéril", d: "Sala limpa com controles rigorosos." },
            { t: "Controle de Qualidade", d: "Análises completas antes da liberação." },
            { t: "Exclusividade CRM/CRO", d: "Atendimento para profissionais habilitados." },
            { t: "Rastreabilidade Total", d: "Do insumo ao produto final." },
            { t: "Equipe Especializada", d: "Expertise em preparações estéreis." },
            { t: "Conformidade ANVISA", d: "Boas Práticas de Manipulação." },
          ].map((d, i) => (
            <div key={i} style={{ background: C.white, padding: 24, border: "1px solid rgba(123,126,125,.08)", textAlign: "left" }}>
              <div style={{ width: 24, height: 2, background: `linear-gradient(90deg,${C.silver},${C.sL})`, marginBottom: 12 }} />
              <h4 style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 5 }}>{d.t}</h4>
              <p style={{ fontSize: 11, color: C.silver, lineHeight: 1.6 }}>{d.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

/* ═══════════════════ BLOG ═══════════════════ */
const BlogPage = ({ posts }) => (
  <>
    <PageHero title="Blog" subtitle="Conteúdo semanal para profissionais da saúde" />
    <section style={{ background: C.light, padding: "66px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          background: C.dark, padding: 40, marginBottom: 36, position: "relative",
          overflow: "hidden",
        }}>
          <Diag c={C.sL} o={0.035} n={6} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: C.silver, letterSpacing: 2, textTransform: "uppercase" }}>
              Destaque da Semana
            </span>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: C.white, lineHeight: 1.25, margin: "8px 0 12px" }}>
              {(posts[0] || DEFS[0]).title}
            </h3>
            <p style={{ fontSize: 12, color: "rgba(242,242,242,.45)", lineHeight: 1.7 }}>
              {(posts[0] || DEFS[0]).excerpt}
            </p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
          {(posts.length > 0 ? posts : DEFS).map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  </>
);

/* ═══════════════════ BLOG ADMIN ═══════════════════ */
const BlogAdmin = ({ posts, setPosts }) => {
  const [form, setForm] = useState({ title: "", excerpt: "", category: "Ciência", date: "" });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!form.title) return;
    const newPost = {
      ...form,
      id: "p" + Date.now(),
      date: form.date || new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }),
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    try {
      await window.storage.set("exacta-blog-posts", JSON.stringify(updated));
    } catch (e) {
      console.log(e);
    }
    setSaved(true);
    setForm({ title: "", excerpt: "", category: "Ciência", date: "" });
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDelete = async (id) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    try {
      await window.storage.set("exacta-blog-posts", JSON.stringify(updated));
    } catch (e) {
      console.log(e);
    }
  };

  const ist = {
    width: "100%", padding: "11px 14px",
    border: "1px solid rgba(123,126,125,.12)",
    fontSize: 12, outline: "none", background: C.light,
  };

  return (
    <>
      <PageHero title="Admin — Blog" subtitle="Painel restrito" />
      <section style={{ background: C.light, padding: "54px 24px" }}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          {saved && (
            <div style={{ background: "#2e7d32", color: C.white, padding: "10px 18px", marginBottom: 18, fontSize: 12, fontWeight: 600 }}>
              Post publicado!
            </div>
          )}
          <div style={{ background: C.white, padding: 32, border: "1px solid rgba(123,126,125,.1)", marginBottom: 28 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.dark, marginBottom: 18 }}>Novo Post</h3>
            {[
              { k: "title", l: "Título" },
              { k: "excerpt", l: "Resumo" },
              { k: "date", l: "Data (ex: 20 Mar 2026)" },
            ].map(x => (
              <div key={x.k} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 10, color: C.silver, display: "block", marginBottom: 3, fontWeight: 600 }}>{x.l}</label>
                <input value={form[x.k]} onChange={e => setForm({ ...form, [x.k]: e.target.value })} style={ist} />
              </div>
            ))}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 10, color: C.silver, display: "block", marginBottom: 3, fontWeight: 600 }}>Categoria</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={ist}>
                {["Ciência", "Segurança", "Tendências", "Qualidade", "Regulatório", "Mercado"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button onClick={handleSave} disabled={!form.title} style={{
              width: "100%", padding: 13, marginTop: 8,
              background: form.title ? C.dark : C.silver,
              border: "none", color: C.white, fontSize: 12, fontWeight: 700,
              letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
            }}>
              Publicar
            </button>
          </div>
          {posts.length > 0 && (
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 12 }}>Posts ({posts.length})</h4>
              {posts.map(p => (
                <div key={p.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 14px", background: C.white,
                  border: "1px solid rgba(123,126,125,.08)", marginBottom: 6,
                }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{p.title}</div>
                    <div style={{ fontSize: 10, color: C.silver }}>{p.date} · {p.category}</div>
                  </div>
                  <button onClick={() => handleDelete(p.id)} style={{
                    background: "none", border: "none", fontSize: 10, color: "#c00",
                    fontWeight: 700, cursor: "pointer",
                  }}>Excluir</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

/* ═══════════════════ CONTATO ═══════════════════ */
const ContatoPage = ({ go }) => {
  const [form, setForm] = useState({ nome: "", email: "", tel: "", especialidade: "" });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await fetch("https://script.google.com/macros/s/PLACEHOLDER/exec", {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.log(err);
    }
    setBusy(false);
    setSent(true);
    const msg = encodeURIComponent(
      `Olá! Sou ${form.nome}, ${form.especialidade}. Gostaria de saber mais sobre a Exacta Farma.\nE-mail: ${form.email}\nTel: ${form.tel}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/552139550717?text=${msg}`, "_blank");
    }, 1500);
  };

  const ist = {
    width: "100%", padding: "12px 14px",
    border: "1px solid rgba(123,126,125,.12)",
    fontSize: 12, outline: "none", background: C.light,
  };

  return (
    <>
      <PageHero title="Fale Conosco" subtitle="Exclusivo para profissionais habilitados (CRM / CRO)" />
      <section style={{ background: C.light, padding: "66px 24px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", gap: 44, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px" }}>
            {sent ? (
              <div style={{ background: C.white, padding: 48, textAlign: "center", border: "1px solid rgba(123,126,125,.08)" }}>
                <div style={{ width: 40, height: 2, background: C.silver, margin: "0 auto 18px" }} />
                <h3 style={{ fontSize: 22, fontWeight: 800, color: C.dark, marginBottom: 6 }}>Mensagem enviada!</h3>
                <p style={{ fontSize: 13, color: C.silver }}>Redirecionando ao WhatsApp...</p>
              </div>
            ) : (
              <div style={{ background: C.white, padding: 36, border: "1px solid rgba(123,126,125,.08)" }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: C.dark, marginBottom: 4 }}>Solicite um contato</h3>
                <p style={{ fontSize: 12, color: C.silver, marginBottom: 22 }}>Preencha e retornaremos via WhatsApp.</p>
                <form onSubmit={handleSubmit}>
                  {[
                    { k: "nome", l: "Nome completo", t: "text", p: "Dr(a). Nome" },
                    { k: "email", l: "E-mail profissional", t: "email", p: "nome@clinica.com.br" },
                    { k: "tel", l: "WhatsApp", t: "tel", p: "(21) 99999-9999" },
                  ].map(x => (
                    <div key={x.k} style={{ marginBottom: 14 }}>
                      <label style={{ fontSize: 10, color: C.silver, display: "block", marginBottom: 3, fontWeight: 600 }}>{x.l} *</label>
                      <input type={x.t} required placeholder={x.p} value={form[x.k]} onChange={e => setForm({ ...form, [x.k]: e.target.value })} style={ist} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 10, color: C.silver, display: "block", marginBottom: 3, fontWeight: 600 }}>Especialidade *</label>
                    <select required value={form.especialidade} onChange={e => setForm({ ...form, especialidade: e.target.value })} style={{ ...ist, color: form.especialidade ? C.dark : C.silver }}>
                      <option value="">Selecione...</option>
                      {["Endocrinologia", "Nutrologia", "Dermatologia", "Medicina Estética", "Clínica Geral", "Ortomolecular", "Odontologia", "Outra"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <button type="submit" disabled={busy} style={{
                    width: "100%", padding: 14, background: C.dark, cursor: "pointer",
                    border: "none", color: C.white, fontSize: 12, fontWeight: 700,
                    letterSpacing: 1, textTransform: "uppercase",
                  }}>
                    {busy ? "Enviando..." : "Enviar Solicitação"}
                  </button>
                  <p style={{ fontSize: 9, color: C.silver, textAlign: "center", marginTop: 10 }}>Dados protegidos conforme LGPD.</p>
                </form>
              </div>
            )}
          </div>
          <div style={{ flex: "1 1 260px" }}>
            <div style={{ background: C.dark, padding: 32, position: "relative", overflow: "hidden", marginBottom: 18 }}>
              <Diag c={C.sL} o={0.03} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: C.white, marginBottom: 18 }}>Informações</h4>
                <div style={{ fontSize: 9, color: C.silver, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600, marginBottom: 2 }}>Endereço</div>
                <div style={{ fontSize: 12, color: "rgba(242,242,242,.55)", lineHeight: 1.5 }}>
                  Rua da Matriz, 39<br />Botafogo — Rio de Janeiro, RJ
                </div>
              </div>
            </div>
            <div style={{ background: C.white, padding: 24, border: "1px solid rgba(123,126,125,.08)" }}>
              <div style={{ width: 20, height: 2, background: C.silver, marginBottom: 10 }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Atendimento Exclusivo</span>
              <p style={{ fontSize: 11, color: C.silver, lineHeight: 1.7, marginTop: 6 }}>
                Exclusivo para CRM (médicos) ou CRO (odontologistas).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ═══════════════════ TRABALHE ═══════════════════ */
const TrabalhePage = () => {
  const [form, setForm] = useState({ nome: "", email: "", tel: "", area: "", msg: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Candidatura — ${form.nome} — ${form.area}`);
    const body = encodeURIComponent(`Nome: ${form.nome}\nE-mail: ${form.email}\nTelefone: ${form.tel}\nÁrea: ${form.area}\nMensagem: ${form.msg}`);
    window.open(`mailto:pessoas@exactafarma.com.br?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  const ist = {
    width: "100%", padding: "11px 14px",
    border: "1px solid rgba(123,126,125,.12)",
    fontSize: 12, outline: "none", background: C.white,
  };

  return (
    <>
      <PageHero title="Trabalhe Conosco" subtitle="Faça parte do time que transforma a saúde" />
      <section style={{ background: C.white, padding: "66px 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", gap: 44, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 280px" }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: C.dark, marginBottom: 12 }}>Por que a Exacta?</h3>
            <p style={{ fontSize: 13, color: C.silver, lineHeight: 1.8, marginBottom: 22 }}>
              Equipe comprometida com excelência em manipulação estéril.
            </p>
            {["Ambiente colaborativo", "Crescimento profissional", "Tecnologia de ponta", "Impacto na saúde"].map((x, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                <div style={{ width: 16, height: 1, background: C.silver, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: C.dark }}>{x}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: "1 1 360px" }}>
            {sent ? (
              <div style={{ background: C.light, padding: 40, textAlign: "center", border: "1px solid rgba(123,126,125,.08)" }}>
                <div style={{ width: 36, height: 2, background: C.silver, margin: "0 auto 14px" }} />
                <h4 style={{ fontSize: 18, fontWeight: 800, color: C.dark, marginBottom: 6 }}>Candidatura iniciada!</h4>
                <p style={{ fontSize: 12, color: C.silver }}>Anexe seu currículo em PDF e envie para pessoas@exactafarma.com.br</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: C.light, padding: 28, border: "1px solid rgba(123,126,125,.08)" }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: C.dark, marginBottom: 18 }}>Envie seu currículo</h4>
                {[
                  { k: "nome", l: "Nome completo", t: "text" },
                  { k: "email", l: "E-mail", t: "email" },
                  { k: "tel", l: "Telefone", t: "tel" },
                ].map(x => (
                  <div key={x.k} style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 10, color: C.silver, display: "block", marginBottom: 3, fontWeight: 600 }}>{x.l}</label>
                    <input type={x.t} required value={form[x.k]} onChange={e => setForm({ ...form, [x.k]: e.target.value })} style={ist} />
                  </div>
                ))}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 10, color: C.silver, display: "block", marginBottom: 3, fontWeight: 600 }}>Área de interesse</label>
                  <select required value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} style={ist}>
                    <option value="">Selecione...</option>
                    {["Farmácia / Manipulação", "Controle de Qualidade", "Comercial", "Administrativo", "Outro"].map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 10, color: C.silver, display: "block", marginBottom: 3, fontWeight: 600 }}>Currículo (PDF, máx 5MB)</label>
                  <input type="file" accept=".pdf" onChange={e => {
                    const f = e.target.files[0];
                    if (f && f.size > 5 * 1024 * 1024) { alert("Arquivo acima de 5MB."); e.target.value = ""; }
                  }} style={{ width: "100%", padding: "8px 0", fontSize: 11 }} />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 10, color: C.silver, display: "block", marginBottom: 3, fontWeight: 600 }}>Mensagem (opcional)</label>
                  <textarea rows={3} value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} style={{ ...ist, resize: "vertical" }} />
                </div>
                <button type="submit" style={{
                  width: "100%", padding: 13, background: C.dark, cursor: "pointer",
                  border: "none", color: C.white, fontSize: 12, fontWeight: 700,
                  letterSpacing: 1, textTransform: "uppercase",
                }}>Enviar Candidatura</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

/* ═══════════════════ MAIN APP ═══════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [posts, setPosts] = useState([]);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const result = await window.storage.get("exacta-blog-posts");
        if (result && result.value) {
          setPosts(JSON.parse(result.value));
        }
      } catch (e) {
        // storage not available
      }
    };
    loadPosts();
  }, []);

  const go = useCallback((p) => {
    setPage(p);
    window.scrollTo(0, 0);
  }, []);

  const handleSecretClick = useCallback(() => {
    clickCount.current += 1;
    if (clickCount.current >= 5) {
      setPage("admin");
      clickCount.current = 0;
    }
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 2000);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage go={go} posts={posts} />;
      case "sobre": return <SobrePage />;
      case "blog": return <BlogPage posts={posts} />;
      case "trabalhe": return <TrabalhePage />;
      case "contato": return <ContatoPage go={go} />;
      case "admin": return <BlogAdmin posts={posts} setPosts={setPosts} />;
      default: return <HomePage go={go} posts={posts} />;
    }
  };

  return (
    <>
      <GlobalCSS />
      <CursorEffect />
      <div
        onClick={handleSecretClick}
        style={{
          position: "fixed", top: 0, left: 0, width: 100, height: 50,
          zIndex: 1001, cursor: "default",
        }}
      />
      <Header page={page} go={go} />
      <main>{renderPage()}</main>
      <Footer go={go} />
    </>
  );
}
