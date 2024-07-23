'use client'
import React, { useState, useEffect } from 'react';
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

export function TaskForm({ task }: { task?: Task }) {
  const functionAction = task?.id ? updateTask : createTask;
  const [url, setUrl] = useState(task?.name || '');
  const [qrCode, setQrCode] = useState<string>('');

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    setUrl(newUrl);

    if (newUrl) {
      try {
        const dataURL = await generateQRCodeDataURL(newUrl);
        setQrCode(dataURL);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    } else {
      setQrCode('');
    }
  };

  return (
    <form action={functionAction}>
      <input type="hidden" name="id" value={task?.id} />
      <input type="hidden" name="qrCode" value={qrCode} />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create QR</CardTitle>
          <CardDescription>
            Complete el formulario a continuación para crear un QR.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">URL de su sitio destino</Label>
              <Input
                name="name"
                id="name"
                placeholder="Name of your task"
                value={url}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              {qrCode && (
                <div>
                  <img src={qrCode} alt="QR Code" />
                  <p>Escanea este código QR para visitar {url}</p>
                </div>
              )}
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
