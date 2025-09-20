import http from 'http';
import fs from 'fs/promises';
import cats from './cats.js';

async function homeView() {

    const catHtml=cats.map(cat => catTemplate(cat)).join('\n')

    const html=  await fs.readFile('./src/views/home/index.html', { encoding: 'utf-8' });
    
   const result= html.replace('{{cats}}',catHtml)

   return result

}

async function showAddBreed() {
    return await fs.readFile('./src/views/addBreed.html', { encoding: 'utf-8' });
}

async function showAddCat() {
    return await fs.readFile('./src/views/addCat.html',{encoding:'utf-8'})
}


const server = http.createServer(async (req, res) => {

    if (req.method === 'POST'){
        console.log('POST has been made')
        let data=''
        
        req.on('data', (chunk) =>{
            data += chunk.toString()
        })
        req.on('end', ()=>{
            const newCat= new URLSearchParams(data)

           const result=(Object.fromEntries(newCat.entries()))
            cats.push(result)

            res.writeHead(301,{
                'location':'/'
            })
            res.end()
        })
        return
    }
    if (req.url === '/') {
        const homeHtml = await homeView();

        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        res.write(homeHtml);


    } else if (req.url === '/styles/site.css') {
        const homeCss = await fs.readFile('./src/style/style.css', { encoding: 'utf-8' });

        res.writeHead(200, {
            'Content-Type': 'text/css',
        });

        res.write(homeCss);
    } else if (req.url === '/cats/add-breed') {
        const addBreedHtml = await showAddBreed();

        res.writeHead(200, {
            'Content-Type': 'text/html', 
        });

        res.write(addBreedHtml);
    }else if(req.url === '/cats/add-cat'){
        const addCatHtml= await showAddCat()

        res.writeHead(200,{
            'content-type':'text/html'
        })

        res.write(addCatHtml)

    }

    res.end();
});

function catTemplate(cat) {
   return `<li>
                    <img src="${cat.imageUrl}" alt="${cat.name}">
                    <h3></h3>
                    <p><span>Breed: </span>"${cat.breed}"</p>
                    <p><span>Description: </span>"${cat.description}"</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="">Change Info</a></li>
                        <li class="btn delete"><a href="">New Home</a></li>
                    </ul>
                </li>
   ` 
}

server.listen(5000);
console.log('Server is listening on http://localhost:5000...');
