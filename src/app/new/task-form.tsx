import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createTask, updateTask } from "@/actions/tasks-actions";
import { Task } from "@prisma/client";
import Link from "next/link";
import { generateQRCodeDataURL } from "@/components/qr";

function TaskForm({ task }: { task?: Task }) {
  const [name, setName] = useState(task?.name || "");
  const [qrCode, setQRCode] = useState(task?.qrCode || "");
  const functionAction = task?.id ? updateTask : createTask;

  useEffect(() => {
    if (name) {
      generateQRCodeDataURL(name)
        .then(setQRCode)
        .catch((err) => console.error("Error generating QR code:", err));
    }
  }, [name]);

  return (
    <form action={functionAction}>
      <input type="hidden" name="id" value={task?.id} />
      <input type="hidden" name="qrCode" value={qrCode} />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create QR</CardTitle>
          <CardDescription>
            Crea postea y trakea
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                placeholder="Name of your task"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Description of your task"
                defaultValue={task?.description || ""}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" defaultValue={task?.priority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {qrCode && (
              <div className="flex flex-col space-y-1.5">
                <Label>Generated QR Code</Label>
                <img src={qrCode} alt="Generated QR Code" />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            Cancel
          </Link>
          <Button type="submit">
            {task?.id ? "Update Task" : "Create Task"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default TaskForm;

