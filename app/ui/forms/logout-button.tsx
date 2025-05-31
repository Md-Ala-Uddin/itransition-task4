import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function LogoutButton({ ...props }) {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
            {...props}
        >
            <Button type="submit" variant='destructive'>Logout</Button>
        </form>
    );
}
