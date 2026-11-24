// ==========================================
// 1. CONFIGURACIÓN DEL CORREO PARA FORMULARIO
// ==========================================
const DESTINY_EMAIL = "tu-correo-real@gmail.com";

// ==========================================
// 2. ANIMACIÓN DE ESCRITURA EN CONSOLA
// ==========================================
const phrases = [
  'print("Hello world")',
  'print("carlos_dan")'
];

const typewriterEl = document.getElementById("typewriter");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 55 : 95;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1800; // Pausa al terminar de escribir
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// ==========================================
// 3. MENÚ MÓVIL RESPONSIVE
// ==========================================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// ==========================================
// 4. FILTROS DE LA GALERÍA DE PROYECTOS
// ==========================================
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Actualizar botón activo
    filterBtns.forEach(b => {
      b.classList.remove("bg-emerald-500", "text-slate-950", "font-semibold");
      b.classList.add("bg-slate-800", "text-slate-300");
    });
    btn.classList.remove("bg-slate-800", "text-slate-300");
    btn.classList.add("bg-emerald-500", "text-slate-950", "font-semibold");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ==========================================
// 5. MODAL CON CÓDIGO DE EJEMPLO (2DO CICLO)
// ==========================================
const codeSamples = {
  python: {
    title: "sistema_notas_consola.py",
    code: `# Proyecto 2do Ciclo - Carlos Daniel Durand Pizarro
def calcular_promedio(notas):
    promedio = sum(notas) / len(notas)
    estado = "APROBADO" if promedio >= 11 else "DESAPROBADO"
    return round(promedio, 2), estado

alumno = "Carlos Daniel Durand"
notas_ciclo = [15, 16, 14, 17]
prom, condicion = calcular_promedio(notas_ciclo)

print(f"Estudiante: {alumno}")
print(f"Promedio Final: {prom} -> Estado: {condicion}")`
  },
  sql: {
    title: "bd_matricula_academica.sql",
    code: `-- Proyecto 2do Ciclo - Oracle SQL
CREATE TABLE ESTUDIANTE (
    id_estudiante NUMBER PRIMARY KEY,
    nombres VARCHAR2(80) NOT NULL,
    apellidos VARCHAR2(80) NOT NULL,
    ciclo NUMBER(2) DEFAULT 2
);

CREATE TABLE CURSO (
    id_curso NUMBER PRIMARY KEY,
    nombre_curso VARCHAR2(100) NOT NULL,
    creditos NUMBER(2)
);

-- Consulta de alumnos matriculados
SELECT e.nombres || ' ' || e.apellidos AS estudiante, c.nombre_curso
FROM ESTUDIANTE e
JOIN MATRICULA m ON e.id_estudiante = m.id_estudiante
JOIN CURSO c ON m.id_curso = c.id_curso;`
  }
};

function openModal(type) {
  const modal = document.getElementById("code-modal");
  document.getElementById("modal-title").textContent = codeSamples[type].title;
  document.getElementById("modal-code").textContent = codeSamples[type].code;
  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("code-modal").classList.add("hidden");
}

// Cerrar modal al hacer clic fuera
document.getElementById("code-modal").addEventListener("click", (e) => {
  if (e.target.id === "code-modal") closeModal();
});
