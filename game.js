let activos = 1000;
let pasivos = 500;
let patrimonio = 500;
let errores = 0;

function actualizarStats(){
    document.getElementById("stats").innerHTML = `
        <b>Activos:</b> $${activos} |
        <b>Pasivos:</b> $${pasivos} |
        <b>Patrimonio:</b> $${patrimonio} |
        <b>Errores cometidos:</b> ${errores}/3
    `;
}

function elegir(opciones){
    const cont = document.getElementById("choices");
    cont.innerHTML = "";
    opciones.forEach(op=>{
        let btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = op.texto;
        btn.onclick = op.accion;
        cont.appendChild(btn);
    });
}

function perder(motivo){
    document.getElementById("text").innerHTML = `
        <h2 style="color:red;">HAS PERDIDO</h2>${motivo}
    `;
    document.getElementById("choices").innerHTML =
        `<button class="btn" onclick="inicio()">Jugar otra vez</button>`;
}

function ganar(){
    document.getElementById("text").innerHTML = `
        <h2 style="color:#4ee44e;">¡HAS COMPLETADO TODAS LAS NOTAS CONTABLES!</h2>
        La empresa queda perfectamente cuadrada gracias a ti.
    `;
    document.getElementById("choices").innerHTML =
        `<button class="btn" onclick="inicio()">Jugar otra vez</button>`;
}

function inicio(){
    activos = 1000;
    pasivos = 500;
    patrimonio = activos - pasivos;
    errores = 0;
    actualizarStats();

    document.getElementById("text").innerHTML = `
        Eres el nuevo auxiliar contable.<br><br>
        La empresa está a punto de una auditoría y tu misión es:<br>
        <b>Registrar correctamente todas las notas contables.</b><br><br>
        Solo tienes 3 oportunidades antes de ser despedido.
    `;

    elegir([
        { texto:"Comenzar misión", accion: nota1 }
    ]);
}

////////////////////////////////////////////////////////////
// EJEMPLO
////////////////////////////////////////////////////////////

function mostrarEjemplo(){
    document.getElementById("text").innerHTML = `
        <h3>📘 Ejemplo: Cómo elegir la opción correcta</h3>

        <b>Situación:</b> Se compra papelería por $200 en efectivo.<br><br>

        <b>¿Qué significa esto?</b><br>
        ✔ Entra papelería → aumenta un activo → <b>se registra como CARGO</b><br>
        ✔ Sale dinero de la caja → disminuye un activo → <b>se registra como ABONO</b><br><br>

        <b>Opción correcta:</b><br>
        <span style="color:#4ee44e;">
        Cargo: Papelería (Activo) | Abono: Caja (Activo)
        </span><br><br>

        Cuando estés listo, vuelve a la nota.
    `;

    elegir([
        { texto:"Volver a la nota", accion: nota1 }
    ]);
}

////////////////////////////////////////////////////////////
// NOTA 1
////////////////////////////////////////////////////////////

function nota1(){
    document.getElementById("text").innerHTML = `
        <b>NOTA 1:</b> La empresa compró papelería por $200 en efectivo.<br><br>
        Antes de elegir, puedes ver un ejemplo si lo necesitas.
    `;
    elegir([
        { texto:"📘 Ver ejemplo", accion: mostrarEjemplo },
        { texto:"Cargo: Papelería (Activo) | Abono: Caja (Activo)", accion: ()=>correcto_nota1() },
        { texto:"Cargo: Caja | Abono: Papelería", accion: ()=>error_nota(nota1) },
        { texto:"No registrar nada", accion: ()=>error_nota(nota1) }
    ]);
}

function correcto_nota1(){
    activos -= 200;
    activos += 200;
    patrimonio = activos - pasivos;
    actualizarStats();

    document.getElementById("text").innerHTML = `
        ✔ Correcto. Registraste la compra adecuadamente.<br><br>
        Vamos con la siguiente nota…
    `;
    elegir([{ texto:"Continuar", accion: nota2 }]);
}

////////////////////////////////////////////////////////////
// NOTA 2
////////////////////////////////////////////////////////////

function nota2(){
    document.getElementById("text").innerHTML = `
        <b>NOTA 2:</b> Un cliente paga una deuda pendiente de $300.<br><br>
        ¿Cómo registras la nota?
    `;
    elegir([
        { texto:"Cargo: Caja | Abono: Cuentas por cobrar", accion: ()=>correcto_nota2() },
        { texto:"Cargo: Pasivo | Abono: Caja", accion: ()=>error_nota(nota2) },
        { texto:"Cargo: Ventas | Abono: Caja", accion: ()=>error_nota(nota2) }
    ]);
}

function correcto_nota2(){
    activos += 300;
    patrimonio = activos - pasivos;
    actualizarStats();

    document.getElementById("text").innerHTML = `
        ✔ Correcto. El cliente pagó lo que debía.<br><br>
        Otra nota complicada viene…
    `;
    elegir([{ texto:"Continuar", accion: nota3 }]);
}

////////////////////////////////////////////////////////////
// NOTA 3
////////////////////////////////////////////////////////////

function nota3(){
    document.getElementById("text").innerHTML = `
        <b>NOTA 3:</b> Registraron por error un gasto extra de $150. Debes corregirlo.<br><br>
        ¿Qué haces?
    `;
    elegir([
        { texto:"Cargo: Gastos | Abono: Caja", accion: ()=>error_nota(nota3) },
        { texto:"Cargo: Caja | Abono: Gastos", accion: ()=>correcto_nota3() },
        { texto:"Ignorar el error", accion: ()=>error_nota(nota3) }
    ]);
}

function correcto_nota3(){
    activos += 150;
    patrimonio = activos - pasivos;
    actualizarStats();

    document.getElementById("text").innerHTML = `
        ✔ Corregiste el error contable.<br><br>
        Última nota…
    `;
    elegir([{ texto:"Continuar", accion: notaFinal }]);
}

////////////////////////////////////////////////////////////
// NOTA FINAL
////////////////////////////////////////////////////////////

function notaFinal(){
    document.getElementById("text").innerHTML = `
        <b>NOTA FINAL:</b><br>
        La empresa recibe maquinaria valorada en $1000, pero no está pagada.<br><br>
        ¿Cómo la registras?
    `;
    elegir([
        { texto:"Cargo: Maquinaria | Abono: Proveedores (Pasivo)", accion: ()=>final_correcto() },
        { texto:"Cargo: Caja | Abono: Maquinaria", accion: ()=>error_nota(notaFinal) },
        { texto:"Esperar a pagar para registrarlo", accion: ()=>error_nota(notaFinal) }
    ]);
}

function final_correcto(){
    activos += 1000;
    pasivos += 1000;
    patrimonio = activos - pasivos;
    actualizarStats();
    ganar();
}

////////////////////////////////////////////////////////////
// SISTEMA DE ERRORES
////////////////////////////////////////////////////////////

function error_nota(volvera){
    errores++;
    actualizarStats();

    if(errores >= 3){
        perder("Cometiste 3 errores. La auditoría fue un desastre.");
        return;
    }

    document.getElementById("text").innerHTML =
        `❌ Nota incorrecta.<br><br>¿Intentar nuevamente?`;

    elegir([
        { texto:"Reintentar", accion: volvera },
        { texto:"Rendirme", accion: ()=>perder("Abandonaste la misión.") }
    ]);
}

inicio();
