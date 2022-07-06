const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
   mode: 'production',                      // development o production
   entry: './src/server.ts',                // define el punto de entrada de nuestro código
   target: "node",
   externals: [nodeExternals()],            // permite el correcto funcionamiento con algunas librerias externas (en este caso Express)

   output: {                                        // Define el punto de salida
       path: path.resolve(__dirname, 'dist'),
       filename: 'main.js',
   },
   resolve: {                                       // configura cómo se resuelven los módulos, o sea con qué extensiones
       extensions: ['.ts', '.js'],
   },
   module: {                                        // le dice a webpack cómo debe procesar los loaders que queremos utilizar para un proyecto. Loaders son transformaciones que se aplican en el código fuente de nuestras aplicaciones
       rules: [
           {
               test: /\.tsx?/,
               use: 'ts-loader',
               exclude: /node_modules/
           }
       ]
   }
}
