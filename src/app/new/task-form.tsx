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
import { useSession } from "next-auth/react";

function TaskForm({ task }: { task?: Task }) {
  const [name, setName] = useState(task?.name || "");
  const [qrCode, setQRCode] = useState(task?.qrCode || "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  const functionAction = task?.id ? updateTask : createTask;

  useEffect(() => {
    if (name) {
      generateQRCodeDataURL(name)
        .then(setQRCode)
        .catch((err) => console.error("Error generating QR code:", err));
    }
  }, [name]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    try {
      const result = await functionAction(formData, userEmail);
      
      if (result.success) {
        setSuccessMessage("Task submitted successfully!");
        setName("");
        setQRCode("");
        e.currentTarget.reset(); // Limpia el formulario
      } else {
        setErrorMessage(result.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={task?.id} />
      <input type="hidden" name="qrCode" value={qrCode} />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{task?.id ? "Update Task" : "Create Task"}</CardTitle>
          <CardDescription>
            {task?.id
              ? "Update the details of the task."
              : "Fill out the form below to create a new task."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                placeholder="Name of your QR"
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
            {successMessage && (
              <div className="text-green-600 mt-4">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="text-red-600 mt-4">{errorMessage}</div>
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
