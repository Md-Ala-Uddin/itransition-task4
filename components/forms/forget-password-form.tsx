import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgetPasswordForm() {
    return (
        <form className="w-full flex flex-col gap-4">
            <Input type="text" name="email" placeholder="email" />
            <Button type="submit">Send</Button>
        </form>
    );
}
