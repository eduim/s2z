import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { errorMatch, getDateString } from "@/lib/utils";
import { formInputs, addPurchaseProps } from "@/types";

const AddPurchase = ({ lastDate, addPurchase }: addPurchaseProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInputs>();
  const onSubmit: SubmitHandler<formInputs> = (data: formInputs) => {
    addPurchase(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
      <div className="grid w-full items-end gap-4">
        <div className="flex flex-col w-72 space-y-1.5 items-start">
          <input
            {...register("date", {
              required: true,
            })}
            min={getDateString(lastDate)}
            type="date"
            className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
          />
        </div>
        <div className="flex flex-col w-72 space-y-1.5 items-start">
          <input
            type="number"
            placeholder="Number of trees"
            className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
            {...register("trees", { required: true, max: 55, min: 1 })}
          ></input>
          {errors.trees && (
            <Label className="pt-3">{errorMatch(errors.trees.type)}</Label>
          )}
        </div>
        <Button onClick={handleSubmit(onSubmit)}>Add</Button>
      </div>
    </form>
  );
};

export default AddPurchase;
