import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const $ = id => document.getElementById(id);

// --- LOGIN E LOGOUT ---
$('btn-login').addEventListener('click', async () => {
  const email = $('inp-email').value;
  const senha = $('inp-senha').value;
  try {
    await signInWithEmailAndPassword(auth, email, senha);
  } catch (error) {
    $('erro-login').textContent = "E-mail ou senha inválidos.";
  }
});

$('btn-sair').addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, (user) => {
  if (user) {
    $('login-screen').classList.add('hidden');
    $('app-painel').classList.remove('hidden');
    carregarAulas();
  } else {
    $('login-screen').classList.remove('hidden');
    $('app-painel').classList.add('hidden');
  }
});

// --- CARREGAR AULAS ---
async function carregarAulas() {
  const tbody = $('tabela-aulas');
  tbody.innerHTML = '<tr><td colspan="3">Buscando dados no Firebase...</td></tr>';
  
  try {
    const querySnapshot = await getDocs(collection(db, "aulas"));
    tbody.innerHTML = '';
    
    if(querySnapshot.empty) {
      tbody.innerHTML = '<tr><td colspan="3">Nenhuma aula cadastrada.</td></tr>';
      return;
    }

    querySnapshot.forEach((documento) => {
      const aula = documento.data();
      const id = documento.id;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aula.titulo || '-'}</td>
        <td>${aula.video ? 'Sim' : 'Não'}</td>
        <td>
          <button class="btn" style="background:#F1F5F9; padding: 6px 12px;" onclick="prepararEdicao('${id}', '${aula.titulo}', '${aula.video}', '${aula.descricao}', '${aula.referencia}')">Editar</button>
          <button class="btn btn-perigo" onclick="excluirAula('${id}')">X</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
    tbody.innerHTML = '<tr><td colspan="3">Erro ao carregar as aulas.</td></tr>';
  }
}

// --- SALVAR AULA ---
$('btn-salvar').addEventListener('click', async () => {
  const id = $('edit-id').value;
  const dados = {
    titulo: $('inp-titulo').value,
    video: $('inp-video').value,
    descricao: $('inp-descricao').value,
    referencia: $('inp-referencia').value
  };

  if(!dados.titulo) return alert("O título é obrigatório!");

  try {
    if (id) {
      await updateDoc(doc(db, "aulas", id), dados);
    } else {
      await addDoc(collection(db, "aulas"), dados);
    }
    
    limparFormulario();
    carregarAulas();
    alert("Salvo com sucesso!");
  } catch (error) {
    alert("Erro ao salvar: " + error.message);
  }
});

// --- EXCLUIR AULA ---
window.excluirAula = async (id) => {
  if(confirm("Excluir esta aula permanentemente?")) {
    await deleteDoc(doc(db, "aulas", id));
    carregarAulas();
  }
};

// --- EDIÇÃO ---
window.prepararEdicao = (id, titulo, video, descricao, referencia) => {
  $('edit-id').value = id;
  $('inp-titulo').value = titulo || '';
  $('inp-video').value = video || '';
  $('inp-descricao').value = descricao || '';
  $('inp-referencia').value = referencia || '';
  
  $('btn-cancelar').style.display = 'inline-block';
  window.scrollTo(0, 0);
};

$('btn-cancelar').addEventListener('click', limparFormulario);

function limparFormulario() {
  $('edit-id').value = '';
  $('inp-titulo').value = '';
  $('inp-video').value = '';
  $('inp-descricao').value = '';
  $('inp-referencia').value = '';
  $('btn-cancelar').style.display = 'none';
}
