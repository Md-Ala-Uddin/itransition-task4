import { Input } from "@/components/ui/input";

export default function InputField({
    type,
    id,
    name,
    placeholder,
    error,
}: {
    type: string;
    id?: string;
    name: string;
    placeholder: string;
    error?: string[];
}) {
    return (
        <div className="w-full">
            <Input type={type} id={id} name={name} placeholder={placeholder} />
            {error && (
                <span className="text-destructive text-xs mt-1">{error}</span>
            )}
        </div>
    );
}
