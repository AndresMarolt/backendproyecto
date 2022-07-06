export default class Perimetro {

    private data1: number;
    private data2: number | undefined;

    constructor(data1:number, data2?:number) {
        this.data1 = data1;
        this.data2 = data2;
    }
    
    cuadrado() {
        return this.data1 * 4;
    }

    rectangulo() {
        if(typeof this.data2 === 'number') {
            return (this.data1 + this.data2) * 2;
        } else {
            return null
        }
    }

    circulo() {
        return(2*3.1416*this.data1)
    }
}