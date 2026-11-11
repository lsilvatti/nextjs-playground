"use server";

import { revalidatePath } from "next/cache";

export interface Property { 
    id: string,
    name: string,
    price: number,
    published: boolean
}

const db: Property[] = [
    {
        id: 'prop1',
        name: 'beach house',
        price: 40000000,
        published: false
    },
    {
        id: 'prop2',
        name: 'mountain cabin',
        price: 20000000,
        published: true
    }
]

type RequestResponse = {
    success: boolean,
    message: string,
    payload: Partial<Property>
} | null

function propertyUpdate ({ id, name, price, published }: Property) {
    const property = db.find(p => p.id === id);

    if (!property) throw new Error("Propriedade não encontrada");

    property.name = name;
    property.price = price;
    property.published = published;

    return property;
}

export async function updatePropertyStatus(id: string, prevState:RequestResponse, formData: FormData):Promise<RequestResponse> {
    const formDataValues:Partial<Property> = {
        name: String(formData.get('name') || '').trim(),
        price: Number(formData.get('price')),
        published: formData.has('published')
    }
    
    if (!id) return { success: false, message: "ID do imóvel ausente.", payload: {} };
    if (!formDataValues.name) return { success: false, message: "O nome é obrigatório.", payload: {} };

    if(formDataValues.name === '') {
            console.log(formDataValues);

        return {
            success: false,
            message: "Campos não podem ser vazios",
            payload: formDataValues
        }
    }

    try { 
        revalidatePath('/example1')

        return { success: true, message: "Imóvel atualizado com sucesso", payload: formDataValues};
    } catch(e) {
        return { success: false, message: e instanceof Error ? e.message : 'Erro desconhecido', payload: formDataValues}
    }
    
   
}

export async function getProperties() {
    return db;
}