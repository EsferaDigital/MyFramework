const cuentaRegresiva = function countDown(){
  const getRemainTime = deadline =>{
    let now = new Date(),
        remainTime = (new Date(deadline) - now + 1000) / 1000,
        remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
        remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
        remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
        remainDays = Math.floor(remainTime / (3600 * 24))

    return{
      remainTime,
      remainSeconds,
      remainMinutes,
      remainHours,
      remainDays
    }
  }

  const countdown = (deadline, elem) =>{
    const el = document.getElementById(elem);
    const timerUpdate = setInterval( ()=>{
      let t = getRemainTime(deadline)
      el.innerHTML = `
            <div class="Contador-content-item">
              <div class="Contador-content-item-number">${t.remainDays}</div>
              <div class="Contador-content-item-text">Días</div>
            </div>
            <div class="Contador-content-item">
              <div class="Contador-content-item-number">${t.remainHours}</div>
              <div class="Contador-content-item-text">Horas</div>
            </div>
            <div class="Contador-content-item">
              <div class="Contador-content-item-number">${t.remainMinutes}</div>
              <div class="Contador-content-item-text">Minutos</div>
            </div>
            <div class="Contador-content-item">
              <div class="Contador-content-item-number">${t.remainSeconds}</div>
              <div class="Contador-content-item-text">Segundos</div>
            </div>`
      if(t.remainTime <= 1){
        clearInterval(timerUpdate)
      }
    }, 1000)
  }
  countdown('November 1 2019 12:00:00 GMT-500', 'clock');
}

export default cuentaRegresiva
