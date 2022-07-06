import express from "express";
import { getTime } from "./lib/utils";
import Superficie from "./lib/superficie";
import Perimetro from "./lib/perimetro";
import { Request, Response} from 'express';


const app = express();

app.get('/cuadrado', (req: Request, res: Response) => {
    const { lado, operacion } = req.query;
    
    const cuadrado = operacion === 'perimetro' ? new Perimetro(Number(lado)).cuadrado() : new Superficie(Number(lado)).cuadrado();
    const response = {
        figura: 'Cuadrado',
        calculo: operacion,
        entryParams: lado,
        result: cuadrado
    }
    res.json(response);
})

app.get('/circulo', (req: Request, res: Response) => {
    const { radio, operacion } = req.query;
    const circulo = operacion === 'perimetro' ? new Perimetro(Number(radio)).circulo() : new Superficie(Number(radio)).circulo();
    const response = {
        figura: 'Círculo',
        calculo: operacion,
        entryParams: radio,
        result: circulo
    }
    res.json(response);
})

app.get('/rectangulo', (req: Request, res: Response) => {
    const { lado1, lado2, operacion } = req.query;
    const rectangulo = operacion === 'perimetro' ? new Perimetro(Number(lado1), Number(lado2)).rectangulo() : new Superficie(Number(lado1), Number(lado2)).rectangulo();
    const response = {
        figura: 'Rectángulo',
        calculo: operacion,
        entryParams: [lado1, lado2],
        result: rectangulo
    }
    res.json(response);
})

const PORT = 8080;
app.listen(PORT, () => {
 console.log(`conectado al puerto: ${PORT}`);
});
