import http from 'http';
import siteCss from './site.css.js';
import homeHtml from './home.html.js';


const server= http.createServer((req,res) =>{

    if (req.url === '/'){

res.writeHead(200,{
    'Content-Type': 'text/html',
})

    res.write(homeHtml);

    }else if( req.url === '/styles/site.css'){
        res.writeHead(200,{
            'content-type': 'text/css'
        })
        res.write(siteCss)
    }

    res.end()
})


server.listen(5000);

console.log('Server is listening on http://localhost:5000...')