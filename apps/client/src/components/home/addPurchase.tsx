import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { errorMatch, getDateString } from "@/lib/utils";
import { FormInputs } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import SelectOptions from "./selectOptions";

const AddPurchase = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Card className="w-[500px] flex flex-col pt-4">
        <CardHeader>
          <CardTitle>New purchase</CardTitle>
        </CardHeader>
        <CardContent>
          <SelectOptions />
          <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
            <div className="grid w-full items-end gap-4">
              <div className="flex flex-col w-72 space-y-1.5 items-start">
                <input
                  {...register("date", {
                    required: true,
                  })}
                  value={getDateString(new Date())}
                  min={getDateString(new Date())}
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
                  <Label className="pt-3">
                    {errorMatch(errors.trees.type)}
                  </Label>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex align-bottom">
          <Button onClick={handleSubmit(onSubmit)}>Add</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default AddPurchase;
