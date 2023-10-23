import { purchaseData, purchasesProps } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDateString } from "@/lib/utils";
import { Button } from "../ui/button";

const Purchases = ({ data, deletePurchase }: purchasesProps) => {
  const totalTrees: number = data.reduce(
    (prev: number, purchase: purchaseData) => {
      return prev + parseFloat(purchase.trees.toString());
    },
    0
  );

  return (
    <Table>
      <TableCaption>Total {totalTrees} trees</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Date</TableHead>
          <TableHead>Trees</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((purchase) => (
          <TableRow key={purchase.id} className="align-middle">
            <TableCell className="font-medium">
              {getDateString(purchase.date)}
            </TableCell>
            <TableCell>{purchase.trees}</TableCell>
            <TableCell>
              <Button onClick={() => deletePurchase(purchase.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Purchases;
