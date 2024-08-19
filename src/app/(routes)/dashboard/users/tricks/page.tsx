
import TasksWrapper from "@/components/taks/TasksWrapper";
/* export const medatada = {
    title: "tricks",
    description: "Información general",
}; */

export default function PorfilePage() {
    return (
        <div className="text-black">
            <h1 className="mt-2 text-3xl">QRs</h1>
            <span className="text-xl">Destacados</span>

            <div className="flex w-full flex-wrap content-center justify-center px-7">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {

                        <div className="max-w-xsborder" >
                            <div className='p-1 text-left'>
                                <h3>QR 0</h3>
                                <ul className="mt-3 flex flex-wrap">
                                    <li className="mr-auto">
                                        <a href="#" className="flex text-gray-400 hover:text-gray-600">
                                            editar
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex text-gray-400 hover:text-gray-600">
                                            Eliminar
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    }
                </div>
            </div>

            <span className="text-xl">Todos los QRs</span>

            <div className="flex w-full flex-wrap content-center justify-center px-7">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {

                        <div className="max-w-xsborder" >
                            <div className='p-1 text-left'>
                                <TasksWrapper />
                            </div>
                        </div>

                    }
                </div>
            </div>
        </div>
    );
}