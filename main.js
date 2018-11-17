window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
const recognition = new SpeechRecognition()
recognition.lang = 'en-IN'
let isRunning = false

const dictate = () => {
  recognition.start()
  isRunning = true

  recognition.onresult = event => {
    const speechText = event.results[0][0].transcript

    console.log(speechText)
    removeBorder()

    if (event.results[0].isFinal) {
      if (/\w? ?(\w+ dekh|look here)/i.test(speechText)) {
        doAction('look')
        setTimeout(() => {
          document.getElementById('look').pause()
        }, 2500)
        setTimeout(() => {
          document.getElementById('look').play()
        }, 3000)
        return
      }

      if (/\w? ?(Has)? (Ke)? ?dikha|smile/i.test(speechText)) {
        doAction('smile')
        return
      }

      if (/\w? ?sat sri akal/i.test(speechText)) {
        doAction('ssa')
        return
      }

      if (/\w? ?(gana suna|sing a song)/i.test(speechText)) {
        doAction('song1')
        return
      }

      if (/\w? ?SP (de)? rank wargi ?(suna)?/i.test(speechText)) {
        doAction('spSong')
        return
      }

      if (/\w? ?bus|chup|choo|sto\S+/i.test(speechText)) {
        document.getElementById('song1').pause()
        document.getElementById('spSong').pause()
        doAction('default')
      }
    }
  }

  recognition.onspeechstart = () => {
    document.getElementById('container').className = 'isPending'
  }

  recognition.onend = () => {
    recognition.abort()
    setTimeout(() => {
      recognition.start()
    }, 1)
  }

  recognition.onerror = () => {
    removeBorder()
  }
}

const doAction = action => {
  document.getElementById('body').className = action
  document.getElementById(action).play()
}

const removeBorder = () => {
  document.getElementById('container').className = ''
}

document.addEventListener('click', () => {
  if (isRunning) return

  dictate()
  doAction('default')
})
