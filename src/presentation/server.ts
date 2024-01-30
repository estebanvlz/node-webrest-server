import express from 'express';
import path from 'path';

interface Options {

    PORT: number,

    PUBLIC_PATH: string,

}


export class Server {

    private app = express();

    private readonly port: number;

    private readonly publicPath: string;


    constructor(options: Options){

        const {PORT, PUBLIC_PATH} = options;

        this.port = PORT;

        this.publicPath = PUBLIC_PATH;

    }

    async start() {

        //* Middlewares - funciones que se ejecutan cada vez que pasen por una ruta

        this.app.use(express.static( this.publicPath ));

        this.app.get('*', (req, res) => {

            const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html`)

            res.sendFile(indexPath);

            console.log(req)

            return

        })

        this.app.listen(this.port, () => {

            console.log('Server running on port 3000')
        })

    }

}