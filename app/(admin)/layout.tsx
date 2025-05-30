export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full h-full flex flex-col justify-start items-center p-8">
            {children}
        </main>
    );
}
