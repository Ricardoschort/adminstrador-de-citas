//variables
const nombreInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

const formulario = document.querySelector("#nueva-cita");
const citasContenedor = document.querySelector("#citas");
let editando;

// objeto
const citaObj ={
  mascota:"",
  propietario:"",
  telefono:"",
  fecha:"",
  hora:"",
  sintomas:""
}



// eventos
nombreInput.addEventListener("input",añadirCitas);
propietarioInput.addEventListener("input",añadirCitas);
telefonoInput.addEventListener("input",añadirCitas);
fechaInput.addEventListener("input",añadirCitas);
horaInput.addEventListener("input",añadirCitas);
sintomasInput.addEventListener("input",añadirCitas);

formulario.addEventListener("submit",validarForm)



// clases

class GenerarCitas{
  constructor() {
    this.citas = []
  }

  agregarCitas(cita){
    this.citas = [...this.citas,cita];
    visual.añadirCitasHtml(this.citas);
  }

  borrarCitaOBj(id){
    this.citas = this.citas.filter(cita => cita.id !== id);
  }

  actualizarCita(citaActulizada){
    this.citas = this.citas.map( citas => citas.id === citaActulizada.id ? citaActulizada : citas );
    visual.añadirCitasHtml(this.citas);
     }
 
}

class Ui{

  mostrarAlerta(mensaje,tipo){
       //crear el div y su contenido
    const divAlert = document.createElement("div");
    divAlert.textContent = mensaje
    divAlert.className =("text-center d-block col-12 alert");
  
    
    if(tipo === "error"){
      divAlert.classList.add("alert-danger");
    }else{
      divAlert.classList.add("alert-success");
    }
  
        
  document.querySelector("#contenido").insertBefore(divAlert,document.querySelector(".agregar-cita"))
  setTimeout(() => {
    divAlert.remove()
  }, 2500);
  
  }
 
  añadirCitasHtml(citas){
    this.limpiarhtml();
    citas.forEach(cita => {
      const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita
      const citaContent = document.createElement("div");
      citaContent.classList.add("mt-5")
      citaContent.innerHTML =
      `
      <h2 class=" font-weight-bolder title-card tittle">${mascota}  </h2>
      <p> <span class=" font-weight-bolder">Propietario: </span>${propietario}</p>
      <p> <span class=" font-weight-bolder">Telefono: </span>${telefono}</p>
      <p> <span class=" font-weight-bolder">Fecha: </span>${fecha}</p>
      <p> <span class=" font-weight-bolder">Hora: </span>${hora}</p>
      <p> <span class=" font-weight-bolder">Sintomas: </span>${sintomas}</p>
    
      
      `
      const btnBorrar = document.createElement("button");
      btnBorrar.classList.add("btn","btn-borrar","btn-danger","mr-2")
      btnBorrar.innerText = "eliminar"
      btnBorrar.onclick = () => borrarCita(id)
      citaContent.appendChild(btnBorrar);
      citasContenedor.appendChild(citaContent)

      // boton para editar
      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn","btn-info")
      btnEditar.innerText= "editar"
      btnEditar.onclick =()=> cargarEdicion(cita);
      citaContent.appendChild(btnEditar);
      citasContenedor.appendChild(citaContent)

    });
  }

  limpiarhtml(){
    while(citasContenedor.firstChild){
      citasContenedor.removeChild(citasContenedor.firstChild)
    }
  }

  

}


//instancias
const crearCita = new GenerarCitas();
const visual = new Ui();


// funciones

function añadirCitas(e){
  citaObj[e.target.name]= e.target.value
}

function validarForm(e){
  e.preventDefault()
  
  const {mascota,propietario,telefono,fecha,hora,sintomas} = citaObj;

  if(mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora=== "" || sintomas ===""){
    visual.mostrarAlerta("Todos los campos son obligatorio", "error")
    return
  }

  if(editando){
    visual.mostrarAlerta("Editado correctamente")

    crearCita.actualizarCita({...citaObj});
    
    document.querySelector('button[type="submit"]').textContent = "crear cita"
   

    editando = false;
  }else{
    // generar un id
    citaObj.id = Date.now();
  
    crearCita.agregarCitas({...citaObj});
    visual.mostrarAlerta("Se agrego correctamente")
   
  }
  
  // reinicar el objeto
  reinicarObj()

  // reiniciar el form
  formulario.reset();
   
}

function reinicarObj(){
  citaObj.mascota="";
  citaObj.propietario="";
  citaObj.telefono="";
  citaObj.fecha="";
  citaObj.hora="";
  citaObj.sintomas="";

}

function borrarCita(id){
  //eliminar del arreglo
  crearCita.borrarCitaOBj(id)

  //borrando del html
  const {citas} = crearCita
  visual.añadirCitasHtml(citas);
 
  //mensaje
  visual.mostrarAlerta("eliminado correctamente")
}

function cargarEdicion(cita){
  const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita

  nombreInput.value = mascota;
  propietarioInput.value =propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  citaObj.mascota= mascota;
  citaObj.propietario=propietario;
  citaObj.telefono= telefono;
  citaObj.fecha= fecha;
  citaObj.hora= hora;
  citaObj.sintomas= sintomas;
  citaObj.id = id

  document.querySelector(".btn-borrar").disabled = true;
  document.querySelector('button[type="submit"]').textContent = "Guardar Datos"
  editando = true;

}