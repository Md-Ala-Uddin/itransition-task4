import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordForm() {
    return (
        <form className="w-full flex flex-col gap-4">
            <Input type="password" name="password" placeholder="New Password" />
            <Input type="password" name="confirm_password" placeholder="Confirm Password" />
            <Button type="submit">Reset</Button>
        </form>
    );
}
