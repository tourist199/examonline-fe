import { Component } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { withLocalize } from 'react-localize-redux'
import setLocale from 'yup/lib/setLocale'

import errorMessagesEN from '@/languages/error-messages/en.json'
import errorMessagesVI from '@/languages/error-messages/vi.json'
import validationEN from '@/languages/validation/en.json'
import validationVI from '@/languages/validation/vi.json'
import Request from '@/utils/request'
import Storage from '@/utils/storage'

setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

@withLocalize

class Init extends Component {
  componentDidMount() {
    const { initialize, addTranslationForLanguage: add } = this.props

    initialize({
      languages: [{
        name: 'English',
        code: 'en'
      }, {
        name: 'Tiếng việt',
        code: 'vi'
      }],
      options: {
        renderToStaticMarkup
      }
    })

    add(errorMessagesEN, 'en')
    add(errorMessagesVI, 'vi')
    add(validationEN, 'en')
    add(validationVI, 'vi')

    const token = Storage.get('ACCESS_TOKEN')
    Request.setAccessToken(token)

    this._hidePreloading()
  }

  _hidePreloading() {
    const preloading = document.getElementsByClassName('preloading')[0]

    const fadeEffect = setInterval(() => {
      if (!preloading.style.opacity) {
        preloading.style.opacity = 1
      }
      if (preloading.style.opacity === '1') {
        preloading.style.opacity = 0
      } else {
        clearInterval(fadeEffect)
        preloading.style.display = 'none'
      }
    }, 500)
  }

  render() {
    return null
  }
}

export default Init
