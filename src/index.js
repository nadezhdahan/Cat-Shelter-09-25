import http from 'http';
import fs from 'fs/promises';

async function homeView() {
    return await fs.readFile('./src/views/home/index.html', { encoding: 'utf-8' });
}

async function showAddBreed() {
    return await fs.readFile('./src/views/addBreed.html', { encoding: 'utf-8' });
}

const server = http.createServer(async (req, res) => {
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
            'Content-Type': 'text/html', // ✅ поправено
        });

        res.write(addBreedHtml);
    }

    res.end();
});

server.listen(5000);
console.log('Server is listening on http://localhost:5000...');
