import {
  emailFriendZodSchema,
  type EmailFriendZodSchemaType,
} from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { useRoomActions } from "@/hooks/use-room.actions";
import { Search, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const FormSearchFriend = ({ handleClickRoomId }: Props) => {
  const [isLoading, startTransition] = useTransition();
  const { findOrCreateRoom } = useRoomActions();

  const form = useForm<EmailFriendZodSchemaType>({
    resolver: zodResolver(emailFriendZodSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: EmailFriendZodSchemaType) {
    startTransition(async () => {
      const response = await findOrCreateRoom(values.email);
      console.log(response);
      if (response.success) {
        handleClickRoomId(response.roomId);
        toast.success("Friend encontrado, comienza a chatear");
        form.reset();
      }
      toast.error(response.message);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="shadcn@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"secondary"}
          className="w-full gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Search for a friend
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
export default FormSearchFriend;
