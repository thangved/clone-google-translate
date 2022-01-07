const languageList = document.querySelector('.lang-list')
const inputText = document.getElementById('inputText')
let target = 'vi'
let langs = {}

const setTargetLangUI = () => {
    document.querySelector('.target-lang').innerText = langs[target].native
}

const setTargetLang = (lang) => {
    target = lang
    document.querySelectorAll('.lang-item').forEach(e => {
        e.classList.remove('active')
    })
    document.querySelector(`.lang-item.lang-${target}`).classList.add('active')
    setTargetLangUI()
    translating()
}

axios.get('https://unpkg.com/countries-list@2.6.1/dist/languages.json')
    .then(({ data }) => {
        langs = data
        Object.keys(data).forEach(e => {
            const languageItem = document.createElement('div')
            languageItem.className = `lang-item lang-${e}`

            const name = document.createElement('div',)
            name.className = 'name'

            const native = document.createElement('div')
            native.className = 'native'

            native.innerText = data[e].native
            name.innerHTML = data[e].name

            languageItem.append(native, name)
            languageItem.addEventListener('click', () => setTargetLang(e))

            languageList.append(languageItem)
        })
        setTargetLang(target)
    })

function toggleLanguageList() {
    languageList.classList.toggle('active')
    document.getElementById('toggleLanguageList').classList.toggle('active')
}

document.getElementById('toggleLanguageList').addEventListener('click', toggleLanguageList)

const getInput = () => {
    return inputText.value
}

const setTargetText = text => {
    document.getElementById('targetText').innerText = text
}

const translating = () => {
    if (getInput().length === 0)
        return

    const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: { to: target, 'api-version': '3.0', profanityAction: 'NoAction', textType: 'plain' },
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
            // Lấy {api key} tại đây: https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/
            'x-rapidapi-key': '{api key}'
        },
        data: [{ Text: getInput() }]
    };

    axios.request(options).then(function (response) {
        setTargetText(response.data[0].translations[0].text)
    }).catch(function (error) {
        console.error(error);
    });
}

inputText.addEventListener('keyup', _ => {
    if (inputText.value.length >= 50)
        inputText.classList.add('small')
    else inputText.classList.remove('small')

    const interval = setTimeout(translating, 1000)
    window.clearTimeout(interval - 1)
})

