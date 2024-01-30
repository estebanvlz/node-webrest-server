// Import the 'http' module to create an HTTP server
import http from 'http';
import fs from 'fs';
import http2 from 'http2';

// Create an HTTP server with a callback function to handle incoming requests
const server = http2.createSecureServer( {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
}, (req, res) => {

    // Log the requested URL to the console


    // res.writeHead(200, {'Content-Type': 'text/html'});

    if (req.url === '/' )  {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end( htmlFile );
        return;
    }
    if (req.url?.endsWith('.js')) {
        res.writeHead(200, {'Content-Type': 'aplication/javascript'});
    } else if ( req.url?.endsWith('.css')) {
        res.writeHead(200, {'Content-Type': 'text/css'});
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');

    console.log(req.url);

    // End the response, indicating that it is complete
    res.end(responseContent);
});

// Start the server and listen on port 8080
server.listen(8080, () => {

    // Log a message when the server is running and listening on port 8080
    console.log('Server running on port 8080');
});
