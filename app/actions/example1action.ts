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

export async function updatePropertyStatus(id: string, prevState: RequestResponse, formData: FormData): Promise<RequestResponse> {
    
    const rawName = String(formData.get('name') || '').trim();
    const rawPrice = formData.get('price');
    const isPublished = formData.has('published');

    if (!rawPrice || rawPrice === "") {
        return { 
            success: false, 
            message: "O preço é obrigatório e não pode ficar vazio.", 
            payload: { name: rawName, published: isPublished } 
        };
    }

    const formDataValues = {
        name: rawName,
        price: Number(rawPrice),
        published: isPublished
    }
    
    if (!id) return { success: false, message: "ID do imóvel ausente.", payload: {} };
    if (!formDataValues.name) return { success: false, message: "O nome é obrigatório.", payload: {} };

    if (Number.isNaN(formDataValues.price) || formDataValues.price < 0) {
        return {
            success: false,
            message: "O preço deve ser um número válido e positivo.",
            payload: formDataValues
        }
    }

    try { 
        propertyUpdate({ 
            id, 
            name: formDataValues.name, 
            price: Math.round(formDataValues.price * 100), 
            published: formDataValues.published 
        });

        revalidatePath('/example1');

        return { 
            success: true, 
            message: "Imóvel atualizado com sucesso", 
            payload: formDataValues
        };
    } catch(e) {
        return { 
            success: false, 
            message: e instanceof Error ? e.message : 'Erro interno no banco de dados', 
            payload: formDataValues
        }
    }
}

export async function getProperties() {
    return db;
}