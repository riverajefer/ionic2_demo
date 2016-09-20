export class Carne{
	id:number;
	titulo: string;
	descripcion: string;
	valor: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}