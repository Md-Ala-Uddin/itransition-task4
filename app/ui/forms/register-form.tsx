import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
export default function RegisterForm() {
    return (
        <form className="w-full flex flex-col gap-4">
            <Input type="text" name="name" placeholder="Name" />
            <Input type="text" name="username" placeholder="Username" />
            <Input type="text" name="email" placeholder="Email" />
            <Input type="password" name="password" placeholder="Password" />
            <Input type="password" name="confirm_password" placeholder="Confirm Password" />
            <Button type="submit">Register</Button>
        </form>
    );
}
