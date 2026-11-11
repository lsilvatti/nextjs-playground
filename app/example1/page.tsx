import { Example1Component } from "../../components/Example1Component";
import { getProperties } from "../actions/example1action";


export default async function Example1Page() {

    const properties = await getProperties();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Example1Component properties={properties} />
      </main>
    </div>
  )
}