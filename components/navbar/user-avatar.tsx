import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function UserAvatar({ user }: { user: User }) {
    return (
        <Popover>
            <PopoverTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col">
                    <div className="w-full">
                        <span className="font-bold">Name: </span>
                        <span>{user.name}</span>
                    </div>
                    <div className="w-full">
                        <span className="font-bold">Email: </span>
                        <span>{user.email}</span>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
