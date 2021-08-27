const url = "http://localhost:3000/real_logs"
const url2 = "http://localhost:3000/logs"

let elementReal = document.getElementById('elementReal'), 
clear;



function DatosReal(){
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
    
        
        elementReal.innerHTML =
        
        
       
              `  
             
              <h2>Datos a tiempo real</h2>
              
              <div class="fila">
                  <div class="dato"><h1> Fecha y Hora: </h1></div>
                  <div class="valor"><h1>${data.loggers[0].recdate}</h1></div>
              </div>
              <div class="fila">
                  <div class="dato">Temperatura: </div>
              
                  <div class="valor">${data.loggers[0].pTemp}</div>
              </div>
              <div class="fila">
                  <div class="dato">Peso RC: </div>
                  <div class="valor">${data.loggers[0].pesoRC}</div>
              </div>
              <div class="fila">
                  <div class="dato">Peso DD: </div>
                  <div class="valor">${data.loggers[0].pesoDD}</div>
              </div>
              <div class="fila">
                  <div class="dato">Voltaje de la batería: </div>
                  <div class="valor">${data.loggers[0].battvolt}</div>
              </div>
              <div class="fila">
                  <div class="dato">Temperatura Hight: </div>
                  <div class="valor">${data.loggers[0].tempHight}</div>
              </div>
              <div class="fila">
                  <div class="dato">Temperatura Low: </div>
                  <div class="valor">${data.loggers[0].tempLow}</div>
              </div>
              <div class="fila">
                  <div class="dato">Peso Dispositivo High: </div>
                  <div class="valor">${data.loggers[0].weightDepositHight}</div>
              </div>
              <div class="fila">
                  <div class="dato">Peso Dispositivo Low: </div>
                  <div class="valor">${data.loggers[0].weightDepositLow}</div>
              </div>
              <div class="fila">
                  <div class="dato">¿Ventilador encendido?: </div>
                  <div class="valor">${data.loggers[0].venti} </div>
              </div>
              
          </div>
           `
               

                
                
        console.log(data)
    })
    
    .catch(err => console.log(err))
}

const elementHistoric = document.getElementById('elementHistoric');

function DatosHist(){
    
            fetch(url2)
            .then(response => response.json())
            .then(data => {
               
                elementHistoric.innerHTML= ''

                data.forEach(aux => {
                   
                   
                    elementHistoric.innerHTML+=
                    
                    `
                    
                    
                    <div class="dato_historico">
                    
                    <a href="/lisimetros/pages/datoshistoricos.html?id=${aux.id}">Dato histórico ${aux.recdate}</a>  <br>
                    
                    </div>
                    
                    
                    
        
                    `
                });
         
            
                console.log(data)
            })
            
            .catch(err => console.log(err))

           
        }








    let URLactual = window.location.href;
    console.log(URLactual)
    
    
    if(URLactual.includes("datoshistoricos.html")){


    let valores = window.location.search;
    console.log(valores);
    let urlParams = new URLSearchParams(valores);
    let producto = urlParams.get('id');
    console.log(producto)
    
    let url_hist ="http://localhost:3000/log/" + producto;
    console.log(url_hist)
    
    const elemDato = document.getElementById('elemDato');

    fetch(url_hist)
    .then(response => response.json())
    .then(data => {
    
        elemDato.innerHTML=
        
        
        `
        <div class="contenedorinnerReal">
    <div class="fila">
                  <div class="dato"><h1> Fecha y Hora: </h1></div>
                  <div class="valor"><h1>${data.recdate}</h1></div>
              </div>
              <div class="fila">
                  <div class="dato">Temperatura: </div>
              
                  <div class="valor">${data.pTemp}</div>
              </div>
              <div class="fila">
                  <div class="dato">Peso RC: </div>
                  <div class="valor">${data.pesoRC}</div>
              </div>
              <div class="fila">
                  <div class="dato">Peso DD: </div>
                  <div class="valor">${data.pesoDD}</div>
              </div>
              <div class="fila">
                  <div class="dato">Voltaje de la batería: </div>
                  <div class="valor">${data.battvolt}</div>
              </div>
              <div class="fila">
                  <div class="dato">Temperatura Hight: </div>
                  <div class="valor">${data.tempHight}</div>
              </div>
              <div class="fila">
                  <div class="dato">Temperatura Low: </div>
                  <div class="valor">${data.tempLow}</div>
              </div>
              <div class="fila">
                  <div class="dato">Peso Dispositivo High: </div>
                  <div class="valor">${data.weightDepositHight}</div>
              </div>
              <div class="fila">
                  <div class="dato">Peso Dispositivo Low: </div>
                  <div class="valor">${data.weightDepositLow}</div>
              </div>
              <div class="fila">
                  <div class="dato">¿Ventilador encendido?: </div>
                  <div class="valor">${data.venti} </div>
              </div>
              
          </div>
        `
       
    })
    
    .catch(err => console.log(err))
        console.log("pagina ok")
}




document.getElementById('boton1').addEventListener("click",()=>{
elementHistoric.className = "disable";
elementReal.className = "contenedorinnerReal";
clear=setInterval(DatosReal,3000);
});

document.getElementById('boton2').addEventListener("click",()=>{
elementReal.className = "disable";
elementHistoric.className = "todos_datos_historicos";
clearInterval(clear) ,DatosHist()
});


  