const apikey = ''

let user = JSON.parse(sessionStorage.getItem('data'));
const token = user.data.token;

export default function getCompras( {keyword = 'morty' } = {} ){
    const apiURL = `http://localhost:8010/api/v1/compras/`

    return fetch(apiURL, { headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
        'x-token': `${token}`
      } } )
        .then(res => res.json())
        .then(response => {
            const {data = []} = response
            if (Array.isArray(data)){
                const compras = data.map(image => {
                    const {images, title, id} = image
                    const {url} = images.downsized_medium
                    return { title, id, url }

                })
                return compras
            }
        })
}