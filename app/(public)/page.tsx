import Image from "next/image";

export default function Home() {
    return (
        <main className="w-full h-full mb-80 flex flex-col">
            <div className="w-full h-40 md:h-80 bg-primary flex justify-center items-center">
                <h1 className="mb-10 text-3xl font-bold text-center text-primary-foreground">
                    Welcome to THE APP
                </h1>
            </div>
            <section className="w-full px-8 md:px-16">
                <p className=" mt-5 text-gray-600 text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptate delectus non laudantium ullam, officia suscipit
                    recusandae dolores quas autem nemo quis, quo odio aliquam
                    ducimus laboriosam? Quaerat eaque animi quod atque numquam
                    sit quis possimus eveniet, modi, fugiat natus ducimus quidem
                    magni, et distinctio aperiam autem ab illum placeat tempore
                    laudantium. Enim hic provident commodi excepturi
                    praesentium. Aperiam ipsum quo, laborum minus commodi odit
                    sit recusandae incidunt assumenda dicta aspernatur explicabo
                    animi laudantium porro nemo illum perferendis fugit
                    necessitatibus reiciendis.
                </p>
            </section>
        </main>
    );
}
