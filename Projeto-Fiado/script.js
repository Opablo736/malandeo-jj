


// // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
// // import {
// //   getDatabase,
// //   ref,
// //   set,
// //   push,
// //   onValue
// // } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// // // Configuração do Firebase
// // const firebaseConfig = {
// //   apiKey: "AIzaSyAstCgPiCDTf1TOKURzNjP3AkV3uAiW10Y",
// //   authDomain: "conta-9ca26.firebaseapp.com",
// //   databaseURL: "https://conta-9ca26-default-rtdb.firebaseio.com",
// //   projectId: "conta-9ca26",
// //   storageBucket: "conta-9ca26.appspot.com",
// //   messagingSenderId: "463179409426",
// //   appId: "1:463179409426:web:3d4b086d8e2091606390cb"
// // };

// // const app = initializeApp(firebaseConfig);
// // const db = getDatabase(app);

// // // Função para calcular diferença de dias
// // function diasEntre(dataString) {
// //   const hoje = new Date();
// //   const dataCompra = new Date(dataString);
// //   const diff = hoje - dataCompra;
// //   return diff / (1000 * 60 * 60 * 24);
// // }

// // // Carrega lista de clientes
// // function carregarClientes(filtroNome = "") {
// //   const refDB = ref(db, "Fiadores");
// //   onValue(refDB, (snapshot) => {
// //     const data = snapshot.val();
// //     const ul = document.getElementById("listaClientes");
// //     ul.innerHTML = "";

// //     if (!data) return;

// //     const clientes = Object.entries(data).map(([id, cliente]) => ({ id, ...cliente }));

// //     const filtro = filtroNome.trim().toLowerCase();
// //     const encontrados = [];
// //     const restantes = [];

// //     clientes.forEach((cliente) => {
// //       if (cliente.Nome.toLowerCase().includes(filtro)) {
// //         encontrados.push(cliente);
// //       } else {
// //         restantes.push(cliente);
// //       }
// //     });

// //     encontrados.sort((a, b) => a.Nome.localeCompare(b.Nome));
// //     restantes.sort((a, b) => a.Nome.localeCompare(b.Nome));

// //     const listaFinal = [...encontrados, ...restantes];

// //     listaFinal.forEach((cliente) => {
// //       const atrasoDias = diasEntre(cliente.Data);
// //       const classeAtraso = atrasoDias > 30 ? "atrasado" : "";
// //       const li = document.createElement("li");
// //       li.className = (filtro && cliente.Nome.toLowerCase().includes(filtro) ? "destaque " : "") + classeAtraso;

// //       li.innerHTML = `
// //         <span>Cliente: <strong>${cliente.Nome}</strong> — Dívida: <strong>R$${parseFloat(cliente.Valor).toFixed(2)}</strong></span>
// //         <br>
// //         <button onclick="pagarConta('${cliente.id}', '${cliente.Nome}', ${cliente.Valor})">Pagar</button>
// //       `;

// //       ul.appendChild(li);
// //     });
// //   });
// // }

// // // Enviar nova compra
// // document.getElementById("purchaseForm").addEventListener("submit", (event) => {
// //   event.preventDefault();

// //   const nome = document.getElementById("nome").value.trim();
// //   const produto = document.getElementById("produto").value.trim();
// //   const valor = parseFloat(document.getElementById("valor").value);
// //   const dataCompra = document.getElementById("data").value;

// //   if (isNaN(valor) || valor <= 0) {
// //     alert("Digite um valor válido.");
// //     return;
// //   }

// //   const refDB = ref(db, "Fiadores");

// //   onValue(
// //     refDB,
// //     (snapshot) => {
// //       const data = snapshot.val();
// //       let clienteEncontrado = false;

// //       if (data) {
// //         for (let id in data) {
// //           if (data[id].Nome.toLowerCase() === nome.toLowerCase()) {
// //             const valorAnterior = parseFloat(data[id].Valor) || 0;
// //             const novoValor = valorAnterior + valor;

// //             const clienteAtualizado = {
// //               Nome: nome,
// //               Valor: novoValor.toFixed(2),
// //               Produto: produto,
// //               Data: dataCompra
// //             };

// //             set(ref(db, `Fiadores/${id}`), clienteAtualizado)
// //               .then(() => {
// //                 alert("Compra somada ao cliente existente.");
// //                 carregarClientes();
// //               })
// //               .catch((error) => console.error("Erro ao atualizar:", error));

// //             clienteEncontrado = true;
// //             break;
// //           }
// //         }
// //       }

// //       if (!clienteEncontrado) {
// //         const novoCliente = {
// //           Nome: nome,
// //           Valor: valor.toFixed(2),
// //           Produto: produto,
// //           Data: dataCompra
// //         };

// //         push(refDB, novoCliente)
// //           .then(() => {
// //             alert("Novo cliente cadastrado com sucesso!");
// //             carregarClientes();
// //           })
// //           .catch((error) => console.error("Erro ao salvar:", error));
// //       }
// //     },
// //     { onlyOnce: true }
// //   );

// //   document.getElementById("purchaseForm").reset();
// // });

// // // Pagar valor parcial ou total
// // window.pagarConta = function (id, nome, valorAtual) {
// //   const valorPago = prompt(
// //     `Digite o valor a ser pago por ${nome} (deve R$${parseFloat(valorAtual).toFixed(2)}):`
// //   );

// //   const valorPagoNum = parseFloat(valorPago);
// //   if (isNaN(valorPagoNum) || valorPagoNum <= 0) {
// //     alert("Digite um valor válido.");
// //     return;
// //   }

// //   let novoValor = parseFloat(valorAtual) - valorPagoNum;
// //   if (novoValor < 0) novoValor = 0;

// //   const clienteRef = ref(db, `Fiadores/${id}`);
// //   set(clienteRef, {
// //     Nome: nome,
// //     Valor: novoValor.toFixed(2),
// //     Produto: "Pagamento",
// //     Data: new Date().toISOString().split("T")[0]
// //   })
// //     .then(() => {
// //       alert("Pagamento registrado com sucesso!");
// //       carregarClientes();
// //     })
// //     .catch((error) => {
// //       console.error("Erro ao registrar pagamento:", error);
// //     });
// // };

// // // Pesquisa
// // document.getElementById("btnPesquisar").addEventListener("click", () => {
// //   const termo = document.getElementById("pesquisa").value;
// //   carregarClientes(termo);
// // });

// // window.onload = () => carregarClientes();


// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
// import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// // Configuração do Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyAstCgPiCDTf1TOKURzNjP3AkV3uAiW10Y",
//   authDomain: "conta-9ca26.firebaseapp.com",
//   databaseURL: "https://conta-9ca26-default-rtdb.firebaseio.com",
//   projectId: "conta-9ca26",
//   storageBucket: "conta-9ca26.appspot.com",
//   messagingSenderId: "463179409426",
//   appId: "1:463179409426:web:3d4b086d8e2091606390cb",
//   measurementId: "G-2W5JGPSEF9",
// };

// // Inicializa Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// // Função para calcular dias entre hoje e uma data (string)
// function diasEntre(dataStr) {
//   const hoje = new Date();
//   const data = new Date(dataStr);
//   const diff = hoje - data;
//   return Math.floor(diff / (1000 * 60 * 60 * 24));
// }

// // Carrega clientes ordenados, com filtro e mostra todas as compras por cliente
// function carregarClientes(filtroNome = "") {
//   const refDB = ref(db, "Fiadores");
//   onValue(refDB, (snapshot) => {
//     const data = snapshot.val();
//     const ul = document.getElementById("listaClientes");
//     ul.innerHTML = "";

//     if (!data) return;

//     // Transformar em array com id para manipular
//     const clientes = Object.entries(data).map(([id, cliente]) => ({
//       id,
//       ...cliente,
//     }));

//     // Filtrar por nome
//     const filtro = filtroNome.trim().toLowerCase();
//     const encontrados = [];
//     const restantes = [];

//     clientes.forEach((cliente) => {
//       if (cliente.Nome.toLowerCase().includes(filtro)) {
//         encontrados.push(cliente);
//       } else {
//         restantes.push(cliente);
//       }
//     });

//     // Ordenar alfabeticamente
//     encontrados.sort((a, b) => a.Nome.localeCompare(b.Nome));
//     restantes.sort((a, b) => a.Nome.localeCompare(b.Nome));

//     // Clientes com filtro aparecem no topo
//     const listaFinal = [...encontrados, ...restantes];

//     listaFinal.forEach((cliente) => {
//       // Pega a última compra para calcular atraso
//       let atrasoDias = 0;
//       if (cliente.Compras && cliente.Compras.length > 0) {
//         const ultimaCompra = cliente.Compras[cliente.Compras.length - 1];
//         atrasoDias = diasEntre(ultimaCompra.Data);
//       }

//       const li = document.createElement("li");
//       li.className = atrasoDias > 30 ? "atrasado" : "";

//       // Lista todas as compras
//       let listaProdutos = "";
//       if (cliente.Compras && cliente.Compras.length > 0) {
//         listaProdutos =
//           "<ul>" +
//           cliente.Compras
//             .map(
//               (c) =>
//                 `<li>Produto: <strong>${c.Produto}</strong> — Valor: R$${parseFloat(
//                   c.Valor
//                 ).toFixed(2)} — Data: ${c.Data}</li>`
//             )
//             .join("") +
//           "</ul>";
//       }

//       li.innerHTML = `
//         <strong>${cliente.Nome}</strong> — Total devido: R$${parseFloat(cliente.Valor).toFixed(
//         2
//       )}
//         ${listaProdutos}
//         <button onclick="pagarConta('${cliente.id}', '${cliente.Nome}', ${cliente.Valor})">Conta Paga</button>
//       `;

//       ul.appendChild(li);
//     });
//   }, { onlyOnce: true });
// }

// // Registra uma nova compra (cria cliente novo ou atualiza existente)
// document.getElementById("purchaseForm").addEventListener("submit", (e) => {
//   e.preventDefault();

//   const nome = document.getElementById("nome").value.trim();
//   const produto = document.getElementById("produto").value.trim();
//   const valor = parseFloat(document.getElementById("valor").value);
//   const dataCompra = document.getElementById("data").value;

//   if (isNaN(valor) || valor <= 0) {
//     alert("Digite um valor válido.");
//     return;
//   }

//   const refDB = ref(db, "Fiadores");

//   onValue(
//     refDB,
//     (snapshot) => {
//       const data = snapshot.val();
//       let clienteEncontrado = false;

//       if (data) {
//         for (let id in data) {
//           if (data[id].Nome.toLowerCase() === nome.toLowerCase()) {
//             // Cliente existente: atualiza valor e adiciona produto à lista de compras
//             const valorAnterior = parseFloat(data[id].Valor) || 0;
//             const novoValor = valorAnterior + valor;

//             const comprasAnteriores = data[id].Compras || [];
//             comprasAnteriores.push({
//               Produto: produto,
//               Valor: valor.toFixed(2),
//               Data: dataCompra,
//             });

//             const clienteAtualizado = {
//               Nome: nome,
//               Valor: novoValor.toFixed(2),
//               Compras: comprasAnteriores,
//             };

//             set(ref(db, `Fiadores/${id}`), clienteAtualizado)
//               .then(() => {
//                 alert("Compra adicionada ao cliente existente.");
//                 carregarClientes();
//               })
//               .catch((error) => console.error("Erro ao atualizar:", error));

//             clienteEncontrado = true;
//             break;
//           }
//         }
//       }

//       // Se cliente não existir, cria um novo
//       if (!clienteEncontrado) {
//         const novoCliente = {
//           Nome: nome,
//           Valor: valor.toFixed(2),
//           Compras: [
//             {
//               Produto: produto,
//               Valor: valor.toFixed(2),
//               Data: dataCompra,
//             },
//           ],
//         };

//         push(refDB, novoCliente)
//           .then(() => {
//             alert("Novo cliente cadastrado com sucesso!");
//             carregarClientes();
//           })
//           .catch((error) => console.error("Erro ao salvar:", error));
//       }
//     },
//     { onlyOnce: true }
//   );

//   // Limpa o formulário
//   document.getElementById("purchaseForm").reset();
// });

// // Função para pagar parte da dívida
// window.pagarConta = function (id, nome, valorAtual) {
//   const valorPago = prompt(
//     `Digite o valor a ser pago por ${nome} (deve R$${parseFloat(valorAtual).toFixed(2)}):`
//   );

//   const valorPagoNum = parseFloat(valorPago);
//   if (isNaN(valorPagoNum) || valorPagoNum <= 0) {
//     alert("Digite um valor válido.");
//     return;
//   }

//   let novoValor = parseFloat(valorAtual) - valorPagoNum;
//   if (novoValor < 0) novoValor = 0;

//   const clienteRef = ref(db, `Fiadores/${id}`);
//   onValue(
//     clienteRef,
//     (snapshot) => {
//       const dados = snapshot.val();
//       if (!dados) return;

//       set(clienteRef, {
//         Nome: nome,
//         Valor: novoValor.toFixed(2),
//         Compras: dados.Compras || [],
//       })
//         .then(() => {
//           alert("Pagamento registrado com sucesso!");
//           carregarClientes();
//         })
//         .catch((error) => {
//           console.error("Erro ao registrar pagamento:", error);
//         });
//     },
//     { onlyOnce: true }
//   );
// };

// // Botão buscar filtra clientes e coloca resultado no topo
// document.getElementById("btnPesquisar").addEventListener("click", () => {
//   const termo = document.getElementById("pesquisa").value;
//   carregarClientes(termo);
// });

// // Carrega todos clientes na inicialização
// carregarClientes();


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAstCgPiCDTf1TOKURzNjP3AkV3uAiW10Y",
  authDomain: "conta-9ca26.firebaseapp.com",
  databaseURL: "https://conta-9ca26-default-rtdb.firebaseio.com",
  projectId: "conta-9ca26",
  storageBucket: "conta-9ca26.appspot.com",
  messagingSenderId: "463179409426",
  appId: "1:463179409426:web:3d4b086d8e2091606390cb",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function diasDesde(dataString) {
  const hoje = new Date();
  const data = new Date(dataString);
  const diffTime = hoje - data;
  return diffTime / (1000 * 60 * 60 * 24);
}

function carregarClientes(filtro = "") {
  const refDB = ref(db, "Fiadores");
  onValue(refDB, (snapshot) => {
    const data = snapshot.val();
    const ul = document.getElementById("listaClientes");
    ul.innerHTML = "";

    if (!data) return;

    const clientesArray = Object.entries(data).map(([id, cliente]) => ({
      id,
      ...cliente,
    }));

    // Ordenar por nome
    clientesArray.sort((a, b) => a.Nome.localeCompare(b.Nome));

    // Aplicar filtro se existir
    const filtrados = filtro
      ? clientesArray.filter((c) =>
          c.Nome.toLowerCase().includes(filtro.toLowerCase())
        )
      : clientesArray;

    for (const cliente of filtrados) {
      const li = document.createElement("li");

      // Verificar condição de cor do nome
      let classeNome = "";
      if (cliente.Valor == 0) {
        classeNome = "pago";
      } else if (
        cliente.Compras?.some((c) => diasDesde(c.Data) > 30)
      ) {
        classeNome = "atrasado";
      }

      li.innerHTML = `
        <span class="${classeNome}">Nome: ${cliente.Nome}</span><br>
        Telefone: ${cliente.Telefone || "Não informado"}<br>
        Total devido: R$${parseFloat(cliente.Valor).toFixed(2)}<br>
        <strong>Compras:</strong>
        <ul>
          ${
            cliente.Compras
              ? cliente.Compras.map(
                  (compra) =>
                    `<li>${compra.Produto} - R$${compra.Valor} - ${compra.Data}</li>`
                ).join("")
              : "<li>Nenhuma compra registrada</li>"
          }
        </ul>
        <button data-id="${cliente.id}">Conta Paga</button>
      `;

      ul.appendChild(li);

      // Botão "Conta Paga"
      li.querySelector("button").addEventListener("click", () => {
        const valorPago = parseFloat(prompt("Digite o valor pago:"));
        if (isNaN(valorPago) || valorPago <= 0) return;

        const novoValor = Math.max(
          0,
          parseFloat(cliente.Valor) - valorPago
        ).toFixed(2);

        update(ref(db, `Fiadores/${cliente.id}`), {
          Valor: novoValor,
        });
      });
    }
  });
}

document.getElementById("purchaseForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const produto = document.getElementById("produto").value;
  const dataCompra = document.getElementById("data").value;

  const refDB = ref(db, "Fiadores");
  onValue(refDB, (snapshot) => {
    const data = snapshot.val();
    let clienteExistente = null;
    let idExistente = null;

    if (data) {
      for (let id in data) {
        if (data[id].Nome.toLowerCase() === nome.toLowerCase()) {
          clienteExistente = data[id];
          idExistente = id;
          break;
        }
      }
    }

    const novaCompra = {
      Produto: produto,
      Valor: valor.toFixed(2),
      Data: dataCompra,
    };

    if (clienteExistente) {
      const novasCompras = clienteExistente.Compras || [];
      novasCompras.push(novaCompra);
      const novoValorTotal =
        parseFloat(clienteExistente.Valor || 0) + valor;

      update(ref(db, `Fiadores/${idExistente}`), {
        Compras: novasCompras,
        Valor: novoValorTotal.toFixed(2),
        Telefone: telefone || clienteExistente.Telefone || "",
      });
    } else {
      const novaPessoa = {
        Nome: nome,
        Telefone: telefone,
        Valor: valor.toFixed(2),
        Compras: [novaCompra],
      };
      push(ref(db, "Fiadores"), novaPessoa);
    }

    document.getElementById("purchaseForm").reset();
  }, { onlyOnce: true });
});

document.getElementById("btnPesquisar").addEventListener("click", () => {
  const termo = document.getElementById("pesquisa").value;
  carregarClientes(termo);
});

// Carregar clientes ao abrir a página
window.onload = () => carregarClientes();
