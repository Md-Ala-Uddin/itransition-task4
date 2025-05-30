import Logo from '@/app/ui/logo';
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full h-screen flex flex-col md:flex-row-reverse">
            {/* right */}
            <div className="hidden md:block md:basis-1/2 md:h-full bg-primary"></div>

            {/* left  */}
            <div className="basis-full md:basis-1/2 grow h-full p-8 flex flex-col items-center justify-center">
                <div className="w-full flex justify-center md:justify-start">
                    <Logo/>
                </div>
                {children}
            </div>
        </main>
    );
}
