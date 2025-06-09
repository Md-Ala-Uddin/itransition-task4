import Navbar from "@/components/navbar/navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Navbar />
        {children}
        <footer className="w-full h-20 bg-gray-100 flex justify-center items-center">
          <p className="text-gray-600">© 2023 Itransition</p>
        </footer>
        </>
    );
}