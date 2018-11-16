window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
const recognition = new SpeechRecognition()
recognition.lang = 'en-IN'
let isRunning = false

const dictate = () => {
  recognition.start()
  isRunning = true

  recognition.onresult = event => {
    const speechToText = event.results[0][0].transcript

    console.log(speechToText)
    removeBorder()

    if (event.results[0].isFinal) {
      if (/\w? ?(\w+ dekh|look here)/i.test(speechToText)) {
        doAction('look')
        setTimeout(() => {
          document.getElementById('look').pause()
        }, 2500)
        setTimeout(() => {
          document.getElementById('look').play()
        }, 3000)
        return
      }

      if (/\w? ?(Has)? (Ke)? ?dikha|smile/i.test(speechToText)) {
        doAction('smile')
        return
      }

      if (/\w? ?sat sri akal/i.test(speechToText)) {
        doAction('ssa')
        return
      }

      if (/\w? ?(gana suna|sing a song)/i.test(speechToText)) {
        doAction('song1')
        return
      }

      if (/\w? ?SP (de)? rank wargi ?(suna)?/i.test(speechToText)) {
        doAction('spSong')
        return
      }

      if (/\w? ?bus|chup|choo|sto\S+/i.test(speechToText)) {
        document.getElementById('song1').pause()
        document.getElementById('spSong').pause()
        onReset()
      }

      // if (/hello nimmi \w+ \w+/i.test(speechToText)) {
      //   const name = speechToText.match(/hello nimmi (\w+) \w+/i)[1]
      //   speak(sayHello(name))
      // }
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

const speak = action => {
  utterThis = new SpeechSynthesisUtterance(action)
  utterThis.lang = 'en-IN'
  utterThis.voice = synth.getVoices()[54]
  utterThis.rate = 0.85
  synth.speak(utterThis)
}

const doAction = action => {
  document.getElementById('body').className = action
  document.getElementById(action).play()
}

const onReset = () => {
  document.getElementById('body').className = 'default'
  document.getElementById('default').play()
}

const removeBorder = () => {
  document.getElementById('container').className = ''
}

document.addEventListener('click', () => {
  if (isRunning) return

  dictate()
  document.getElementById('body').className = 'default'
  document.getElementById('default').play()
})
