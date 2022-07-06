export default class Superficie {

    private data1: number;
    private data2: number | undefined;

    constructor(data1:number, data2?:number) {
        this.data1 = data1;
        this.data2 = data2;
    }
    
    cuadrado() {
        return this.data1^2;
    }

    rectangulo() {
        if(typeof this.data2 === 'number') {
            return (this.data1 * this.data2);
        } else {
            return null
        }
    }

    circulo() {
        return(3.1416*(this.data1^2))
    }
}