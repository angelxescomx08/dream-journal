import { useUser } from "../../users/hooks/useUser";
import { useHistory } from "react-router";
import { type FieldErrors, useForm } from "react-hook-form";
import { type Dream, dreamSchema } from "../../../lib/validations/dreams";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useSQLiteDB from "../../../hooks/useSQLiteDB";

export const useCreateDream = () => {
  const { initialized, performSQLAction } = useSQLiteDB();
  const { user } = useUser();
  const router = useHistory();
  const queryClient = useQueryClient();

  const form = useForm<Dream>({
    resolver: zodResolver(dreamSchema),
    defaultValues: {
      user_id: user.data?.user_id ?? "",
      title: "",
      content: "",
      created_at: new Date().toISOString(),
      dream_id: crypto.randomUUID(),
    },
    disabled: user.isLoading || !initialized,
  });

  const createDreamMutation = useMutation({
    mutationFn: async (data: Dream) => {
      const result = await performSQLAction(async (db) => {
        const { user_id, title, content, created_at, dream_id } = data;
        const command =
          "INSERT INTO dreams (user_id, title, content, created_at, dream_id) VALUES (?, ?, ?, ?, ?)";
        const result = await db?.run(command, [
          user_id,
          title,
          content,
          created_at,
          dream_id,
        ]);
      });
      queryClient.invalidateQueries({
        queryKey: ["dreams"],
        exact: false,
      });
      return result;
    },
    onSuccess: () => {
      router.push("/home");
      toast.success("Se ha creado el sueño correctamente");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error al registrar tus datos");
    },
  });

  const onSubmit = async (data: Dream) => {
    await createDreamMutation.mutateAsync(data);
  };

  const onReject = (errors: FieldErrors<Dream>) => {
    console.log(errors);
    toast.error("Error al crear sueño");
  };

  return {
    form,
    createDreamMutation,
    onSubmit,
    onReject,
  };
};
