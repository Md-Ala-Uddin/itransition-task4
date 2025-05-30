import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
export default function LoginForm() {
    return (
        <form className="w-full flex flex-col gap-4">
            <Input type="text" name="username" placeholder="Username" />
            <Input type="password" name="password" placeholder="Password" />
            <div className="w-full flex justify-start gap-3">
                <Checkbox id="rememberme" name="rememberme" />
                <label htmlFor="rememberme" className=" text-sm">
                    {" "}
                    Remember me
                </label>
            </div>
            <Button type="submit">Login</Button>
        </form>
    );
}
