import Navbar from "@/components/navbar/navbar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main className="w-full h-full mb-80 p-8 flex flex-col justify-start items-center">
                {children}
            </main>
            <footer className="w-full h-20 bg-gray-100 flex justify-center items-center">
                <p className="text-gray-600">© 2023 Itransition</p>
            </footer>
        </>
    );
}
