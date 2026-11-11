
'use client'

import { useActionState } from "react";
import { Property, updatePropertyStatus } from "../app/actions/example1action";
import { useFormStatus } from "react-dom";

function PropertyListing({ property }: { property: Property }) {

    const updateWithId = updatePropertyStatus.bind(null, property.id);

    const [state, action, isPending] = useActionState(updateWithId, null);

    const displayPrice = property.price / 100

    return (
        <form action={action}>
            <div className="p-4 border rounded">
                <div className="mt-4">
                    <input type="hidden" name="id" value={property.id} />
                    <label>Nome:</label>
                    <input
                        defaultValue={state?.payload.name ? state?.payload.name : property.name}
                        type="text"
                        className="border p-2 w-full"
                        name='name'
                        disabled={isPending}
                    />
                    <label>Preço (R$):</label>
                    <input
                        defaultValue={(state?.payload?.price ?? displayPrice).toFixed(2)}
                        type="number"
                        className="border p-2 w-full"
                        step={0.01}
                        min={0}
                        name='price'
                        disabled={isPending}
                    />
                </div>

                <div className="mt-4">
                    <label>
                        <input
                            defaultChecked={state?.payload.published ? state?.payload.published : property.published}
                            type="checkbox"
                            className="mr-2"
                            name='published'
                            disabled={isPending}
                        />
                        Publicar anúncio
                    </label>
                </div>

                <button
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                    type="submit"
                >
                    {isPending ? 'Salvando' : 'Salvar Alterações'}
                </button>

                {state?.message}
            </div>
        </form>
    )
}

export function Example1Component({ properties }: { properties: Property[] }) {


    return (
        <div>
            <div>
                {properties.map(property => (
                    <div key={property.id}>
                        <PropertyListing property={property} />
                    </div>
                ))}
            </div>
        </div>
    )
}