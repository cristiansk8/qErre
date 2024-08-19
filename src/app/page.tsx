import TasksWrapper from "@/components/taks/TasksWrapper";
import { TaskCard } from "@/components/task-card";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function HomePage() {
  const tasks = await prisma.task.findMany();

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
      </div>
      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
      <h1>QErres usuario</h1>
    </div>

  );
}

export default HomePage;
